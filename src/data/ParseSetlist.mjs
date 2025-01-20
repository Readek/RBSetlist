/** @import { SetlistData } from "./TypeDefinitions.mjs" */

/**
 * Gets the demo setlist and then parses it
 * @returns {SetlistData}
 */
export async function getDemoSetlist() {
    const rawJson = await (await fetch("Demo.json")).json();
    return parseSetlist(rawJson.setlist);
}

/**
 * Parses provided setlist data
 * @param {Object} data - Raw plain text setlist
 * @returns {SetlistData}
 */
export async function getUserUploadSetlist(data) {
    const rawJson = JSON.parse(data);    
    return parseSetlist(rawJson.setlist);
}

/**
 * Cleans up a setlist json
 * @param {Object} data - Raw setlist json
 * @returns {SetlistData}
 */
function parseSetlist(data) {

    for (let i = 0; i < data.length; i++) {

        // delete things we wont need
        delete data[i].bass_tuning;
        delete data[i].drum_bank;
        delete data[i].guitar_tuning;
        delete data[i].master;
        delete data[i].midifile;
        delete data[i].percussion_bank;
        delete data[i].preview_end;
        delete data[i].preview_start;
        delete data[i].scroll_speed;
        delete data[i].songid_string;
        delete data[i].subgenre; // this is always blank?
        delete data[i].tonality;
        delete data[i].tonic_note;
        delete data[i].version;
        delete data[i].year_recorded;

        // convert to proper types
        data[i].band_diff = Number(data[i].band_diff);
        data[i].bass_diff = Number(data[i].bass_diff);
        data[i].drums_diff = Number(data[i].drums_diff);
        data[i].guitar_diff = Number(data[i].guitar_diff);
        data[i].keys_diff = Number(data[i].keys_diff);
        data[i].probass_diff = Number(data[i].probass_diff);
        data[i].proguitar_diff = Number(data[i].proguitar_diff);
        data[i].prokeys_diff = Number(data[i].prokeys_diff);
        data[i].vocal_diff = Number(data[i].vocal_diff);

        // react needs a unique identifier
        data[i].reactId = i;

    }    

    return data;

}