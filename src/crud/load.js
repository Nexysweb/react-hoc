import React, { useState } from 'react';
import { withLoaderPromise } from '../hoc/data/load';
import Loader from '../components/loader';

export default (Component, promise) => (props = {}) => {
  return withLoaderPromise(Component, Loader, promise)(props);
}
