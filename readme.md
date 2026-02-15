# Random Magic App

Une application mobile développée avec React Native pour s'exercer à la création d'interfaces fluides et à la gestion de données en temps réel.

## Fonctionnalités

* **Authentification** : Système de connexion et d'inscription sécurisé via Firebase.
* **Accueil (Home)** : Visualisation de ta collection personnelle de cartes stockées sur Firestore.
* **Pioche (Liste)** : Récupération de 10 cartes aléatoires via l'API Scryfall avec possibilité de les ajouter à ta collection.
* **Détails** : Page dédiée affichant toutes les informations techniques d'une carte (Mana, Type, Texte, Force/Endurance).
* **Profil** : Gestion de ton compte, déconnexion et suppression des données.



## Stack Technique

* **Frontend** : React Native (Expo)
* **Backend** : Firebase (Auth & Firestore)
* **Navigation** : React Navigation
* **API** : Scryfall API

## Structure du projet

* `screens/` : Contient les 5 écrans principaux (Login, Home, Liste, Detail, Profil).
* `fire.js` : Configuration Firebase et fonctions de communication avec la base de données.
* `App.js` : Gestion de la navigation et de l'état de connexion.

## Installation

1. Installez les dépendances :
   ```bash
   npm install