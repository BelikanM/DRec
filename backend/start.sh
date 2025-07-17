#!/bin/bash

# Couleur
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Initialisation du backend de recouvrement...${NC}"

# Étape 1 : installation des dépendances si node_modules absent
if [ ! -d "node_modules" ]; then
    echo -e "${GREEN}📦 Installation des dépendances...${NC}"
    npm install
fi

# Étape 2 : récupération de l'IP locale
IP=$(hostname -I | awk '{print $1}')
PORT=$(grep PORT .env | cut -d '=' -f2)

# Étape 3 : lancement du serveur
echo -e "${GREEN}🌐 Serveur disponible sur : http://$IP:$PORT${NC}"
echo -e "${GREEN}🟢 Lancement de l'API...${NC}"

node server.js
