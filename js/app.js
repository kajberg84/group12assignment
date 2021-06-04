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
 * Handling info from response.
 *
 * @param {*} data
 */
async function responseHandler(data) {
  const response = await fetch(data.url).then((resp) =>
    resp.json().then((text) => text.lyrics)
  );
  return response;
}

/**
 * Fetching info from url.
 *
 * @param { String } url
 */
async function fetchSong(url) {
try {
  let response = await fetch(url);
  let lyrics = await responseHandler(response);

  printOutLyrics(lyrics);
} catch (error) {
  console.log(error)
  songText.textContent = "Could not find song";
}
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

  // Build url
  const URL = `https://api.lyrics.ovh/v1/${compatiblieInputArtist}/${compatiblieInputSong}`;

  if (inputArtist.value.length === 0 || inputSong.value.length === 0) {
    songText.textContent = "Fill out both fields";
  } else {
    fetchSong(URL);
  }
});
