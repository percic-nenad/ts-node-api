const gulp = require('gulp');
const knex = require('knex');
const knexfile = require('../knexfile.js');

gulp.task('drop-db', async () => {
	return await dropDatabase('development');
});

gulp.task('truncate-db', async () => {
	return await truncateDatabase('development');
})

gulp.task('migrate-db', async () => {
	return await migrateDatabase('development');
});

gulp.task('create-db', async () => {
	return await createDatabase('development')
});

gulp.task('recreate-db', gulp.series(
	'drop-db',
	'create-db',
	'migrate-db'
));

async function dropDatabase(environment) {
	await openDefaultDatabase(environment, async (knexInstance, knexConfig) => {
		await knexInstance.raw(`DROP DATABASE IF EXISTS "${knexConfig.database}"`);
	});
}

async function createDatabase(environment) {
	await openDefaultDatabase(environment, async (knexInstance, knexConfig) => {
		await knexInstance.raw(`CREATE DATABASE "${knexConfig.database}"`);
	});
}

async function migrateDatabase(environment) {
	await openDatabase(environment, async knexInstance => {
		await knexInstance.migrate.latest();
	})
}

async function truncateDatabase(environment) {
	await openDatabase(environment, async knexInstance => {
		await knexInstance.raw(`SELECT truncate_tables()`);
	})
}

async function openDefaultDatabase(environment, callback) {
	const knexConfig = knexfile[environment];
	const knexInstance = knex({
		client: knexConfig.client,
		connection: knexConfig.defaultConnection
	});

	try {
		await callback(knexInstance, knexConfig);
	} catch (error) {
		console.log(error);
	} finally {
		await knexInstance.destroy();
	}
}

async function openDatabase(environment, callback) {
	const knexConfig = knexfile[environment];
	const knexInstance = knex(knexConfig);

	try {
		await callback(knexInstance);
	} catch (error) {
		console.log(error);
	} finally {
		await knexInstance.destroy();
	}
}
