export default () => ({
  query: {
    similar: {
      minWeight: 5,
    },
    users: {
      limit: 15,
    },
  },
  algorithm: {
    likeWeight: 1,
    dislikeWeight: -1,
    superlikeWeight: 10,
    minLimit: 5,
  },
  magneto: {
    exportUrl: 'http://127.0.0.1:3000/magneto/profilers',
  },
  email: {
    profilers: {
      mail: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    surveyUrl: process.env.SURVEY_URL,
  },
});
