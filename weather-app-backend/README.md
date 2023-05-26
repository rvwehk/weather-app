# [---- ORGANISATION DU PROJET ----]

Dans le dossier /src -->
                        /auth pour le service d'authentification
                        /common pour les fonctions reutilisables
                        /dto pour gerer tous les dto
                        /user pour la gestion du module user
                        /weather pour la gestion du module weather



# [---- PROCESSUS DE DEMARRAGE DU PROJET ----]
# Avant tout il faut noter que le projet est Dockerisé et donc le prcessus de lancement à été simplifié

# Étape 1:
Démarrer Docker sur sa machine

# Étape 2:

Afin d'eviter un conflit entre le service postgres qui tourne en local et celui que docker va initier il vaut mieux chercher le service de postgres qui tourne ne local sur la machine et le fermer

Executer sudo lsof -i :5432

kill -9 ${pid du service}

# Étape 3:

Excecuter cd weather-app-backend && yarn up

Prenez un café le temps que Docker fasse tout pour vous 😉

# NB:
yarn up est un script pour télécharger les images, les builder puis lancer le conteneur.

Pour stopper le projet il faudra executer le script yarn down afin de démonter le conteneur Docker.


Ici nous avons 3 contenaires qui seront démarrés

# Le conteneur de l'API
# Le conteneur de la BD Postgres SQL
# Le conteneur de Postgres Admin pour la gestion de la BD en mode graphique (http://localhost:5050)
username: admin@admin.com
password: pgadmin4

# [---- JOURNAL DE BORD----]

# 1 - Pour le bonus j'ai eu faire la dockerisation du projet, et la gestion des utilisateurs en mettant en place des APIs necessaires

# 2- Pour la partie Open bar, j'ai rajouté la documentation de l'API grace à swagger (http://localhost:3001/api)

# 3- J'ai eu à integré aussi le caching des données ce qui augment le temps de reponse des APIs

# 3- Comme amélioration je pourrais revoir la documentation swagger afin qu'elle soit plus explicite et aussi penser à une achitecture micro-services pour avoir par exemple le module weather à part avec sa documentation et le module user aussi à part avec sa documentation.