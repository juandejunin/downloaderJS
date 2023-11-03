const youtubeDl = require('youtube-dl-exec');
const { exec } = require('child_process');
const path = require('path');

const url = 'https://www.youtube.com/watch?v=6cnFl9aHD5Y';
const outputDir = './descargas/'
// Especifica que solo se debe descargar el audio en el mejor formato disponible.
const options = {
  o: `${outputDir}%(title)s.%(ext)s`, // Ruta de salida
  format: 'bestaudio/best', // Descarga el mejor formato de audio disponible.
};

youtubeDl(url, options)
  .then(output => {
    console.log('Audio descargado:', output);
    

    // Ruta del archivo de audio descargado y ruta de salida en formato MP3.
    const audioFilePath = `${outputDir}titulo.${output.ext}`;
    const mp3OutputPath = `${outputDir}titulo.mp3`;
    // Comando de conversión a MP3 usando ffmpeg.
    const convertCommand = `ffmpeg -i "${audioFilePath}" "${mp3OutputPath}"`;
    exec(convertCommand, (error, stdout, stderr) => {
        if (error) {
          console.error('Error al convertir a MP3:', error);
        } else {
          console.log('Conversión a MP3 exitosa:', mp3OutputPath);
        }
      });
  })
  .catch(error => {
    console.error('Error al descargar el audio:', error);
  });
