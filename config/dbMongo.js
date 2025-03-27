import mongoose from 'mongoose';

const conectarCochesitoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB (cochesito) conectado');
  } catch (error) {
    console.error('Error al conectar MongoDB (cochesito):', error);
    process.exit(1);
  }
};

const conectarUsersDB = async () => {
  try {
    const usersConnection = await mongoose.createConnection(process.env.MONGO_URI_USERS);
    console.log('MongoDB (usuarios_api) conectado');
    return usersConnection;
  } catch (error) {
    console.error('Error al conectar MongoDB (usuarios_api):', error);
    process.exit(1);
  }
};

export { conectarCochesitoDB, conectarUsersDB };