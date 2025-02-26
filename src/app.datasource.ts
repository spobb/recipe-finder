import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    driver: {},
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'ts_test',
    entities: ['src/api/resources/**/*entity.ts'],
    logging: true,
    // synchronize: true,
});
