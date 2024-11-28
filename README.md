# Application de Prédiction des Voitures d'Occasion

## Introduction

Ce projet est une application de prédiction des prix des voitures d'occasion, conçue dans le cadre de notre formation en développement IA. L'application combine des technologies de machine learning et une interface utilisateur intuitive pour prédire le prix des voitures d'occasion et classifier l'offre comme « Bonne affaire » ou « Mauvaise affaire ». L'application a été construite avec Streamlit et FastAPI, et elle utilise des modèles de Random Forest et de régression logistique pour offrir une expérience utilisateur simple mais efficace, tout en fournissant des informations utiles aux utilisateurs pour leurs décisions d'achat.

## Fonctionnalités Principales

1. **Inscription et Connexion Utilisateur :** L'application propose un système d'authentification où les utilisateurs peuvent s'inscrire, se connecter et se déconnecter. L'interface de connexion est sécurisée et la session de l'utilisateur reste active jusqu'à ce qu'il se déconnecte manuellement.
2. **Recherche et Prédiction de Prix :** L'utilisateur peut rechercher le prix d'une voiture d'occasion en fournissant des informations telles que le kilométrage, l'année, la marque, le carburant, la transmission, le modèle et l'état du véhicule. Le modèle Random Forest est utilisé pour prédire le prix, offrant une estimation précise basée sur les caractéristiques fournies.
3. **Classification de l'Affaire :** En plus de la prédiction de prix, le modèle de régression logistique permet de classifier l'offre comme « Bonne affaire » ou « Mauvaise affaire », donnant à l'utilisateur un indicateur supplémentaire pour évaluer la qualité de l'offre.
4. **Compte Utilisateur :** Une page de compte utilisateur est disponible pour visualiser les détails du compte. Les recherches passées et l'historique des prédictions pourront être implémentés dans une version future pour une meilleure expérience utilisateur.
5. **Navigation Personnalisée :** Un menu spécifique pour les utilisateurs connectés est disponible, leur permettant d'accéder aux prédictions, à leur compte, ou de se déconnecter facilement pour une navigation fluide.

## Technologies Utilisées

- **Backend :** FastAPI pour la gestion de l'API et des routes backend, offrant une performance et une flexibilité optimales.
- **Frontend :** Streamlit pour une interface utilisateur simple, dynamique et accessible à tout utilisateur, même sans connaissances techniques.
- **Base de données :** SQLAlchemy pour la gestion des utilisateurs et des véhicules, garantissant la fiabilité et la persistance des données.
- **Machine Learning :** Scikit-Learn pour les modèles de prédiction (Random Forest et Régression Logistique), offrant une capacité d'apprentissage supervisé robuste et précise.
- **Autres :** bcrypt pour le hashage sécurisé des mots de passe, Pandas pour la manipulation et l'analyse des données de manière efficace.

## Installation

### Prérequis

- **Python 3.8+** doit être installé sur votre système.
- **Pipenv** ou **pip** pour la gestion des dépendances.
- **Base de données SQLite** pour gérer les données utilisateurs et véhicules.

### Étapes d'Installation

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/voitures-occasion.git
   cd voitures-occasion
   ```

2. **Installer les dépendances :**

   ```bash
   pip install -r requirements.txt
   ```

3. **Initialiser la base de données :**

   ```bash
   python create_db.py
   ```

4. **Entraîner les modèles (si nécessaire) :**
   Si les modèles ne sont pas fournis, utilisez le script d'entraînement pour générer les fichiers `.pkl` :

   ```bash
   python models/training_forest.py
   ```

5. **Lancer l'API FastAPI :**

   ```bash
   uvicorn main:app --reload
   ```

6. **Lancer l'interface Streamlit :**

   ```bash
   streamlit run streamlit_app/app.py
   ```

## Utilisation

### Inscription et Connexion

- Ouvrez l'application Streamlit via votre navigateur (par défaut sur `http://localhost:8501`).
- Vous pouvez vous inscrire à l'aide d'un email, d'un nom et d'un mot de passe sécurisés.
- Après l'inscription, utilisez la page de connexion pour accéder à votre compte et explorer les fonctionnalités de l'application.

### Prédiction des Voitures d'Occasion

- Après connexion, accédez à la page de prédiction via la barre de navigation.
- Renseignez les caractéristiques du véhicule pour obtenir une estimation précise du prix et savoir si l'offre est une bonne ou une mauvaise affaire.

## Schéma de la Base de Données

- **Users** : contient les informations des utilisateurs enregistrés (email, nom, mot de passe hashé) pour garantir une gestion sécurisée des comptes.
- **Vehicule** : contient les informations sur les véhicules disponibles dans la base (marque, modèle, année, état, etc.), permettant une analyse approfondie pour chaque recherche de prédiction.

## Architecture du Projet

- **API/** : contient les fichiers backend (FastAPI, modèles, schémas, CRUD) pour gérer les interactions côté serveur.
- **models/** : contient les fichiers d'entraînement des modèles et les modèles sauvegardés en `.pkl`.
- **streamlit\_app/** : contient le code de l'application front-end Streamlit, responsable de l'interface utilisateur.
- **data/** : contient les fichiers de données utilisés pour l'entraînement du modèle, assurant la reproductibilité des prédictions.
- **sql/** : contient les scripts SQL pour créer les tables de la base de données.
- **notebooks/** : contient les notebooks Jupyter pour l'exploration des données et les essais de modélisation.
- **scripts/** : contient des scripts auxiliaires, comme ceux pour insérer des données dans la base de données ou scraper des informations en ligne.

## Documentation de l'API

### Endpoints Disponibles

1. **/vehicules/** (GET, POST, PUT, DELETE) : Créer, lire, mettre à jour et supprimer des informations sur les véhicules, permettant une gestion complète des données des véhicules.
2. **/predict\_combined** (POST) : Prédire le prix d'un véhicule et classifier l'offre, fournissant une prédiction complète en une seule requête.
3. **/users/** (GET, POST, PUT, DELETE) : Gestion des utilisateurs, incluant la création, mise à jour et suppression des comptes (fonctionnalités à implémenter pour le futur).

## Améliorations Futures

- **Stockage des Recherches :** Enregistrer les recherches effectuées par l'utilisateur pour les afficher dans la page de compte, permettant une consultation et une analyse historiques.
- **Amélioration de l'UX :** Ajout d'un historique des prédictions, affichage des tendances des prix sur un graphique pour mieux visualiser l'évolution des prix.
- **Validation Avancée des Champs :** Ajouter une vérification plus poussée des champs à remplir (ex: format de l'email, valeurs numériques réalistes), garantissant des saisies précises et pertinentes.

## Crédits

- **Équipe de Développement :** Projet réalisé dans le cadre d'une formation en développement IA. Merci à toute l'équipe pour la collaboration, l'engagement et la persévérance tout au long du projet !

  - [Sébastien Rapuzzi](https://rands.netlify.app/).
  - [Yamine Aissani](https://www.linkedin.com/in/yamine-aissani-876514254/).
  - [Mathieu Soussignan](https://www.mathieu-soussignan.com).

- **Images et Logos :** Les images utilisées pour le design de l'application sont libres de droits, contribuant à une interface visuelle attrayante sans compromettre la conformité légale.

---

Merci d'utiliser notre application de prédiction de voitures d'occasion ! N'hésitez pas à nous contacter pour toute suggestion d'amélioration, et nous espérons que notre outil vous aidera à trouver la meilleure affaire possible.
