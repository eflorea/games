/**
 * Script to generate the object with the games from personal collection from boardgamegeek.
 */
// all options are optional.
const options = {
    timeout: 10000, // timeout of 10s (5s is the default).
}

const bgg = require( 'bgg' )( options );
const fs  = require( 'fs' );

bgg( 'collection', { username: 'djeddy' } )
    .then( function( results ) {
        // build an array with ids so we can make another api call to grab the details of each game.
        let ids        = [];
        let ids_status = [];
        results.items.item.forEach( function( el ) {
            ids.push( el.objectid.toString() );
            ids_status[ el.objectid.toString() ] = el.status;
        } );
        if ( ids ) {
            bgg( 'thing', { id: ids.join( ',' ) } )
                .then( function( results ) {
                    let games = [];
                    results.items.item.forEach( function( el ) {
                        let game = {};
                        game.id        = el.id.toString();
                        game.image     = el.image.toString();
                        game.thumbnail = el.thumbnail.toString();
                        game.players   = el.minplayers.value.toString() + ' - ' + el.maxplayers.value.toString();
                        game.playing   = el.playingtime.value.toString();
                        game.published = el.yearpublished.value.toString();
                        game.minage    = el.minage.value.toString();
                        if ( Array.isArray( el.name ) ) {
                            game.name = el.name[0].value.toString();
                        } else {
                            game.name = el.name.value.toString();
                        }
                        game.description = el.description.toString();
                        game.status      = ids_status[ game.id ];
                        games.push( game );
                    } );
                    if ( games ) {
                        // sort games by published date.
                        games.sort( ( a, b ) => ( a.published < b.published ) ? 1 : -1 );

                        // write the games to a file.
                        fs.writeFile( './assets/games.js', 'const GAMES = ' + JSON.stringify( games ), function (err) {
                            if ( err ) {
                                return console.log( err );
                            }
                        } );
                        console.log( 'Done! Check ./assets/games.js file.' );
                    } else {
                        console.log( 'No games parsed.' );
                    }
                } );
        }
    } ) ;
