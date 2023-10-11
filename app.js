const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const path = require('path');
const ejs = require('ejs');

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'flamengo',
  database: 'db',
});

db.connect(err => {
  if (err) {
    console.error('Erro na conexão com o banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida.');
});
//configurar EJS como o motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Configurar o Body Parser
app.use(bodyParser.urlencoded({ extended: false }));


  app.get('/',(req, res) => {
    res.render('cadastro');
    });
  
  //rota para a pagina de cadastro
  app.get('/cadastro',(req, res) => {
  res.render('cadastro');
  });
  
  app.get('/login', (req, res) => {
  res.render('login'); //renders vies/cadastro.ejs
  });


// Rota de cadastro
app.post('/cadastro', (req, res) => {
  const { nome, senha, email } = req.body;
  const query = 'INSERT INTO tabela (nome, senha, email) VALUES (?, ?, ?)';
  db.query(query, [nome, senha, email], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o usuário:', err);
      res.status(500).send('Erro ao cadastrar o usuário.');
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.status(200).send('Usuário cadastrado com sucesso.');
    }
  });
});


//login


app.get('/login', (req, res) => {
    res.render('login');
  });
  
  app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    const query = 'SELECT * FROM tabela WHERE nome = ? AND senha = ?';
    
    db.query(query, [nome, senha], (err, result) => {
      if (err) {
        console.error('Erro ao verificar o login:', err);
        res.status(500).send('Erro ao verificar o login.');
      } else if (result.length > 0) {
        console.log('Login bem-sucedido!');
        res.status(200).send('Login bem-sucedido.');
      } else {
        console.log('Credenciais inválidas');
        res.status(401).send('Credenciais inválidas.');
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});