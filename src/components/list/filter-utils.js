import NexysUtil from '@nexys/utils';
const { get } = NexysUtil.ds;

export const compare = (main, searchString) => {
  const searchType = typeof main;

  switch (searchType) {
    case 'string':
      return compareString(main, searchString);
    case 'number':
      return main === Number(searchString);
    default:
      return false;
  }
}

export const compareString = (main, searchString) => main.toLowerCase().indexOf(searchString.toLowerCase()) > -1;

export const searchInObject = (searchString, object) => Object.keys(object).map(o => {
    const main = object[o];

    return compare(main, searchString);
  })
  .reduce((a, b) => a || b);

export const applyFilter = (data, filters) => {
  const filterArray = Object.keys(filters).map(f => {
    return {name: f, value: filters[f]}
  });

  if (filterArray.length === 0) {
    return data;
  }

  return data.filter(d => {
    return filterArray.map(f => {
      const searchString = f.value;
      const key = f.name;
      const main = get(key, d);

      if (key === 'globalSearch') {
        return searchInObject(searchString, d)
      }

      if (main === null) {
        return true;
      }

      return compare(main, searchString);
    })
    .reduce((a, b) => a && b);
  });
}