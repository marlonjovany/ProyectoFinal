import express from "express";
import {crear,buscarId,buscar,actualizar,eliminar} from "../controladores/mascotascontroller.js";
const routerMascotas = express.Router();

routerMascotas.get("/",(req,res)=>{
    res.send("Bienvenido a Mascotas");
});

routerMascotas.post("/crear",(req,res)=>{
    crear(req,res);
});

routerMascotas.get("/buscar/:id",(req,res)=>{
    buscarId(req,res);
});

routerMascotas.get("/buscar/:nombre",(req,res)=>{
    buscarNombre(req,res);
});

routerMascotas.get("/buscar",(req,res)=>{
    buscar(req,res);
});


routerMascotas.put("/actualizar/:id",(req,res)=>{
    actualizar(req,res);
});

routerMascotas.delete("/eliminar/:id",(req,res)=>{
    eliminar(req,res);
});


export {routerMascotas}




