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
});
