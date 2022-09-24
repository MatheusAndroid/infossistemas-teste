import veiculos from "./models/veiculos.js";
import Sequelize from 'sequelize';
const db = () => {
    
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });
    
    
    return sequelize;
}

export default {db}