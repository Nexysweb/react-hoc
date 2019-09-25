import NexysUtil from '@nexys/utils';
const { get } = NexysUtil.ds;

export const applyFilter = (data, filters) => {
  const filterArray = Object.keys(filters).map(f => {
    return {name: f, value: filters[f]}
  });

  if (filterArray.length === 0) {
    return data;
  }

  return data.filter(d => {
    return filterArray.map(f => {
      const searchString = get(f.name, d);

      if (searchString === null) {
        return true;
      }

      return searchString.toLowerCase().indexOf(f.value.toLowerCase()) > -1;
    })
    .reduce((a, b) => a && b);
  });
}