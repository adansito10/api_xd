import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Estudio AF', // Título de la documentación
      version: '1.0.0',           // Versión de la API
      description: 'Documentación de API de Estudio AF',
    },
    servers: [
      {
        url: `http://${process.env.HOST || 'localhost'}:${process.env.PORT}`, // Usa 'localhost' si no está definida la variable HOST
      },
    ],
  },
  apis: ['./routes/*.js'], // Rutas donde están tus archivos de rutas para generar la documentación automáticamente
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, 
    swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at http://89.116.49.105:' +
    process.env.PORT + '/api-docs');
};

export default swaggerDocs;
