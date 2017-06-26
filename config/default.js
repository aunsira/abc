module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host:     'localhost',
      user:     'root',
      password: '',
      database: 'abc'
    }
  },
  source: {
    url: 'http://www.nasdaq.com/'
  },
  app: {
    port:     process.env.PORT || 3001,
    interval: 60000
  }
}
