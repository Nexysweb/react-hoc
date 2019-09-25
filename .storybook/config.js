import { configure } from '@storybook/react';

import '../static/css/fa.css';
import '../static/css/bs4.css';
import 'flatpickr/dist/themes/material_blue.css'

/*function loadStories() {
  require('../src/stories');
}*/

const req = require.context('../src/stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
