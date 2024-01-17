import {mascotas} from "../modelo/mascotasModelo.js";
import multer from 'multer';
//Crear un recurso 






const crear = async (req, res) => {
    try {
        if (!req.body.nombre || !req.file) {
            res.status(400).json({
                mensaje: "El nombre y la imagen son obligatorios."
            });
            return;
        }

        const dataset = {
            nombre: req.body.nombre,
            edad: req.body.edad,
            detalles: req.body.detalles,
            detalles1: req.body.detalles1,
            celular: req.body.celular,
            nombreA: req.body.nombreA,
            // En lugar de almacenar la ruta en la base de datos, almacenamos el nombre del archivo
            imagen: req.file.filename,
        };

        // Usar Sequelize para crear el recurso (mascota) en la base de datos
        const resultado = await Mascota.create(dataset);
        res.status(201).json({
            mensaje: "Mascota creada correctamente",
            resultado
        });
    } catch (error) {
        console.error(`Error al crear la mascota: ${error}`);
        res.status(500).json({
            mensaje: `Error al crear la mascota: ${error}`
        });
    }
};

const crear1 = (req,res)=>{
    if(!req.body.nombreA){
        res.status(400).json({
            mensaje: "El nombre no puede estar vacio."
        }) ;
        return;
    }
    const dataset={
        
        
        celular: req.body.celular,
        nombreA: req.body.nombreA
    };

    //Usar Sequelize para crear el recurso
    mascotas.create(dataset).then((resultado)=>{
        res.status(200).json({
            mensaje: "Registro creado correctamente"
        })
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `Error al crear el registro ::: ${err}`
        })

    })


};


//Buscar recurso por ID
const buscarId = (req,res)=>{
    const id = req.params.id;
    if(id == null){
        res.status(203).json({
            mensaje: `El id no puede estar vacio`
        });
        return;
    }

    mascotas.findByPk(id).then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `Registro no encontrado ::: ${err}`
        });
    });

}

const buscarNombre = (req,res)=>{
    const id = req.params.nombre;
    if(id == null){
        res.status(203).json({
            mensaje: `El id no puede estar vacio`
        });
        return;
    }

    mascotas.findByPk(id).then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `Registro no encontrado ::: ${err}`
        });
    });

}


//Buscar recurso por ID
const buscar = (req,res)=>{
    
    mascotas.findAll().then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `No se encontraron Registros ::: ${err}`
        });
    });

};


 


//Actualizar un recurso

const actualizar=(req,res)=>{
    const id= req.params.id;
    if(!req.body.nombre && !req.body.edad && !req.body.detalles && !req.body.detalles1 && !req.body.celular && !req.body.nombreA ){
        res.status(400).json({
            mensaje: `No se encontraron Datos para Actualizar`
        });
        return;
    }
    else{
        const nombre= req.body.nombre;
        const edad=req.body.edad;
        const detalles=req.body.detalles;
        const detalles1=req.body.detalles1;
        const celular=req.body.celular;
        const nombreA=req.body.nombreA;
        
        mascotas.update({nombre,edad,detalles,detalles1,celular,nombreA,},{where:{id}})
        .then((resultado)=>{
            res.status(200).json({
                mensaje: `Registro Actualizado`
            });
        })
        .catch((err)=>{
            res.status(500).json({
                mensaje: `Error al actualizar Registro ::: ${err}`
            });
        })
    }

};

const eliminar=(req,res)=>{
    const id= req.params.id;
    if(id == null){
        res.status(203).json({
            mensaje: `El id no puede estar vacio`
        });
        return;
    }
    mascotas.destroy({where:{id}})
    .then((resultado)=>{
        res.status(200).json({
            mensaje: `Registro Eliminado`
        });
    })
    .catch((err)=>{
        res.status(500).json({
            mensaje: `Error al eliminar Registro ::: ${err}`
        });
    })
    

};






export {crear,crear1,buscarId,buscar,buscarNombre,actualizar,eliminar}
