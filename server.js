const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const CONTACT_FILE = path.join(DATA_DIR, 'contactos.txt');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/enviar-contacto') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                let datos;
                if (req.headers['content-type']?.includes('application/json')) {
                    datos = JSON.parse(body);
                } else {
                    const params = new URLSearchParams(body);
                    datos = {
                        nombre: params.get('nombre'),
                        correo: params.get('correo'),
                        telefono: params.get('telefono'),
                        mensaje: params.get('mensaje')
                    };
                }

                const fecha = new Date().toLocaleString('es-MX');
                const registro = `========================================\n` +
                                 `Fecha: ${fecha}\n` +
                                 `Nombre: ${datos.nombre || 'No especificado'}\n` +
                                 `Correo: ${datos.correo || 'No especificado'}\n` +
                                 `Teléfono: ${datos.telefono || 'No especificado'}\n` +
                                 `Mensaje: ${datos.mensaje || 'Sin mensaje'}\n` +
                                 `========================================\n\n`;

                fs.appendFile(CONTACT_FILE, registro, (err) => {
                    if (err) {
                        console.error('Error al guardar el contacto:', err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ ok: false, mensaje: 'Error interno al guardar los datos.' }));
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ ok: true, mensaje: '¡Gracias! Tu solicitud ha sido registrada correctamente.' }));
                });
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: false, mensaje: 'Formato de datos inválido.' }));
            }
        });
        return;
    }

    if (req.method === 'GET') {
        let urlPath = req.url.split('?')[0];
        if (urlPath === '/') {
            urlPath = '/index.html';
        } else if (!path.extname(urlPath)) {
            urlPath += '.html';
        }

        const filePath = path.join(PUBLIC_DIR, urlPath);

        if (!filePath.startsWith(PUBLIC_DIR)) {
            res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('Acceso denegado');
        }

        const extname = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('<h1>404 - Página no encontrada</h1><a href="/">Volver al inicio</a>');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('Error interno del servidor');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Método no permitido');
    }
});

server.listen(8888, () => {
    console.log(`Servidor Automax ejecutándose en http://localhost:${8888}`);
});
