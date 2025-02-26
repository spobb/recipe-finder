import 'module-alias/register';

import * as express from 'express';
import * as path from 'path';
import { Request, Response } from 'express';
import userRouter from '@user/user.route';
import { AppDataSource } from '@src/app.datasource';

const app = express();
app.use(express.json());

(async () => {
	const port = process.env.PORT ?? 3000;
	try {
		await AppDataSource.initialize();
		app.listen(port, err => {
			if (err) console.error('Error during server startup', err);
			console.log(`http://localhost:${port}`);
		});
	} catch (err) {
		console.error(err);
	}
})();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/css', express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));

app.get('/', (req: Request, res: Response) => {
	res.render('home');
});

app.get('/profile', (req: Request, res: Response) => {
	res.render('profile');
});

app.get('/contact', (req: Request, res: Response) => {
	res.render('contact');
});

app.use('/users/', userRouter);
