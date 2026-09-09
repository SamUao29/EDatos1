/*
*  Archivo main.js
*  Creado por: Orlando Arboleda Molina
*  Fecha: 5-Julio-2024
*
*  Descripción: 
*  Logico frontEnd para suministrar datos JSON, 
*  para el curso de EDyA1 en la Universidad Autónoma de Occidente
*/

/* const formElement = document.getElementById("generarTransaccion");

formElement.addEventListener('submit',(event) =>{
    // para que no se recarge la pagina
    event.preventDefault();
    let peso = document.getElementById("elPeso").value;
    let estatura = document.getElementById("laEstatura").value;
    // por ser un radio button
    let lasAcciones = document.getElementsByName("accion");
    let accion;
    for(let i=0; i<lasAcciones.length; i++){
        if (lasAcciones[i].checked){
            accion = lasAcciones[i].value;
            break;
        }
    }
    
    let transaction = { peso, estatura, accion };
    let transactionJson = JSON.stringify(transaction);
    console.log(transactionJson);
    fetch('http://localhost:3000/transactions',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'            
          },
        body: transactionJson
    })    
})*/

const nombre = document.getElementById("nombre");
const prestamo = document.getElementById("prestamo");
const meses = document.getElementById("meses");
const interes = document.getElementById("interes");

const btnCalcular = document.getElementById("btnCalcular");
const btnMostrar = document.getElementById("btnMostrar");
const resultado = document.getElementById("resultado");
const btnSumar = document.getElementById("btnSumar");
const btnMayor300 = document.getElementById("btnMayor300");
const btnMenosAno = document.getElementById("btnMenosAno");


let prestamos = [];

function formatearPrestamo(p) {
    return `${p.nombre} – $ ${p.cuota} -- $ ${p.prestamo} -- ${p.meses} meses -- interés ${p.interes * 100}%`;
}

function validarDatos(nombreValor, prestamoValor, mesesValor, interesValor) {
    if (!nombreValor.trim()) {
        return "Debes ingresar un nombre";
    }
    if (!prestamoValor || prestamoValor <= 0) {
        return "El préstamo debe ser un número mayor a 0";
    }
    if (!mesesValor || mesesValor <= 0 || !Number.isInteger(mesesValor)) {
        return "Los meses deben ser un número entero mayor a 0";
    }
    if (!interesValor || interesValor <= 0) {
        return "El interés debe ser un número mayor a 0";
    }
    return null;
}

btnCalcular.addEventListener("click", function() {
    const nombreValor = nombre.value;
    const prestamoValor = Number(prestamo.value);
    const mesesValor = Number(meses.value);
    const interesValor = Number(interes.value);

    const error = validarDatos(nombreValor, prestamoValor, mesesValor, interesValor);
    if (error) {
        resultado.value = error;
        return;
    }

    const prestamoObjeto = {
        nombre: nombreValor,
        prestamo: prestamoValor,
        meses: mesesValor,
        interes: interesValor
    };

    fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prestamoObjeto)
    })
    .then(response => response.json())
    .then(() => fetch('http://localhost:3000/transactions'))
    .then(response => response.json())
    .then(data => {
        prestamos = data;
        resultado.value = formatearPrestamo(prestamos[0]);
    })
    .catch(() => {
        resultado.value = "No se pudo conectar con el servidor";
    });
});

btnMostrar.addEventListener("click", function() {
    fetch('http://localhost:3000/transactions')
    .then(response => response.json())
    .then(data => {
        prestamos = data;
        resultado.value = "";
        prestamos.forEach(function(p) {
            resultado.value += formatearPrestamo(p) + "\n";
        });
    })
    .catch(() => {
        resultado.value = "No se pudo conectar con el servidor";
    });
});

btnSumar.addEventListener("click", function() {

    let suma = 0;

    prestamos.forEach(function(prestamo) {
        suma = suma + Number(prestamo.cuota);
    });

    resultado.value = "La sumatoria de las cuotas es: $" + suma.toFixed(2);

});

btnMayor300.addEventListener("click", function() {

    const cuotasMayores = prestamos.filter(function(prestamo) {
        return Number(prestamo.cuota) > 300000;
    });

    resultado.value = "";

    cuotasMayores.forEach(function(prestamo) {
        resultado.value +=
            "Nombre: " + prestamo.nombre +
            "\nPréstamo: $" + prestamo.prestamo +
            "\nMeses: " + prestamo.meses +
            "\nInterés: " + (prestamo.interes * 100) + "%" +
            "\nCuota: $" + prestamo.cuota +
            "\n\n";
    });

});

btnMenosAno.addEventListener("click", function() {

    const prestamosMenosAno = prestamos.filter(function(prestamo) {
        return prestamo.meses < 12;
    });

    resultado.value = "";

    prestamosMenosAno.forEach(function(prestamo) {
        resultado.value +=
            "Nombre: " + prestamo.nombre +
            "\nPréstamo: $" + prestamo.prestamo +
            "\nMeses: " + prestamo.meses +
            "\nInterés: " + (prestamo.interes * 100) + "%" +
            "\nCuota: $" + prestamo.cuota +
            "\n\n";
    });

});
