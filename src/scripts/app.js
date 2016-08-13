'use strict';

const throttle = require('lodash.throttle');
const shuffle = require('shuffle-array');

// Ensure our CSS is loaded.
require('../styles/app.less');

// Ensure our images are loaded.
require('../img/images.js');

// DOM elements used
const TAB_NAME_ID = '#tabName';
const TAB_ICON_ID = '#tabIcon';
const FAVICON_ID = '#favicon';

// Listen for tab name changes
document.querySelector(TAB_NAME_ID).addEventListener('input', (elem) => {
  const newText = elem.target.value;
  document.title = newText;
});

// Listen for tab icon changes
document.querySelector(TAB_ICON_ID).addEventListener('input', throttle((elem) => {
  const newSrc = elem.target.value;
  document.querySelector(FAVICON_ID).href = newSrc;
}, 500));


const VERB_ID = '#verb';
const NOUN_ID = '#noun';
const SCROLL_RATE = 3000;

const verbs = ['Impress', 'Astound', 'Scare', 'Worry', 'Make fun of',
  'Insult', 'Compete with', 'Disgust', 'Prank', 'Misdirect', 'Confuse', 'Wow'];
shuffle(verbs);

const nouns = ['friends', 'loved ones', 'coworkers', 'boss', 'IT department', 'blind-dates',
  'tinder matches', 'relatives', 'classmates', 'book club', 'dog', 'wife', 'husband',
  'partner', 'future self']
  .map(term=>term +'.');
shuffle(nouns);

// Update the verb and noun every once in a while;
function scrollThrough( domId, words ) {
  const element = document.querySelector(domId);
  let currentIdx = 0;
  let update = () => {
    element.innerHTML = words[currentIdx];
    currentIdx++;
    if (currentIdx === words.length) {
      shuffle(words);
      currentIdx = 0;
    }
  };
  setInterval(update, SCROLL_RATE);
}

scrollThrough(VERB_ID, verbs);
scrollThrough(NOUN_ID, nouns);
