import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import estadoRoutes from './routes/estadoRoutes.js';

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


mongoose.connect('mongodb://localhost/cochesito')
  .then(() => {
    console.log('MongoDB (cochesito) conectado');
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB (cochesito):', err);
  });

// Rutas
app.use('/api', estadoRoutes);


app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});