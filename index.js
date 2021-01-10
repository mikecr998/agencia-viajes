// const express = require('express') //Common JS
import express from 'express'
import router from './routes/index.js' //Importar el router
import db from './config/db.js'
import dotenv from 'dotenv';

const server = express()

// Conectar la BD
db.authenticate()
  .then(() => console.log('DB conected'))
  .catch(error => console.log(error))

// Definir puerto
// const port = process.env.PORT || 4000

// Habilitar PUG(motor de plantilla)
server.set('view engine', 'pug')

// Obtener el año actual
server.use((req,res,next) => {
  res.locals.nombreSitio = "Agencia de Viajes"
  res.locals.fecha = new Date().getFullYear()
  // console.log(res.locals)
  next()
})

// Agregar bodyParser para leer los datos del formulario
server.use(express.urlencoded({extended: true}))

// Definir la carpeta publica
server.use(express.static('public'))

// Agregar router
server.use('/',router) //use soporta todos los verbos http

// Puerto y Host para la app
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
server.listen(port, host,() => {  
  console.log(`Server working succesfully`)
})