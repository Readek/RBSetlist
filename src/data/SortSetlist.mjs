/** @import { SetlistData, SetlistActive } from "./TypeDefinitions.mjs" */

const nonAlphaRege = /^[^A-Z]/i;

/**
 * Returns a new reordered setlist based on the sort type
 * @param {SetlistData[]} setlist - Base setlist data
 * @param {String} sortType - How to sort it
 */
export function sortSetlist(setlist, sortType) {

    if (sortType == "Artist") {
        return sortByArtist(setlist);
    } else if (sortType == "SongName") {
        return sortBySongName(setlist);
    } else if (sortType == "Year") {
        return sortByYear(setlist);
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

    // sort categories by category name
    // this is actually how data is stored in og json, but just in case
    sortAlphabetically(finalSet);

    // sort songs inside categories
    for (let i = 0; i < finalSet.length; i++) {
        sortAlphabetically(finalSet[i].songs);
    }

    return finalSet;

}

/**
 * @param {SetlistData[]} setlist - Base setlist data
 * @returns {SetlistActive[]}
 */
function sortBySongName(setlist) {

    /** @type {SetlistActive[]} */
    const finalSet = [];

    let nonAlphaPos = -1;

    for (let i = 0; i < setlist.length; i++) {

        let catFound = false;

        for (let j = 0; j < finalSet.length; j++) {

            if (finalSet[j]) {
                
                if (nonAlphaPos != -1 && setlist[i].name.slice(0,1).match(nonAlphaRege)) {

                    // if non-alpha category exists, add the song to it
                    finalSet[nonAlphaPos].songs.push(setlist[i]);
                    catFound = true;
                    break;
                    
                } else if (finalSet[j].name.slice(0,1).toLocaleUpperCase()
                    == setlist[i].name.slice(0,1).toLocaleUpperCase()) {

                    // if category exists, add the song to it
                    finalSet[j].songs.push(setlist[i]);
                    catFound = true;
                    break;
 
                }

            }

        }

        if (catFound) continue;

        // if category doesnt exist, create it
        const catName = setlist[i].name.match(nonAlphaRege) 
            ? "123"
            : setlist[i].name.slice(0, 1).toLocaleUpperCase();

        finalSet.push({
            name: catName, songs: [setlist[i]]
        })

        if (catName == "123") nonAlphaPos = finalSet.length-1;

    }

    // sort categories by category name
    sortAlphabetically(finalSet);

    // sort songs inside categories
    for (let i = 0; i < finalSet.length; i++) {
        sortAlphabetically(finalSet[i].songs);
    }

    return finalSet;

}

/**
 * @param {SetlistData[]} setlist - Base setlist data
 * @returns {SetlistActive[]}
 */
function sortByYear(setlist) {

    /** @type {SetlistActive[]} */
    const finalSet = [];

    for (let i = 0; i < setlist.length; i++) {

        let catFound = false;

        for (let j = 0; j < finalSet.length; j++) {

            if (finalSet[j] && finalSet[j].name == setlist[i].year_released) {

                // if category exist, add the song to it
                finalSet[j].songs.push(setlist[i]);
                catFound = true;
                break;

            }

        }

        if (catFound) continue;

        // if category doesnt exist, create it
        finalSet.push({
            name: setlist[i].year_released,
            songs: [setlist[i]]
        })

    }    

    // sort songs inside categories
    for (let i = 0; i < finalSet.length; i++) {
        sortAlphabetically(finalSet[i].songs);
    }

    // sort categories by number
    return finalSet.sort((a, b) => b.name - a.name);

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