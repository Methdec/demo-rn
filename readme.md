# Random Magic App

Une application mobile performante développée avec React Native et Expo. Ce projet permet de gérer une collection de cartes Magic: The Gathering en communiquant avec l'API Scryfall et un backend Firebase.

## Fonctionnalités

* **Authentification sécurisée** : Connexion et inscription avec gestion d'erreurs traduite via Firebase Auth.
* **Accueil (Home)** : Liste synchronisée en temps réel de ta collection personnelle (Firestore).
* **Recherche ciblée** : Nouvel écran de recherche pour trouver n'importe quelle carte par son nom.
* **Pioche Aléatoire (Liste)** : Système de découverte avec historique des 10 dernières cartes générées.
* **Détails avancés** : Fiche technique complète (Coût, Type, Oracle Text, Force/Endurance, Artiste).
* **Expérience Utilisateur (UX)** : 
    * Intégration de vibrations (Haptic Feedback) lors des suppressions ou actions critiques.
    * Gestion intelligente du clavier sur les formulaires (KeyboardAvoidingView).
* **Profil personnalisable** : Modification du pseudo et suppression définitive du compte.



## Stack Technique

* **Frontend** : React Native (Expo SDK)
* **Backend** : Firebase (Auth & Firestore NoSQL)
* **Navigation** : React Navigation (Stack)
* **Données** : Scryfall API (via Fetch)
* **Persistance** : AsyncStorage (Sessions)

## Structure du projet

* `screens/` : Contient les écrans (Login, Home, Liste, Search, Detail, Profil).
* `services/api.js` : Centralisation des appels vers l'API Scryfall.
* `fire.js` : Cœur de la logique Firebase (Auth, Firestore, Traduction d'erreurs).
* `App.js` : Gestion de la navigation et flux d'authentification.



[Image of Firebase architecture diagram]


## Installation

1. Installez les dépendances :
   ```bash
   npm install