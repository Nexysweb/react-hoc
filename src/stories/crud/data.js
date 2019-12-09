const isMissing = (o, a) => !(a in o) || o[a] === '';

const checkMissingInput = (o, a, e) => {
  if(isMissing(o, a)) {
    e[a] = [a + ' is missing'];
  }
}

const checkMissingInputs = (o, attrs, e) => attrs.map(a => checkMissingInput(o, a, e));

export const promise = (data, props = {}) => new Promise((resolve, failure) => {
  const errors = {};

  checkMissingInputs(data, ['myinput', 'myinput2', 'myinput3'], errors);

  setTimeout(() => {
    if (Object.keys(errors).length === 0) {
      resolve(true);
      console.log('success')
    } else {
      failure({errors});
    }
  }, .2*1000);
});