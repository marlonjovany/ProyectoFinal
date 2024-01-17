import express from "express";
import { routerMascotas } from "../rutas/mascotasRouter.js";
import { db } from "../database/conexion.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

// Obtener la ruta del módulo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear Instancia de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configurar Multer para la carga de archivos (imágenes)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/imagen'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Verificar Conexión a Base de Datos
db.authenticate().then(() => {
    console.log(`Base de Datos conectada de manera exitosa`);
}).catch(err => {
    console.log(`Error al conectarse a la Base de Datos ::: ${err}`);
});

// Definir Rutas
app.get("/", (req, res) => {
    res.send("Hola Backend Mysql");
});

app.post("/cargar-imagen", upload.single('imagen'), async (req, res) => {
    try {
        // Guardar la ruta de la imagen en la base de datos
        const nuevaImagen = await Imagen.create({
            ruta: `public/imagen/${req.file.filename}` // Guardar la ruta  en la base de datos
        });

        res.status(201).json({
            message: 'Imagen cargada correctamente',
            imagePath: nuevaImagen.ruta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar la imagen' });
    }
});

// Rutas
app.use("/mascotas", routerMascotas);

// Puerto del Servidor
const PORT = 8000;

// Verificar que pueda sincronizar con la base de datos
db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor Inicializado en puerto ${PORT}`);
    });
}).catch(err => {
    console.log(`Error al sincronizar Base de Datos ${err}`);
});
