const getCover = (entityMap) => {
  let url;
  const entityMapValue = Object.values(entityMap).find(value => value.type === 'image');
  if (entityMapValue) {
    url = entityMapValue.data.src;
    return url;
  }
  return url;
};

export default getCover;
