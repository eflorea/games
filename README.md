# GitHub Pages for personal collection of tabletop and board games
https://florea.com/games

## Instructions to make your own
### Requirements
* [BoardGameGeek](https://boardgamegeek.com/) - A public collection on boardgamegeek.com

### Setup
* Clone this repo locally
```
git clone git@github.com:eflorea/games.git my-games-repo
```
* Install packages
```
cd my-games-repo
npm install
```
* Change the collection's username for the boardgamegeek API in the file source/games.js: bgg( 'collection', { username: 'eflorea' } )
* Run node command to call BGG's API and get all your games from collection and their details and add them in the assets/games.js
```
node source/games.js
```
If the collection is newly created and/or updated you might need to run this command a few times if you encouter a JS error (BGG API responses are not instantly if that call has never been requested before).
* Open index.html locally or/commit the change to your own repo

## How to get started with GitHub Pages?
https://help.github.com/en/github/working-with-github-pages/creating-a-github-pages-site
