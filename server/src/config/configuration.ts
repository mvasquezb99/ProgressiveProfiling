export default () => ({
  query: {
    Distance: {
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
    exportUrl: 'https://magneto:8000/profiles',
  },
});
