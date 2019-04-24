const getDescription = (article) => {
  let articleText = '';
  article.map((paragraph) => {
    articleText += paragraph.text;
    return articleText;
  });
  const description = articleText.slice(0, 500);

  return description;
};

export default getDescription;
