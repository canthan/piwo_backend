import * as path from 'path';

const BASE_PATH = path.join(__dirname, 'src', 'db');

const config = {
	test: {
		client: 'pg',
		connection: 'postgres://postgres:xxx@localhost:5432/piwo_storage_test',
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},
	development: {
		client: 'pg',
		connection: 'postgres://postgres:xxx@localhost:5432/piwo_storage',
		migrations: {
			directory: path.join(BASE_PATH, 'migrations'),
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds'),
		},
	},
};

export default config;
