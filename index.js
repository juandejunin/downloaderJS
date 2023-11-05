const youtubeDl = require('youtube-dl-exec');
const path = require('path');
const fs = require('fs/promises'); // Usar fs.promises para trabajar con promesas.

const url = 'https://www.youtube.com/watch?v=6cnFl9aHD5Y';
const outputDir = './descargas/';

// Función para descargar el audio
async function descargarAudio() {
  try {
    // Verifica si el directorio de salida existe y créalo si es necesario.
    await fs.mkdir(outputDir, { recursive: true });

    const options = {
      o: path.join(outputDir, '%(title)s.%(ext)s'), // Ruta de salida
      format: 'bestaudio/best', // Descarga el mejor formato de audio disponible.
    };

    const output = await youtubeDl(url, options);
    console.log('Audio descargado:', output);
  } catch (error) {
    console.error('Error al descargar el audio:', error);
  }
}

descargarAudio();
