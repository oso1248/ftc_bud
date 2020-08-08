// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection:'postgres://localhost/brewing',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './db/migrations/'
    },
    seeds: {
      directory: './db/seeds/production'
    },
  }
}
