export const obtenerEstadoCoche = (req, res) => {
    // Aquí podrías consultar la base de datos o leer de un archivo de configuración
    const estado = {
      intermitentes: true,
      cofre: false,
      temperatura: 35, // Temperatura en grados Celsius
      // Otros estados
    };
    res.json(estado);
  };
  
  export const cambiarEstadoCoche = (req, res) => {
    const { intermitentes, cofre, temperatura } = req.body;
    
    // Aquí se podría guardar en la base de datos o enviar comandos al Arduino si es necesario
    res.json({
      message: 'Estado del coche actualizado',
      nuevoEstado: { intermitentes, cofre, temperatura },
    });
  };
  