const axios = require('axios');
const youtubeDl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');


let url = 'https://www.youtube.com/watch?v=M1lGXi1yzF0'

async function obtenerTituloDesdeURL(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'Título Desconocido';
        return title;
    } catch (error) {
        console.error('Error al recuperar la página web:', error);
        return 'Título Desconocido';
    }
}


const title = async () => {
    return await obtenerTituloDesdeURL(url);
};

title()
    .then(titulo => {
        console.log('esto es el titulo: ' + titulo);
    })
    .catch(error => {
        console.error('Error al obtener el título:', error);
    });


function obtenerTituloAlfabetico(title) {
    // Elimina caracteres no alfabéticos y une las palabras sin espacios
    const tituloAlfabetico = titulo.replace(/[^a-zA-Z]/g, '');
    return tituloAlfabetico;
}


obtenerTituloAlfabetico()
    .then(tituloAlfabetico => {
        console.log('esto es el titulo: ' + tituloAlfabetico);
    })
    .catch(error => {
        console.error('Error al obtener el título:', error);
    });



async function descargarVideoYConvertirMP3(url, outputDir) {
    const youtubeDlOptions = {
        o: `${outputDir}%(title)s.%(ext)s`,
        format: 'best',
    };

    // Obtiene el título fuera de la función


    try {
        // Resto del código, incluyendo el uso de outputDir

        const videoFilePath = `./descargas${title}.mp4`;
        console.log(videoFilePath)
        const mp3OutputPath = path.join(outputDir, `${generarNombreUnico(title)}.mp3`);

        // ...
    } catch (error) {
        console.error('Error al descargar el video:', error);
    }
}

function generarNombreUnico(nombreBase) {
    const numeroAleatorio = Math.floor(Math.random() * 10000);
    return `${nombreBase}${numeroAleatorio}`;
}

const outputDir = './descargas';  // Aquí debes declarar la variable outputDir con la ruta de salida deseada

// Llama a la función para descargar y convertir el video.
descargarVideoYConvertirMP3(url, outputDir);
