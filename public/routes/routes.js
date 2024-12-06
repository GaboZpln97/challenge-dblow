import express from 'express';
const router = express.Router();
import {
    renderLogin,
    renderHome,
    deposit,
    renderAccount,
    edit
} from '../controllers/controllers.js';
import{
    userRead,
    logout
} from '../controllers/login_controllers.js'

router.get('/', renderLogin);
router.get('/login', renderLogin);
router.post('/getInfoUser', userRead);
router.get('/inicio', renderHome);
router.get('/logout', logout);
router.post('/deposit', deposit);
router.get('/account', renderAccount);
router.post('/edit', edit);

export default router;