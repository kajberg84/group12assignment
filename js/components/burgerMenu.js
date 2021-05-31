//burgerMenu.js

/**
 * Funktion för att visa  hamburgarmenyn
 *
 */
const burgerMenuFunc = () => {
    // Hämta in alla element som behövs för hamburgermenyn
    const burgerMenu = document.querySelector('#burger-menu');
    const menu = document.querySelector('#display-menu');
    const removeMenuIcon = document.querySelector('#remove-menu');

/**
 * Funktion för att sätta display värdet på ett element
 *
 * @param {*} element
 * @param {*} value
 */
function setDisplayValueOnHtmlElement(element, value) {
      element.style.display = value;
    }
    
    // Denna eventlyssnare visar menyn vid klick på hamburger-ikonen
    burgerMenu.addEventListener('click', () => {
      setDisplayValueOnHtmlElement(menu, 'block');
      setDisplayValueOnHtmlElement(burgerMenu, 'none');
    });
    
    // Denna eventlyssnare döljer menyn vid klick på kryss ikonen
    removeMenuIcon.addEventListener('click', () => {
      setDisplayValueOnHtmlElement(menu, 'none');
      setDisplayValueOnHtmlElement(burgerMenu, 'block');
    });
}