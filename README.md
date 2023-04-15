# THE RPG (title is a work in progress)

The 2d rpg made with node and raylib

## Setup

> This project uses nodejs 18.x.x

Install dependencies

```bash
npm i
```

## Development

To run the project just run

```bash
npm run start
```

## Release

```bash
npm version [major | minor | patch] -m "Release v%s"

git push origin main --tags
```

## Distribution

There is no way, at the moment, to distribute the game other than cloning/download the project, do the setup and running the project.

A way to bundle the assets + code + nodejs runtime needs to be found in order to package and distribute the game.
