import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userRead = async (req, res) => {
    const { email, password } = req.body;
    const dbPath = path.join(__dirname, '../data/db.json');
    
    try{
        const db = new Low(new JSONFile(dbPath), {users: []});
        db.data = db.data || { users: [] };
        await db.read();
        // Asegúrate de que 'data' esté definido correctamente
        if (!db.data) {
            return res.status(500).send("Error al leer la base de datos.");
        }
    
        const user = db.data.users.find(user => user.email == email && user.password == password);
        
        if (user) {
            req.session.user = user;
            return res.send({redirect: '/inicio'});
        } else {
            return res.send({data: "No se encontró el usuario."});
        }
    }catch(error){
        console.error(error);
        res.status(500).send({error: "Error al leer la base de datos."});
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

export {
    userRead,
    logout
}