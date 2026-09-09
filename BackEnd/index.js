// Importamos la función de cálculo desde utils.js
const misFunciones = require('./scripts/utils');

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

let prestamosArr = [];

app.use(express.json());
app.use(cors());

// Ruta GET: Envía el historial de préstamos al FrontEnd en formato JSON
app.get('/transactions', (req, res) => {
  console.log('Enviando historial de préstamos...');
  res.send(JSON.stringify(prestamosArr));
});

// Ruta POST: Recibe los datos, calcula usando utils.js y guarda
app.post('/transactions', (req, res) => {  
  console.log('Recibiendo nuevos datos de préstamo...');
  let datosCliente = req.body; 
  
  // Llamamos a la función que está en utils.js para calcular la cuota
  let cuotaCalculada = misFunciones.calcularCuotaMensual(
      datosCliente.prestamo, 
      datosCliente.meses, 
      datosCliente.interes
  );
  
  // Creamos el objeto final con la cuota ya calculada por el BackEnd
  let prestamoFinal = {
      nombre: datosCliente.nombre,
      prestamo: datosCliente.prestamo,
      meses: datosCliente.meses,
      interes: datosCliente.interes,
      cuota: cuotaCalculada
  };
  
  // Guardamos en el arreglo del servidor
  prestamosArr.unshift(prestamoFinal);
  
  // Respondemos al FrontEnd
  res.send(JSON.stringify({ mensaje: "Préstamo calculado y guardado con éxito" }));
});

app.listen(port, () => {
  console.log('BackEnd ejecutándose en http://localhost:' + port);
});