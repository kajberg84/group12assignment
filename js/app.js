//app.js
import { burgerMenuFunc } from './components/burgerMenu.js'

const searchButton = document.querySelector('#searchBtn');
const songText = document.querySelector('#result')

// https://api.lyrics.ovh/v1/led%20zeppelin/stairway%20to%20heaven


/**
 * Creating textcontent from response. 
 *
 * @param {*} data
 */
function printSong(data){
  songText.textContent = data
}

/**
 * Fetching info from url
 *
 * @param { String } url
 */
async function fetchSong (url) {
  let response = await fetch(url)
  console.log(response)
  // let jsonData = await response.json()

  printSong(response)
  }

//  Creating hamburger and appending it
burgerMenuFunc()
searchButton.addEventListener('click', (e) => {
  e.preventDefault()

  // Get input values
  const inputArtist = document.querySelector('#search-for-artist')
  const inputSong = document.querySelector('#search-for-song')

   //Build url
  const URL = "https://swapi.dev/api/starships/12/"

if(inputArtist.value.length === 0 || inputSong.value.length === 0) {
  songText.textContent = "Fill out both fields"
  //fixa en funktion som rensar gamla textcontent error då man börjar skriva i fältet igen.
} else {
  fetchSong(URL)
}
})
