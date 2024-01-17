
import Sequelize, { DataTypes }  from "sequelize";
import {db} from "../database/conexion.js";

const mascotas = db.define("mascotas",{
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: true
    },
    edad:{
        type: Sequelize.INTEGER,
        allowNull:true
    },
    detalles:{
        type: Sequelize.STRING,
        allowNull:true
    },

    detalles1:{
        type: Sequelize.STRING,
        allowNull:true
    },
    celular:{
        type: Sequelize.INTEGER,
        allowNull:true
    },
    nombreA:{
        type: Sequelize.STRING,
        allowNull:true
    },
  
    imagen: {
        type: Sequelize.STRING, // Puedes cambiar a otro tipo según tus necesidades
    },
    

});

export {mascotas}