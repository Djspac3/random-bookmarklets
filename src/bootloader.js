import {default as setup} from './setup.js'; // Import the manager script

if (!window.location.href.startsWith('https://google.com/bookmarlet.')) {
    alert('This bookmarklet is designed to be used on https://google.com/bookmarlet.manager for page reasons. you will be redirected now. rerun this script after the redirect.');
    window.location.href = "https://google.com/bookmarlet.manager" // the main site
}
setup();
