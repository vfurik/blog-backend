module.exports = {
  development: {
    url: 'postgres://postgres@localhost/blog-backend',
  },
  test: {
    url: process.env.DATABASE_URL,
  },
  integration: {
    url: process.env.DATABASE_URL,
  },
  production: {
    url: process.env.DATABASE_URL,
  },
};
