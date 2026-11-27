document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const alertBox = document.getElementById('formAlert');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const payload = {
                nombre: document.getElementById('nombre').value.trim(),
                correo: document.getElementById('correo').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                mensaje: document.getElementById('mensaje').value.trim()
            };

            try {
                const response = await fetch('/enviar-contacto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok && result.ok) {
                    alertBox.textContent = result.mensaje;
                    alertBox.className = 'alert success';
                    form.reset();
                } else {
                    alertBox.textContent = result.mensaje || 'No se pudo procesar tu solicitud.';
                    alertBox.className = 'alert error';
                }
            } catch (error) {
                alertBox.textContent = 'Error de conexión con el servidor.';
                alertBox.className = 'alert error';
            }
        });
    }
});
