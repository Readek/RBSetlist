const url = `https://ws.audioscrobbler.com/2.0/`
 + `?method=track.getinfo`
 + `&api_key=${import.meta.env.VITE_LASTFM_API_KEY}`
 + `&autocorrect=1`
 + `&format=json`

// we will store urls we fetch within a sesson to avoid asking the API again
const storedUrls = {}

/**
 * Returns this song's cover image src
 * @param {String} track - Song name
 * @param {String} artist
 * @param {String} songId
 */
export async function fetchCoverSrc(track, artist, songId) {

    // if the song has already been fetched
    if (storedUrls[songId]) {
        return storedUrls[songId];
    }

    const urlToUse = `${url}&artist=${artist}&track=${track}`;

    const data = await fetch(urlToUse, {
        headers: {
            "Accept" : "application/json",
            "User-Agent" : "RB Setlist (https://github.com/Readek/RBSetlist)"
        }
    });

    if (!data.ok) return null;

    const dataJson = await data.json();

    const finalSrc = dataJson.track.album.image[3]["#text"]

    storedUrls[songId] = finalSrc;

    return finalSrc;

}