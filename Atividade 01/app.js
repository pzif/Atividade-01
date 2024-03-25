// app.js
const express = require('express');
const mongoose = require('mongoose');

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/nome-do-banco-de-dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexão com o MongoDB estabelecida'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definindo o modelo de dados usando Mongoose
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  chave: String,
  valor: String
});
const Data = mongoose.model('Data', dataSchema);

const app = express();
app.use(express.json());

// Rota para salvar dados no banco de dados
app.post('/dados', async (req, res) => {
  try {
    const { chave, valor } = req.body;
    const newData = new Data({ chave, valor });
    await newData.save();
    res.status(201).json({ message: 'Dados salvos com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
