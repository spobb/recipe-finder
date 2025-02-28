import 'module-alias/register';

import * as express from 'express';
import * as path from 'path';
import { Request, Response } from 'express';
import userRouter from '@user/user.route';
import authRouter from '@auth/auth.route';
import { AppDataSource } from '@src/app.datasource';
import { IRequest } from '@interfaces';

const app = express();
app.use(express.json());
app.use(express.urlencoded());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/css', express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));


app.get('/', (req: Request, res: Response) => {
	res.render('home', res.locals.data);
});

app.get('/profile', (req: IRequest, res: Response) => {
	res.render('profile', req.user);
})

app.get('/contact', (req: Request, res: Response) => {
	res.render('contact');
});

app.use('/users/', userRouter);
app.use('/auth/', authRouter);

(async () => {
	const port = process.env.PORT ?? 8000;
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