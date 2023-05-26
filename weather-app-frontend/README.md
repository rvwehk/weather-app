# [---- ORGANISATION DU PROJET ----]

Dans le dossier /assest -->
                        /font pour le font
                        /icons pour les icons
                /components pour mes composants réutilisables
                /pages pour tout ce qui est des deux pages de l'appli
                /utils pour des fonctions réutilsables
                /styles pour les styles css de l'appli



# [---- PROCESSUS DE DEMARRAGE DU PROJET ----]

# Avant tout il faut noter que le projet est Dockerisé et donc le prcessus de lancement à été simplifié

# Étape 1:
Démarrer Docker sur sa machine

# Étape 2:
Excecuter cd weather-app-front && yarn up

Prenez un café le temps que Docker fasse tout pour vous 😉

# Étape 3:
Aller sur http://localhost:3000 depuis le navigateur afin  d'accéder au projet

# NB:
yarn up est un script pour télécharger les images, les builder puis lancer le conteneur.

Pour stopper le projet il faudra executer le script yarn down afin de démonter le conteneur Docker.


# [---- JOURNAL DE BORD----]

# 1 - Vu que les frameworks css ne sont pas autorisés j'ai du utilisé les médias query pour la gestion de la responsive

# 2- Pour la partie Open bar, j'ai rajouté un spinner sur la bar de recherche pour signaler à l'utilisateur qu'il y a un chargement qui se fiat en cas de latence de la connexion

# 3- Comme amélioration je pourrais intégré du SSR (server side render) afin d'optimiser l'appli. J'ai pas eu le temps de terminer son implémentation avant le dead-line.