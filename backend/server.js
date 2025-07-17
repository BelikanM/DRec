require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connecté"))
.catch((err) => console.error("❌ Erreur MongoDB :", err));

// ======================== SCHEMAS ========================= //
const clientSchema = new mongoose.Schema({
    nom: String,
    email: String,
    telephone: String,
    adresse: String
});

const creanceSchema = new mongoose.Schema({
    clientId: mongoose.Schema.Types.ObjectId,
    montant: Number,
    dateEcheance: Date,
    statut: { type: String, default: 'non payée' }
});

const paiementSchema = new mongoose.Schema({
    creanceId: mongoose.Schema.Types.ObjectId,
    montant: Number,
    datePaiement: Date
});

const agentSchema = new mongoose.Schema({
    nom: String,
    email: String,
    telephone: String
});

const relanceSchema = new mongoose.Schema({
    clientId: mongoose.Schema.Types.ObjectId,
    creanceId: mongoose.Schema.Types.ObjectId,
    dateRelance: Date,
    message: String
});

// ======================== MODELS ========================= //
const Client = mongoose.model("Client", clientSchema);
const Creance = mongoose.model("Creance", creanceSchema);
const Paiement = mongoose.model("Paiement", paiementSchema);
const Agent = mongoose.model("Agent", agentSchema);
const Relance = mongoose.model("Relance", relanceSchema);

// ======================== NODEMAILER ========================= //
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ======================== ROUTES ========================= //

// CLIENTS
app.post('/clients', async (req, res) => {
    const client = new Client(req.body);
    await client.save();
    res.json(client);
});

app.get('/clients', async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

// CREANCES
app.post('/creances', async (req, res) => {
    const creance = new Creance(req.body);
    await creance.save();
    res.json(creance);
});

app.get('/creances', async (req, res) => {
    const creances = await Creance.find().populate('clientId');
    res.json(creances);
});

// PAIEMENTS
app.post('/paiements', async (req, res) => {
    const paiement = new Paiement(req.body);
    await paiement.save();
    res.json(paiement);
});

app.get('/paiements', async (req, res) => {
    const paiements = await Paiement.find().populate('creanceId');
    res.json(paiements);
});

// AGENTS
app.post('/agents', async (req, res) => {
    const agent = new Agent(req.body);
    await agent.save();
    res.json(agent);
});

app.get('/agents', async (req, res) => {
    const agents = await Agent.find();
    res.json(agents);
});

// RELANCES
app.post('/relances', async (req, res) => {
    const relance = new Relance(req.body);
    await relance.save();

    const client = await Client.findById(req.body.clientId);

    // Envoi d'e-mail
    if (client.email) {
        await transporter.sendMail({
            from: `"Recouvrement de Créance" <${process.env.EMAIL_USER}>`,
            to: client.email,
            subject: "🔔 Relance de paiement",
            text: req.body.message
        });
    }

    res.json({ message: "Relance envoyée", relance });
});

app.get('/relances', async (req, res) => {
    const relances = await Relance.find().populate('clientId').populate('creanceId');
    res.json(relances);
});

// ======================== LANCEMENT ========================= //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur backend actif sur http://localhost:${PORT}`);
});
