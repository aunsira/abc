module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '',
      database: 'abc'
    },
  },
  source : {
    url: 'http://www.nasdaq.com/'
  },
  app : {
    port : 3001
  }
}
