import Index from './index';

test('imports', () => {
  const e = Index;
  console.log(e);
  expect(typeof e).toEqual('object');
})