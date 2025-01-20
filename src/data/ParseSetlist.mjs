/** @import { SetlistData } from "./TypeDefinitions.mjs" */

/**
 * Gets the demo setlist and then parses it
 * @returns {SetlistData}
 */
export async function getDemoSetlist() {
    const rawJson = await (await fetch("Demo.json")).json();    
    return parseSetlist(rawJson);
}

/**
 * Parses provided setlist data
 * @param {Object} data - Raw plain text setlist
 * @returns {SetlistData}
 */
export async function getUserUploadSetlist(data) {
    const rawJson = JSON.parse(data);    
    return parseSetlist(rawJson);
}

/**
 * Cleans up a setlist json
 * @param {Object} data - Raw setlist json
 * @returns {SetlistData}
 */
function parseSetlist(data) {

    for (let i = 0; i < data.setlist.length; i++) {

        // delete things we wont need
        delete data.setlist[i].bass_tuning;
        delete data.setlist[i].drum_bank;
        delete data.setlist[i].guitar_tuning;
        delete data.setlist[i].master;
        delete data.setlist[i].midifile;
        delete data.setlist[i].percussion_bank;
        delete data.setlist[i].preview_end;
        delete data.setlist[i].preview_start;
        delete data.setlist[i].scroll_speed;
        delete data.setlist[i].songid_string;
        delete data.setlist[i].subgenre; // this is always blank?
        delete data.setlist[i].tonality;
        delete data.setlist[i].tonic_note;
        delete data.setlist[i].version;
        delete data.setlist[i].year_recorded;

        // convert to proper types
        data.setlist[i].band_diff = Number(data.setlist[i].band_diff);
        data.setlist[i].bass_diff = Number(data.setlist[i].bass_diff);
        data.setlist[i].drums_diff = Number(data.setlist[i].drums_diff);
        data.setlist[i].guitar_diff = Number(data.setlist[i].guitar_diff);
        data.setlist[i].keys_diff = Number(data.setlist[i].keys_diff);
        data.setlist[i].probass_diff = Number(data.setlist[i].probass_diff);
        data.setlist[i].proguitar_diff = Number(data.setlist[i].proguitar_diff);
        data.setlist[i].prokeys_diff = Number(data.setlist[i].prokeys_diff);
        data.setlist[i].vocal_diff = Number(data.setlist[i].vocal_diff);

        // react needs a unique identifier
        data.setlist[i].reactId = i;

    }

    return data;

}