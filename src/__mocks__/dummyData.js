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
  draftjsBody: [
    {
      key: 'dhjdh',
      text:
        'orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas justo arcu, sit amet eleifend velit venenatis et. Curabitur vel ipsum est. Phasellus iaculis arcu vel ligula faucibus laoree',
    },
    {
      key: 'loetvbd',
      text:
        'orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas justo arcu, sit amet eleifend velit venenatis et. Curabitur vel ipsum est. Phasellus iaculis arcu vel ligula faucibus laoree',
    },
    {
      key: 'ottsb',
      text:
        'orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas justo arcu, sit amet eleifend velit venenatis et. Curabitur vel ipsum est. Phasellus iaculis arcu vel ligula faucibus laoree',
    },
    {
      key: 'hsdghsd',
      text:
        'Maecenas a tellus sit amet metus congue dignissim at et ante. Etiam mollis sagittis elit sit amet vestibulum. In hac habitasse platea dictumst. Aliquam ut varius ante',
    },
  ],
  urlValue:
    'https://cdn.shopify.com/s/files/1/0550/6737/products/ORANGEWOOD_MANHATTAN_SPRUCE_BEGINNER_DREADNAUGHT_ACOUSTIC_GUITAR-1_2000x.png?v=1524595098',
  jsonFormat:
    '{"key":"dhjdh","text":"orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas justo arcu, sit amet eleifend velit venenatis et. Curabitur vel ipsum est. Phasellus iaculis arcu vel ligula faucibus laoree"}',
  entityMap1: {
    0: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    1: {
      type: 'image',
      mutability: 'IMMUTABLE',
      data: {
        src:
          'https://res.cloudinary.com/litkigaliauthorshaven/image/upload/v1556089726/beach-exotic-holiday-248797_fegfqb.jpg',
      },
    },
    2: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    3: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    4: {
      type: 'video',
      mutability: 'IMMUTABLE',
      data: {
        src:
          'https://res.cloudinary.com/litkigaliauthorshaven/video/upload/v1556089741/BirdNoSound_1_klovmd.mp4',
      },
    },
  },
  entityMap2: {
    0: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    2: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    3: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    4: {
      type: 'video',
      mutability: 'IMMUTABLE',
      data: {
        src:
          'https://res.cloudinary.com/litkigaliauthorshaven/video/upload/v1556089741/BirdNoSound_1_klovmd.mp4',
      },
    },
  },
  file: {
    lastModified: 1553947426997,
    lastModifiedDate: new Date(),
    name: 'beach-exotic-holiday-248797.jpg',
    size: 522195,
    type: 'image/jpeg',
    webkitRelativePath: '',
  },
  articleDataDraft: {
    id: 'f9a4731d-7dea-4a9a-9b7d-8766d651c202',
    userId: 'dfef16f9-11a7-4eae-9ba0-7038c6ccaa73',
    slug: 'new-article-1',
    title: 'new article one',
    description: 'The CEOs of YouTube and Twitter are being',
    body:
      '{"blocks":[{"key":"crkve","text":"The CEOs of YouTube and Twitter are being far more cautious in addressing the problems of their platforms than they were in building them","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    status: 'published',
    readingTime: '1 min',
    tagList: ['test', 'article'],
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

  dislikeData: {
    state: 'dislike',
    updatedAt: '2019-04-25T16:20:31.730Z',
    author: {
      firstName: 'Christian',
      lastName: 'Rene',
      image: null,
    },
  },

  likeData: {
    state: 'like',
    updatedAt: '2019-04-25T16:20:31.730Z',
    author: {
      firstName: 'Christian',
      lastName: 'Rene',
      image: null,
    },
  },
  draftjsBody: [
    {
      key: 'dhjdh',
      text:
        'orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas justo arcu, sit amet eleifend velit venenatis et. Curabitur vel ipsum est. Phasellus iaculis arcu vel ligula faucibus laoree',
    },
    {
      key: 'loetvbd',
      text:
        'orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas justo arcu, sit amet eleifend velit venenatis et. Curabitur vel ipsum est. Phasellus iaculis arcu vel ligula faucibus laoree',
    },
    {
      key: 'ottsb',
      text:
        'orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas justo arcu, sit amet eleifend velit venenatis et. Curabitur vel ipsum est. Phasellus iaculis arcu vel ligula faucibus laoree',
    },
    {
      key: 'hsdghsd',
      text:
        'Maecenas a tellus sit amet metus congue dignissim at et ante. Etiam mollis sagittis elit sit amet vestibulum. In hac habitasse platea dictumst. Aliquam ut varius ante',
    },
  ],
  urlValue:
    'https://cdn.shopify.com/s/files/1/0550/6737/products/ORANGEWOOD_MANHATTAN_SPRUCE_BEGINNER_DREADNAUGHT_ACOUSTIC_GUITAR-1_2000x.png?v=1524595098',
  jsonFormat:
    '{"key":"dhjdh","text":"orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas justo arcu, sit amet eleifend velit venenatis et. Curabitur vel ipsum est. Phasellus iaculis arcu vel ligula faucibus laoree"}',
  entityMap1: {
    0: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    1: {
      type: 'image',
      mutability: 'IMMUTABLE',
      data: {
        src:
          'https://res.cloudinary.com/litkigaliauthorshaven/image/upload/v1556089726/beach-exotic-holiday-248797_fegfqb.jpg',
      },
    },
    2: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    3: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    4: {
      type: 'video',
      mutability: 'IMMUTABLE',
      data: {
        src:
          'https://res.cloudinary.com/litkigaliauthorshaven/video/upload/v1556089741/BirdNoSound_1_klovmd.mp4',
      },
    },
  },
  entityMap2: {
    0: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    2: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    3: {
      type: 'LINK',
      mutability: 'MUTABLE',
      data: {
        url: 'https://www.lipsum.com/feed/html',
      },
    },
    4: {
      type: 'video',
      mutability: 'IMMUTABLE',
      data: {
        src:
          'https://res.cloudinary.com/litkigaliauthorshaven/video/upload/v1556089741/BirdNoSound_1_klovmd.mp4',
      },
    },
  },
  file: {
    lastModified: 1553947426997,
    lastModifiedDate: new Date(),
    name: 'beach-exotic-holiday-248797.jpg',
    size: 522195,
    type: 'image/jpeg',
    webkitRelativePath: '',
  },
  articleDataDraft: {
    id: 'f9a4731d-7dea-4a9a-9b7d-8766d651c202',
    userId: 'dfef16f9-11a7-4eae-9ba0-7038c6ccaa73',
    slug: 'new-article-1',
    title: 'new article one',
    description: 'The CEOs of YouTube and Twitter are being',
    body:
      '{"blocks":[{"key":"crkve","text":"The CEOs of YouTube and Twitter are being far more cautious in addressing the problems of their platforms than they were in building them","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    status: 'published',
    readingTime: '1 min',
    tagList: ['test', 'article'],
  },
  article: {
    title: 'hello world',
    body: 'ejej lkejke lkejde eljfe kefnef efnefve lkenfefenf kefnerjfnern elkfnrfernflef elkfnejfernf lefnerfe kefnrefne klekfnerfefnlef ekfnefnerel nefefnef efnefklnef kenfefnef kenferfn',
    tagList: [],
  },
  draftJsContentState: {
    blocks: [
      {
        key: 'bok6r',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis erat sit amet nunc condimentum interdum. Morbi elementum lectus quis mauris interdum finibus. Quisque eleifend sapien molestie ex accumsan, eget placerat erat convallis. Nullam porttitor, elit sit amet porta ultricies, tortor ipsum efficitur tortor, vitae sagittis mauris leo et orci. Nullam mi turpis, tempus ac tincidunt vel, pulvinar sit amet turpis. Nullam commodo imperdiet blandit. Pellentesque laoreet pulvinar vestibulum. Sed molestie et lorem quis elementum. Phasellus condimentum turpis in leo accumsan, sed egestas urna pretium. Aliquam ac sapien vestibulum, tristique dolor sit amet, euismod sem. Donec risus odio, pretium porttitor tincidunt ut, mattis quis urna. Vivamus risus velit, cursus sed vulputate ut, sagittis nec urna. Donec ullamcorper, nisi a mollis porta, lacus augue iaculis tellus, a iaculis lectus ex non neque. Aliquam fringilla dui non pulvinar tempor. Duis nec facilisis purus, a faucibus nisl.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      }],
    entityMap: {},
  },
  commentData: [
    {
      id: 'hdsh jsdfnsdf sdfndsk slvsdjhsdklksfnsd ',
      body: 'sjdndsfnsdfsdnfnsdfsdnf',
      userId: 'sdhfdsfsdnfdsfndsmfdsfdsnnfdsnxn',
      author: {
        username: 'Morris',
      },
    },
    {
      id: 'hdsh jsdfnsdf ksdjvdfsjsdkksdfndsk ',
      body: 'sjdndsfnsdfsdnfnsdfsdnf',
      userId: 'sdhfdsfsdnfdsfndsmfdsfdsnnfdsnxn',
      author: {
        username: 'Yves',
      },
    },
    {
      id: 'hdsh jsdfnsdf k slvsdjhsdklksfnsd ',
      body: 'sjdndsfnsdfsdnfnsdfsdnf',
      userId: 'sdhfdsfsdnfdsfndsmfdsfdsnnfdsnxn',
      author: {
        username: 'Chris',
      },
    },
  ],
};
