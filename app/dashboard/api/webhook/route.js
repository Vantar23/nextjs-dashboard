import { NextResponse } from 'next/server';
import { exec } from 'child_process';

// Configuración del secreto (debe coincidir con el configurado en GitHub)
const SECRET = 'mySuperSecretToken'; // Cambia esto por el secreto configurado en GitHub

// Verificar el secreto enviado por GitHub
async function verifySecret(req) {
    const signature = req.headers.get('x-hub-signature-256'); // Firma enviada por GitHub
    const body = await req.text();

    if (!signature) {
        console.error('Firma no proporcionada por el webhook');
        return false;
    }

    const crypto = await import('crypto');
    const hash = `sha256=${crypto.createHmac('sha256', SECRET).update(body).digest('hex')}`;

    if (hash !== signature) {
        console.error('Firma no válida');
        return false;
    }

    return body;
}

// Manejar solicitudes POST
export async function POST(req) {
    try {
        // Validar el secreto
        const body = await verifySecret(req);
        if (!body) {
            return NextResponse.json({ message: 'Firma no válida' }, { status: 403 });
        }

        const parsedBody = JSON.parse(body);
        console.log('Webhook recibido:', parsedBody);

        // Ejecutar comando para actualizar el proyecto
        exec('cd C:\\Users\\Administrador\\source\\Hook && git pull', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al actualizar: ${error.message}`);
                return;
            }
            console.log(`Salida: ${stdout}`);
            console.error(`Errores: ${stderr}`);
        });

        return NextResponse.json({ message: 'Proyecto actualizado correctamente' });
    } catch (error) {
        console.error(`Error en webhook: ${error.message}`);
        return NextResponse.json({ message: 'Error procesando el webhook' }, { status: 500 });
    }
}

// Manejar solicitudes GET
export async function GET() {
    return new NextResponse('<h1>Webhook Server</h1><p>Servidor funcionando correctamente. Ruta POST: /api/webhook.</p>', {
        headers: { 'Content-Type': 'text/html' },
    });
}