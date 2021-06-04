//app.js
import { burgerMenuFunc } from "./components/burgerMenu.js";

const searchButton = document.querySelector("#searchBtn");
const songText = document.querySelector("#result");

/**
 * Setting textcontent to element.
 *
 * @param {*} text . Lyricstext
 */
function printOutLyrics(text) {
  songText.textContent = text;
}

/**
  * Fetching info from url.
  * Refactoring jsondata.
  *
  * @param {*} artist
  * @param {*} song
  */
 async function fetchSong (artist, song) {
  const URL = `https://api.lyrics.ovh/v1/${artist}/${song}`;

  const searchResult = await fetch(URL);
  const data = await searchResult.json();

  const lyricsSong = data.lyrics.replace(/(\r\n|\r|\n)/g, ".");
  printOutLyrics(lyricsSong);
}

//  Creating hamburger and appending it.
burgerMenuFunc();

/**
 * Remove whitespaces and replacing space with %20
 *
 * @param { string } input - url
 * @return { string }  - url
 */
function makeInputCompatibleWithLyricsApi(input) {
  const replacedString = input.trim().replace(/\s/g, "%20");
  return replacedString;
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Get input values
  const inputArtist = document.querySelector("#search-for-artist");
  const inputSong = document.querySelector("#search-for-song");

  const compatiblieInputArtist = makeInputCompatibleWithLyricsApi(
    inputArtist.value
  );
  const compatiblieInputSong = makeInputCompatibleWithLyricsApi(
    inputSong.value
  );

  if (inputArtist.value.length === 0 || inputSong.value.length === 0) {
    songText.textContent = "Fill out both fields";
  } else {
    fetchSong(compatiblieInputArtist, compatiblieInputSong);
  }
});
