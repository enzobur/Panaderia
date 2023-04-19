//Boton Cotización

$(document).ready(function() {
    var formularioVisible = false; // Variable para rastrear si el formulario está visible o no
  
    // Mostrar u ocultar el formulario de cotización al hacer clic en el botón de cotización
    $("#btn-cotizar").click(function() {
      if (!formularioVisible) {
        $("#formulario-cotizacion").slideDown(0.5); // Mostrar el formulario con animación deslizante hacia abajo
        formularioVisible = true;
      } else {
        $("#formulario-cotizacion").slideUp(0.5); // Ocultar el formulario con animación deslizante hacia arriba
        formularioVisible = false;
      }
    });
  })
  function avanzarPaso(pasoActual) {
    var formulario = document.getElementById('formulario-contacto');
    var siguientePaso = pasoActual + 1;
    var campoVacio = false;
    var pasoActualDiv = document.getElementById('paso-' + pasoActual);
    var siguientePasoDiv = document.getElementById('paso-' + siguientePaso);
  
// Validar campos vacíos en el paso actual
if (pasoActual !== 2) {
  var inputs = pasoActualDiv.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      campoVacio = true;
      break;
    }
  }
}

// Mostrar mensaje de error si hay campos vacíos
if (campoVacio) {
  alert('Por favor, completa todos los campos del paso actual antes de continuar.');
  return;
}

// Ocultar el paso actual y mostrar el siguiente paso
    pasoActualDiv.style.display = 'none';
    siguientePasoDiv.style.display = 'block';
  }

  // Función para regresar al paso anterior
  function regresarPaso(pasoActual) {
    var anteriorPaso = pasoActual - 1;
    var pasoActualDiv = document.getElementById('paso-' + pasoActual);
    var anteriorPasoDiv = document.getElementById('paso-' + anteriorPaso);

    // Ocultar el paso actual y mostrar el paso anterior
    pasoActualDiv.style.display = 'none';
    anteriorPasoDiv.style.display = 'block';
  }

    function actualizarResumenCotizacion() {
    // Obtener los elementos del DOM
    var productosSeleccionados = document.getElementById('productos-seleccionados');
    var subtotalInput = document.getElementById('subtotal');
    var totalInput = document.getElementById('total');

    // Obtener el nombre y correo del cliente del formulario
    var nombreCliente = document.getElementById("nombre").value;
    var correoCliente = document.getElementById("correo").value;
  
    
    // Mostrar el nombre y correo del cliente en el resumen
    document.getElementById("cliente-nombre").textContent = "Nombre: " + nombreCliente;
    document.getElementById("cliente-correo").textContent = "Correo Electrónico: " + correoCliente;
  
    // Obtener los valores de los productos seleccionados
    var subtotal = 0;
    var productos = document.querySelectorAll('#formulario-cotizacion select');
    for (var i = 0; i < productos.length; i++) {
      var producto = productos[i];
      if (producto.value !== '0') {
        var cantidadInput = document.getElementById('cantidad-' + (i + 1));
        var cantidad = parseInt(cantidadInput.value) || 0;
        var precio = parseFloat(producto.options[producto.selectedIndex].text.split(' - ')[1].replace('$', '')) || 0;
        subtotal += cantidad * precio;
  
        // Agregar el producto al resumen
        var productoSeleccionado = document.createElement('li');
        productoSeleccionado.textContent = producto.options[producto.selectedIndex].text + ' x ' + cantidad;
        productosSeleccionados.appendChild(productoSeleccionado);
      }
    }
  
    // Actualizar los valores de subtotal y total en el DOM
    subtotalInput.value = '$' + subtotal.toFixed(2);
    totalInput.value = '$' + subtotal.toFixed(2);
  }
  
  function generarPDF() {
    // Obtener los elementos del DOM
    var nombreCliente = document.getElementById("nombre").value;
    var correoCliente = document.getElementById("correo").value;
    var subtotal = document.getElementById("subtotal").value;
    var total = document.getElementById("total").value;
    var productosSeleccionados = document.getElementById("productos-seleccionados").innerHTML;

    // Crear un nuevo objeto jsPDF
    window.jsPDF = window.jspdf.jsPDF
    var pdf = new jsPDF(); 
    pdf.text("Resumen de Cotización", 10, 10);
    pdf.text("Cliente: " + nombreCliente, 10, 20);
    pdf.text("Correo Electrónico: " + correoCliente, 10, 30);

    // Eliminar tags <li> del texto de Productos Seleccionados
    var productosTextoSinLi = productosSeleccionados.replace(/<li>/g, '').replace(/<\/li>/g, '');
    
    // Dividir el texto de Productos Seleccionados en varias líneas
    var productosTextoArray = productosTextoSinLi.split("</li><li>"); 
    
    
    var productosTexto = productosTextoArray.join("\n"); 
    pdf.text("Productos Seleccionados:\n" + productosTexto, 10, 40); 
    pdf.text("Subtotal: " + subtotal, 10, 60);
    pdf.text("Total: " + total, 10, 70);

    // Genera una nueva página si el contenido excede el límite de la página actual
    if (pdf.internal.getNumberOfPages() > 1) {
    pdf.addPage();
}
    

    // Guardar el archivo PDF con el nombre 'cotizacion.pdf'
    pdf.save("cotizacion.pdf");
}

// Manejar la presentación del formulario al enviar
$('#formulario-cotizacion').on('submit', function(e) {
    e.preventDefault();
    alert('Cotización enviada correctamente');
    generarPDF(); // Llamar a la función para generar el PDF
});

//FORMULARIO DE CONTACTO
  
$(document).ready(function() {
  $("#contactForm").submit(function(e) {
    e.preventDefault(); 
    var nombre = $("#nombre").val();
    var correo = $("#correo").val();
    var mensaje = $("#mensaje").val();

    $.ajax({
      url: "https://reqres.in/api/users",
      type: "POST",
      data: {
        name: nombre,
        correo: correo,
        mensaje: mensaje,
      },
      success: function(result) {
        window.alert('Consulta enviada con exito');
        console.log(result);
      },
      error: function(xhr, status, error) {
        alert("Ha ocurrido un error: " + error);
      }
    });
  });
});
  

