'use strict';

const throttle = require('lodash.throttle');

// Ensure our CSS is loaded.
require('../styles/app.less');

// DOM elements used
const TAB_NAME_ID = '#tabName';
const TAB_ICON_ID = '#tabIcon';
const FAVICON_ID = '#favicon';

// Listen for tab name changes
document.querySelector(TAB_NAME_ID).addEventListener('input', (elem) => {
  let newText = elem.target.value;
  document.title = newText;
});

// Listen for tab icon changes
document.querySelector(TAB_ICON_ID).addEventListener('input', throttle((elem) => {
  let newSrc = elem.target.value;
  document.querySelector(FAVICON_ID).href = newSrc;
}, 500));
