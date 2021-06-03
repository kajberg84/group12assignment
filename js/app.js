//app.js
import { burgerMenuFunc } from './components/burgerMenu.js'

const searchButton = document.querySelector('#searchBtn');
const songText = document.querySelector('#result')

// https://api.lyrics.ovh/v1/led%20zeppelin/stairway%20to%20heaven


/**
 * Setting textcontent to element.
 *
 * @param {*} text . Lyricstext
 */
function printOutLyrics (text) {
  console.log(text)
  songText.textContent = text
} 

/**
 * Handling info from response. 
 *
 * @param {*} data
 */
async function responseHandler (data) {
  console.log("url to fetch lyrics from", data.url)
  const response = await fetch(data.url)
    .then(resp => resp.json()
      .then(text => text.lyrics))
  return response
}

/**
 * Fetching info from url.
 *
 * @param { String } url
 */
async function fetchSong (url) {
  let response = await fetch(url)
  console.log('____', response)
  const lyrics = await responseHandler(response)

  printOutLyrics(lyrics)
}

//  Creating hamburger and appending it.
burgerMenuFunc()

searchButton.addEventListener('click', (e) => {
  e.preventDefault()

  // Get input values
  const inputArtist = document.querySelector('#search-for-artist')
  const inputSong = document.querySelector('#search-for-song')

  //Build url
 const URL2 = `https://private-anon-5704e9ba0a-lyricsovh.apiary-proxy.com/v1/${inputArtist.value}/${inputSong.value}`

  const URL = "https://private-anon-5704e9ba0a-lyricsovh.apiary-proxy.com/v1/Coldplay/Adventure%20of%20a%20Lifetime"

  if (inputArtist.value.length === 0  || inputSong.value.length === 0) {
    songText.textContent = "Fill out both fields"
    //fixa en funktion som rensar gamla textcontent error då man börjar skriva i fältet igen.
  } else {
    console.log('vi är i else ')
    fetchSong(URL2)
  }
})
