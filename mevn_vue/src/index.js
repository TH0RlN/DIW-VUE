const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mevndb')
    .then(db => console.log('Base de datos creada'))
    .catch(err => console.error(err))

// Configuraciones de express
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api/tareas', require('./routes/tareas'))

//Ficheros estáticos
app.use(express.static(__dirname + '/public'));

// servidor está escuchando
app.listen(app.get('port'), () => {
    console.log('Servidor a la escucha en el puerto ', app.get('port'));
})