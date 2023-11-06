const youtubeDl = require('youtube-dl-exec');
const path = require('path');
const fs = require('fs/promises');
const axios = require('axios'); // Importa la biblioteca Axios.
const ffmpeg = require('fluent-ffmpeg');

const url = 'https://www.youtube.com/watch?v=6cnFl9aHD5Y';
const outputDir = './descargas/';

async function obtenerTituloLimpiado() {
  try {
    const response = await axios.get(url);
    const titleMatch = response.data.match(/<title>([^<]*)<\/title>/);
    if (titleMatch && titleMatch[1]) {
      const rawTitle = titleMatch[1];
      const cleanTitle = rawTitle.replace(/[^\w\s]/gi, '').replace(/\s+/g, '').trim().toLowerCase();
      return cleanTitle;
    } else {
      throw new Error('No se pudo encontrar el título del video.');
    }
  } catch (error) {
    console.error('Error al obtener el título del video:', error);
    return null;
  }
}


async function descargarAudio() {
  const cleanTitle = await obtenerTituloLimpiado();
  console.log('titulo procesado: ' + cleanTitle)

  if (cleanTitle) {
    try {
      await fs.mkdir(outputDir, { recursive: true });

      const webmOptions = {
        o: path.join(outputDir, `${cleanTitle}.webm`),
        format: 'bestaudio/best',

      };

      const webmOutput = await youtubeDl(url, webmOptions);

      console.log('Audio webm descargado:', webmOutput);

      const mp3Filename = path.join(outputDir, `${cleanTitle}.mp3`);

      console.log(mp3Filename)
      // Realiza la conversión a MP3 utilizando fluent-ffmpeg.
      ffmpeg()
        .input(path.join(outputDir, `${cleanTitle}.webm`))
        .audioCodec('libmp3lame')
        .audioBitrate(320)
        .outputOptions('-map_metadata 0')
        .toFormat('mp3')
        .on('end', () => console.log('Conversión a MP3 exitosa.'))
        .on('error', (err) => console.error('Error en la conversión a MP3: ' + err))
        .save(mp3Filename);
    } catch (error) {
      console.error('Error al descargar y convertir el audio a MP3:', error);
    }
  }
}


descargarAudio();