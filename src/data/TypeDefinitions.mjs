/**
 * @typedef {{
 *  album: String,
 *  artist: String,
 *  band_diff: Number,
 *  bass_diff: Number,
 *  drums_diff: Number,
 *  duration: String,
 *  filepath: String,
 *  genre: String,
 *  guitar_diff: Number,
 *  keys_diff: Number,
 *  name: String,
 *  probass_diff: Number,
 *  proguitar_diff: Number,
 *  prokeys_diff: Number,
 *  rating: "FF" | "SR" | "M" | "NR",
 *  reactId: String
 *  shortname: String,
 *  songid: Number,
 *  source: String,
 *  track_number: Number,
 *  vocal_diff: Number,
 *  vocal_parts: Number,
 *  year_released: Number
 * }} SetlistData - Base data that won't ever change while in setlist view
 */

/**
 * @typedef {{
 *  name: String,
 *  sortType: String,
 *  textFilter: String
 * }} SetlistInfo - Information about current setlist not including the setlist itself
 */

/**
 * @typedef {{
 *  name: String,
 *  songs: SetlistData[],
 * }} SetlistActive - Setlist data that will change depending of sorts and filters
 */