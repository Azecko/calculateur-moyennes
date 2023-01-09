# calculateur-moyennes
Calculateur-moyennes est une application [React](https://reactjs.org) crée pour le cours 347 - Utiliser un service avec des conteneurs.

## Objectif
L'objectif était de créer une application qui sera "Dockerisée" via l'outil [Docker](https://www.docker.com/). Cela veut dire que l'application est démarrable via ce même outil.

## L'application
En entrant les notes et les titres de chaque test, l'application se charge de calculer la moyenne arrondie via cette formule : `(note + note + note) / nombre de notes`

## Comment l'utiliser
1. Cloner le repo avec la commande `git clone git@github.com:Azecko/calculateur-moyennes.git`
2. Se déplacer dans le bon dossier `cd calculateur-moyennes`
3. Lancer la commande `docker-compose up`
4. Se rendre sur `http://localhost:3000`

## Les ports
`http://localhost:3000` : L'app React\
`http://localhost:4000` : L'API\
`http://localhost:8088` : PhpMyAdmin

## Contributeurs
[@Azecko](https://github.com/Azecko)\
[@iamyphar](https://github.com/iamyphar)
