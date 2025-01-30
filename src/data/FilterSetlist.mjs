/** @import { SetlistData } from "./TypeDefinitions.mjs" */

/**
 * Filters out everything not containing provided text
 * @param {String} fText - Text to search for
 * @param {SetlistData[]} setlist - Base setlist data
 */
export function searchByText(fText, setlist) {

    const finalSet = setlist.filter(song =>
        song.name.toLocaleLowerCase().includes(fText.toLocaleLowerCase())
        || song.artist.toLocaleLowerCase().includes(fText.toLocaleLowerCase())
        || song.album.toLocaleLowerCase().includes(fText.toLocaleLowerCase())
    )

    sortAlphabetically(finalSet);

    return finalSet;

}

/**
 * @param {SetlistActive[]} array 
 */
function sortAlphabetically(array) {
    array.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {return -1}
        if (nameA > nameB) {return 1}
        return 0;
    });
}