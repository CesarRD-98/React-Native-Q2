const Usuario = require('./usuarioModel');
const Presupuesto = require('./presupuestoModel');
const Categoria = require('./categoriaModel');
const Gasto = require('./GastoModel');

// Relaciones de cada tabla de la base de datos

// Usuario => Presupuesto
Usuario.hasMany(Presupuesto, { foreignKey: 'id_usuario' });
Presupuesto.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Gasto => Categoria
Gasto.belongsTo(Categoria, { foreignKey: 'codigo_categoria' });
Categoria.hasMany(Gasto, { foreignKey: 'codigo_categoria' });

// Gasto => Usuario && Presupuesto
Usuario.hasMany(Gasto, { foreignKey: 'id_usuario' });
Presupuesto.hasMany(Gasto, { foreignKey: 'id_presupuesto' });
Gasto.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Gasto.belongsTo(Presupuesto, { foreignKey: 'id_presupuesto' });

module.exports = {
  Usuario,
  Presupuesto,
  Gasto,
  Categoria
};
