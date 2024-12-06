import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderLogin = (req, res) => {
    res.render('login', { title: 'Login |' });
};

const renderHome = (req, res) => {
    if(!req.session.user){
        return res.redirect('/');
    }
    res.render('inicio', { title: 'Inicio ', user: req.session.user });
    console.log(req.session.user);
    
};

const renderAccount = (req, res) => { 
    if(!req.session.user){
        return res.redirect('/');
    }
    res.render('myaccount', { title: 'Account', user: req.session.user });
}  

const deposit = async (req, res) => {
    const { amount } = req.body;
    const dbPath = path.join(__dirname, '../data/db.json');
    const user = req.session.user;

    if (!user) {
        return res.status(401).json({ status: 'error', message: 'Session expired' });
    }

    try{
        const db = new Low(new JSONFile(dbPath), {users: []});
        db.data = db.data || { users: [] };
        await db.read();

        if (!db.data) {
            return res.status(500).send("Error al leer la base de datos.");
        }

        const user = db.data.users.find(user => user.email == req.session.user.email);
        if (user) {
            user.balance += parseFloat(amount);
            req.session.user.balance = req.session.user.balance + parseFloat(amount);
            await db.write();
            return res.send({status: 'success'});
        } else {
            return res.send({status: 'error', message: "No se encontró el usuario."});
        }

    }catch(err){
        console.error(err);
        res.status(500).send({error: "Error al leer la base de datos."});
    }
};

const edit = async (req, res) => {
    const { email, password, username } = req.body;
    const dbPath = path.join(__dirname, '../data/db.json');
    const userSession = req.session.user;

    if (!userSession) {
        return res.status(401).json({ status: 'error', message: 'Session expired' });
    }

    try{
        const db = new Low(new JSONFile(dbPath), {users: []});
        db.data = db.data || { users: [] };
        await db.read();

        if (!db.data) {
            return res.status(500).send("Error al leer la base de datos.");
        }

        const user = db.data.users.find(user => user.email == userSession.email);
        if (user) {
            user.email = email;
            user.password = password;
            user.user = username;
            req.session.user = { ...user };
            req.session.save(async (err) => {
                if (err) {
                    console.error("Error saving session:", err);
                    return res.status(500).send({ status: 'error', message: 'Session save failed.' });
                }
    
                await db.write(); 
                return res.send({ status: 'success' });
            });
        } else {
            return res.send({status: 'error', message: "No se encontró el usuario."});
        }
    }catch(err){
        console.error(err);
        res.status(500).send({error: "Error al leer la base de datos."});
    }
}; 

export {
    renderLogin,
    renderHome,
    deposit,
    renderAccount,
    edit
}