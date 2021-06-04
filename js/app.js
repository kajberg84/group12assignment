//app.js
import { burgerMenuFunc } from './components/burgerMenu.js';

const searchButton = document.querySelector('#searchBtn');
const songText = document.querySelector('#result');

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
  let response = await fetch(url);
  const lyrics = await responseHandler(response);

  printOutLyrics(lyrics);
}

//  Creating hamburger and appending it.
burgerMenuFunc();

// Funktion för att ändra mellanrum i en input till att ha %20 för mellanrummen
function makeInputCompatibleWithLyricsApi(input) {
  const splittedString = input.split(' ');
  // const splittedString = input.value.split(' ');

  let empytArr = [];

  for (let i = 0; i < splittedString.length; i++) {
    empytArr.push(splittedString[i]);
    empytArr.push('%20');
  }

  empytArr.pop();
  const finishedString = empytArr.join('');
  return finishedString;
}


// Hur jag skulle göra för att ersätta whitspace
function hurKajSkulleGjortReplacespace(input){
const replacedString = input.trim().replace(/\s/g, "%20" )
console.log("kossa:", replacedString)
}


searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  // Get input values
  const inputArtist = document.querySelector('#search-for-artist');
  const inputSong = document.querySelector('#search-for-song');
console.log("1", inputArtist)
console.log("2", inputSong)

  const compatiblieInputArtist = makeInputCompatibleWithLyricsApi(inputArtist.value)
  const compatiblieInputSong = makeInputCompatibleWithLyricsApi(inputSong.value);
  console.log("3", compatiblieInputArtist)
  console.log("4", compatiblieInputSong)

  //kortare syntax för att ta bort space och ta bort space i slutet på mening
  hurKajSkulleGjortReplacespace(inputSong.value)
  //Build url
  const URL = `https://private-anon-5704e9ba0a-lyricsovh.apiary-proxy.com/v1/${compatiblieInputArtist}/${compatiblieInputSong}`;

  if (inputArtist.value.length === 0 || inputSong.value.length === 0) {
    songText.textContent = 'Fill out both fields';
  } else {
    fetchSong(URL);
  }
});
