import {addElements as setupPhase, main} from './main.js'; // Import the page clearer script

if (!window.location.href.startsWith('https://google.com/bookmarlet.manager')) {
    console.error("bookmarklet manager: unvalid URL, redirecting to https://google.com/bookmarlet.manager aka base url");
    alert('This bookmarklet is designed to be used on https://google.com/bookmarlet.manager for page reasons. you will be redirected now. rerun this script after the redirect.');
    window.location.href = "https://google.com/bookmarlet.manager" // the main site
}
console.log('removing all elements from the page');
/* remove all unneeded elements from existance */
document.head.innerHTML = ''; // Clear the head
document.body.innerHTML = ''; // Clear the body
setupPhase(); // Call the setup function to add elements to the page

main(); // Call the main function to initialize the page