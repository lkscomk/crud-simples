module.exports = {
    client: "mysql",
    connection: {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USERNAME
    },
    timezone: 'UTC',
    migrations: {
      tableName: "knex_migrations"
    },
    pool: {
      max: 10,
      min: 2
    }
  };