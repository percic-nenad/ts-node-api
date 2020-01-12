const client = "pg";
const migrations = {
    directory: `${__dirname}/src/database/migrations`,
    stub: `${__dirname}/src/database/migrations/migration-template.js`
};

module.exports = {
    development: {
        database: "ts-node-api",
        client,
        migrations,
        connection: {
            host: "localhost",
            database: "ts-node-api",
            user: "postgres",
            password: "postgres"
        },
        defaultConnection: {
            host: "localhost",
            database: "postgres",
            user: "postgres",
            password: "postgres"
        }
    },
    production: {
        client,
        migrations,
        connection: process.env.DATABASE_URL
    }
};
