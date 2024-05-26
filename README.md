![ESLint Workflow](https://github.com/Azecko/calculateur-moyennes/actions/workflows/lint.yml/badge.svg)
![test front-end workflow](https://github.com/Azecko/calculateur-moyennes/actions/workflows/frontend.yml/badge.svg)
![test API workflow](https://github.com/Azecko/calculateur-moyennes/actions/workflows/node.js.yml/badge.svg)
# calculateur-moyennes
Calculateur-moyennes est une application [React](https://reactjs.org) créée pour le cours 347 - Utiliser un service avec des conteneurs.

## Objectif
L'objectif était de créer une application qui sera "Dockerisée" via l'outil [Docker](https://www.docker.com/). Cela veut dire que l'application est démarrable via ce même outil.

## L'application
En entrant les notes et les titres de chaque test, l'application se charge de calculer la moyenne arrondie via cette formule : `(note + note + note) / nombre de notes`

## Comment l'utiliser
1. Cloner le repo avec la commande `git clone git@github.com:Azecko/calculateur-moyennes.git`
2. Se déplacer dans le bon dossier `cd calculateur-moyennes`
3. Lancer la commande `docker-compose up` (pour l'environnement de développement : `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`)
4. Se rendre sur `http://localhost:3000`

## Pour tester l'API
```bash
    docker exec -it calculateur_moyennes_api npm test
```

## Les ports
`http://localhost:3000` : L'app React\
`http://localhost:4000` : L'API\
`http://localhost:8088` : PhpMyAdmin

## Contributeurs
[@Azecko](https://github.com/Azecko)\
[@iamyphar](https://github.com/iamyphar)
