import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import router from './public/routes/routes.js'
import { fileURLToPath } from 'url';
import session from 'express-session';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    }
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./public/views'));

app.use((req, res, next) => {
    console.log(req.session);
    next();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
