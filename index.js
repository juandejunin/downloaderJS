const youtubeDl = require('youtube-dl-exec');
const path = require('path');
const fs = require('fs/promises');

const url = 'https://www.youtube.com/watch?v=6cnFl9aHD5Y';
const outputDir = './descargas/';

// Función para descargar el audio
async function descargarAudio() {
  try {
    await fs.mkdir(outputDir, { recursive: true });

    const options = {
      o: path.join(outputDir, '%(title)s.%(ext)s'),
      format: 'bestaudio/best[ext=mp3]', // Descarga el mejor formato de audio en MP3.
    };

    const output = await youtubeDl(url, options);
    console.log('Audio MP3 descargado:', output);
  } catch (error) {
    console.error('Error al descargar el audio MP3:', error);
  }
}

descargarAudio();
