// Ver préstamos simulados
const prestamosSimulados = [
    new Prestamo(250000, 15, 12, calcularCuotaMensual(250000, 15, 12)),
    new Prestamo(500000, 30, 36, calcularCuotaMensual(500000, 30, 36)),
    new Prestamo(150000, 7, 36, calcularCuotaMensual(3000, 7, 36)),
    new Prestamo(10000, 25, 6, calcularCuotaMensual(3000, 25, 6)),
    new Prestamo(3000, 7, 3, calcularCuotaMensual(3000, 7, 3)),
    new Prestamo(130000, 12, 12, calcularCuotaMensual(3000, 12, 12)),
    new Prestamo(25000, 20, 12, calcularCuotaMensual(3000, 20, 12)),
];


// Objeto para representar un préstamo
function Prestamo(monto, tasaInteresAnual, plazoMeses, cuotaMensual) {
    this.monto = monto;
    this.tasaInteresAnual = tasaInteresAnual;
    this.plazoMeses = plazoMeses;
    this.cuotaMensual = cuotaMensual;
}

// Función para calcular la cuota mensual
function calcularCuotaMensual(monto, tasaInteresAnual, plazoMeses) {
    const tasaMensual = tasaInteresAnual / 100 / 12;
    const factor = calcularFactor(plazoMeses, tasaMensual);
    const cuota = (monto * tasaMensual * factor) / (factor - 1);
    return cuota.toFixed(2);
}

// Función para calcular el factor
function calcularFactor(plazoMeses, tasaMensual) {
    let factor = 1;
    for (let i = 0; i < plazoMeses; i++) {
        factor *= 1 + tasaMensual;
    }
    return factor;
}

// Función para mostrar la información de un préstamo en una ventana de alerta
function mostrarInformacionPrestamoEnAlerta(prestamo) {
    const mensaje =
        "Monto del préstamo: $" +
        prestamo.monto +
        "\nTasa de interés anual: " +
        prestamo.tasaInteresAnual +
        "%\nPlazo en meses: " +
        prestamo.plazoMeses +
        "\nCuota mensual: $" +
        prestamo.cuotaMensual;
    alert(mensaje);
}

// Función principal para interactuar con el usuario
function simuladorPrestamo() {
    alert("Bienvenido al simulador de préstamo personal");

    while (true) {
        const opcion = prompt("Si desea realizar una simulación ingrese 'si', si desea ver las simulaciones anteriores ingrese 'ver', o si desea salir ingrese 'no':").toLowerCase();

        if (opcion === "si") {
            const montoPrestamo = parseFloat(prompt("Ingrese el monto que desea solicitar:"));
            const tasaInteresAnual = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
            const plazoMeses = parseInt(prompt("Ingrese el plazo en meses:"));

            if (isNaN(montoPrestamo) || isNaN(tasaInteresAnual) || isNaN(plazoMeses) || plazoMeses <= 0) {
                alert("Por favor, ingresar un valor numérico correcto.");
            } else {
                const cuotaMensual = calcularCuotaMensual(montoPrestamo, tasaInteresAnual, plazoMeses);

                const nuevoPrestamo = new Prestamo(montoPrestamo, tasaInteresAnual, plazoMeses, cuotaMensual);
                prestamosSimulados.push(nuevoPrestamo);

                console.log("Simulación realizada con éxito:");
                mostrarInformacionPrestamoEnAlerta(nuevoPrestamo);

                const otraSimulacion = prompt("¿Desea realizar otra simulación? (si/no)").toLowerCase();
                if (otraSimulacion === "no") {
                    alert("¡Gracias por utilizar el simulador!");
                    return;
                }
            }
        } else if (opcion === "ver") {
            if (prestamosSimulados.length === 0) {
                alert("No hay simulaciones anteriores.");
            } else {
                alert("Simulaciones anteriores:");
                for (const prestamo of prestamosSimulados) {
                    mostrarInformacionPrestamoEnAlerta(prestamo);
                }
            }
        } else if (opcion === "no") {
            alert("¡Gracias por utilizar el simulador!");
            break;
        } else {
            alert("Opción no válida. Por favor, ingrese 'si', 'ver' o 'no'.");
        }
    }
}

// Iniciar el simulador
simuladorPrestamo();
