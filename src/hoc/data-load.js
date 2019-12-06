import React, { useState } from 'react';

export const withLoaderPromise = (Component, Loader, promise) => (props = {}) => {
  const [state, setState] = useState(null);

  promise.then((x) => setState(x));

  if (state === null) {
    return <Loader/>;
  }

  return <Component data={state} {...props} />;
};
