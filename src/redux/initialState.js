module.exports = {
  user: {
    loading: true,
    profile: {
      articles: [],
    },
    articles: [],
    favorites: [],
  },
  forgotPassword: {
    submitting: false,
    success: false,
    successMessage: '',
    email: '',
    newPassword: '',
    confirmNewpassword: '',
    message: '',
    errors: [],
  },
  currentUser: {
    message: '',
    following: false,
    deletingArticle: false,
    isLoggedIn: localStorage.getItem('token') !== null,
    profile: {
      articles: [],
    },
    articles: [],
    favorites: [],
  },
  signUp: {
    submitting: false,
    success: false,
    successMessage: '',
    username: '',
    email: '',
    password: '',
    message: '',
    errors: [],
  },
  login: {
    submitting: false,
    credentials: {
      username: '',
      password: '',
    },
  },
  article: {
    loading: true,
    submitting: false,
    searching: false,
    success: true,
    singleArticle: {
      title: '',
      body: '',
      tagList: [],
    },
    createArticle: {
      title: '',
      body: '',
      tagList: [],
    },
    articlesList: [],
  },
};
