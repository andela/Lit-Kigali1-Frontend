module.exports = {
  signupUser: {
    username: 'test',
    email: 'test@email.com',
    password: 'test@test',
    firstName: 'test',
    lastName: 'test',
  },
  articleData: {
    id: 'f9a4731d-7dea-4a9a-9b7d-8766d651c202',
    userId: 'dfef16f9-11a7-4eae-9ba0-7038c6ccaa73',
    slug: 'new-article-1',
    title: 'new article one',
    description: 'new article',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus ipsum non metus finibus ultricies. Donec ac auctor dui, sed fringilla est. Duis et pellentesque nisl, a gravida felis. Ut tempor felis id dignissim congue. Nunc blandit nunc sit amet dui pharetra, quis porttitor sem ullamcorper. Suspendisse faucibus imperdiet lacinia.',
    status: 'published',
    readingTime: '1 min',
    tagList: ['test', 'article'],
  },
  articleReducerState: {
    articles: [],
  },
  ratingData: {
    id: '1a322238-dadf-406c-8252-df926958622e',
    userId: 'd018c3b5-13c7-41c0-8b2c-4ec1cb6b21da',
    articleId: 'f9a4731d-7dea-4a9a-9b7d-8766d651c202',
    state: null,
    rating: 3,
    createdAt: '2019-04-19T14:14:09.096Z',
    updatedAt: '2019-04-19T17:50:48.826Z',
    author: {
      username: 'username',
      firstName: 'First Name',
      lastName: 'Last Name',
      image: null,
    },
    url: '/articles/article-slug/rating',
  },
};
