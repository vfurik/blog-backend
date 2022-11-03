module.exports = {
  development: {
    url: 'postgres://postgres@localhost/blog-backend',
  },
  test: {
    url: process.env.DATABASE_URL,
  },
};
