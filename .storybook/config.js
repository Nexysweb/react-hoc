import { configure } from '@storybook/react';

import '../static/css/fa.css';
import '../static/css/bs4.css';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
