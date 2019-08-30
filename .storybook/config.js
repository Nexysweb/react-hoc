import { configure } from '@storybook/react';

import '../static/css/main.css';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
