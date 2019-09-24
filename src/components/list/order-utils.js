export const order = (data, sortAttribute, sortDescAsc) => {
  if (!sortAttribute) {
    return data;
  }

  // use function in utils
  const compare = ( a, b, attribute ) => {
    const ac = get(attribute, a);
    const bc = get(attribute, b);

    if ( ac < bc ){
      return -1;
    }
    if ( ac > bc ){
      return 1;
    }
    return 0;
  }

  const ordered = data.sort((a, b) => compare(a, b, sortAttribute));

  if (sortDescAsc === false) {
    return ordered.reverse();
  }

  return ordered;
}

export const orderWithPagination = (data, idx, nPerPage) => {
  const start = (idx - 1) * nPerPage;
  const end = (idx) * nPerPage;

  return data.slice(start, end);
}