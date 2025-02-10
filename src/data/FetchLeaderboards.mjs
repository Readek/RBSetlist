const url = "https://gocentral-service.rbenhanced.rocks/leaderboards?";

/**
 * Returns data from the leaderboards from GoCentral
 * @param {String} songId 
 * @param {Number} instr 
 */
export async function fetchLeaderboards(songId, instr) {

    const urlToUse = `${url}song_id=${songId}&role_id=${instr}`;

    const data = await fetch(urlToUse);

    if (!data.ok) return null;

    const dataJson = await data.json();
    
    const finalSrc = dataJson.leaderboard;

    return finalSrc;

}