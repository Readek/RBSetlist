/** @import { SetlistData, SetlistActive } from "./TypeDefinitions.mjs" */

/**
 * Returns a new reordered setlist based on the sort type
 * @param {SetlistData[]} setlist - Base setlist data
 * @param {String} sortType - How to sort it
 */
export function sortSetlist(setlist, sortType) {

    if (sortType == "Artist") {
        return sortByArtist(setlist);
    }

}

/**
 * @param {SetlistData[]} setlist - Base setlist data
 * @returns {SetlistActive[]}
 */
function sortByArtist(setlist) {

    /** @type {SetlistActive[]} */
    const finalSet = [];

    for (let i = 0; i < setlist.length; i++) {

        let catFound = false;

        for (let j = 0; j < finalSet.length; j++) {

            if (finalSet[j] && finalSet[j].name == setlist[i].artist) {

                // if category exist, add the song to it
                finalSet[j].songs.push(setlist[i]);
                catFound = true;
                break;

            }

        }

        if (catFound) continue;

        // if category doesnt exist, create it
        finalSet.push({
            name: setlist[i].artist,
            songs: [setlist[i]]
        })

    }

    return finalSet;

}