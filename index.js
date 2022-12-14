import express from 'express';
import sql from './db.js';
import veiculos from './models/veiculos.js';

const sequelize = sql.db()
const Veiculo = sequelize.define('veiculos', veiculos);
await sequelize.sync()    

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  next(); // Important
})
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/veiculos', async (req, res) => {
  const veiculos = await Veiculo.findAll();
  res.send(JSON.stringify(veiculos));
})
app.get('/veiculos/:id', async (req, res) => {
  let { id } = req.params;
  id = parseInt(id)
  console.log("Buscando veículo com id", id)
  const veiculo = await Veiculo.findByPk(id);
  res.send(JSON.stringify(veiculo));
})
app.post('/veiculos', async (req, res) => {
  const recebido = req.body
  console.log("recebi do client", recebido)
  const veiculo = await Veiculo.create(
    {
      placa: recebido.placa,
      ano: recebido.ano,
      chassi: recebido.chassi,
      modelo: recebido.modelo,
      marca: recebido.marca,
      renavam: recebido.renavam,

    });
  console.log("Novo veículo adicionado com ID", veiculo.id)
  res.send({status: true})
})
app.put('/veiculos/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Atualizando o id", id)
  const recebido = req.body;
  await Veiculo.update(
    {
      placa: recebido.placa,
      ano: recebido.ano,
      chassi: recebido.chassi,
      modelo: recebido.modelo,
      marca: recebido.marca,
      renavam: recebido.renavam,

    },
    {
      where: {
        id: id
      }
    }
  )
  res.send({status: true})
})
app.delete('/veiculos/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Deletando o Id", id)
  await Veiculo.destroy({
    where: {
      id: id
    }
  })
  res.send({status: true})
})


app.listen(port, async () => {
    console.log(`App executando em porta ${port}`)
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})