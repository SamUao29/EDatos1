/*
*  Archivo utils.js
*  Lógica matemática para el cálculo de préstamos
*/

function calcularCuotaMensual(prestamo, meses, interes) {
    let p = Number(prestamo);
    let n = Number(meses);
    let i = Number(interes);

    // Aplicando la fórmula de amortización exigida
    let cuota = p * ((Math.pow(1 + i, n) * i) / (Math.pow(1 + i, n) - 1));
    
    return cuota.toFixed(2); // Redondeamos a 2 decimales
}

// Exportamos la función para que index.js pueda usarla
module.exports = { calcularCuotaMensual };