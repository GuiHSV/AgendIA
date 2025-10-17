//Iniciar servidor: node server.js
//Encerrar servidor: Ctrl + C

const express = require("express");     //  importa o Express
const cors = require("cors");           //  importa o CORS
const fileSystem = require('fs');       //  importa do File System do Node.js
const path = require('path');           //  importa o módulo Path do Node.js
const app = express();                  //  cria instancia do Express
const PORT = 3000;                      //  define porta do servidor

app.use(cors({                          //  permite comunicação entre front e back
  origin: 'http://localhost:5500'
}));
app.use(express.json());                //  permite receber JSON no corpo da requisição

// Caminho do "banco de dados" temporário (arquivo JSON)
const usersFilePath = path.join(__dirname, 'users.json');


// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor está funcionando!");
});

// Rota de cadastro
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Lê o arquivo de usuários
    const usersData = fileSystem.readFileSync(usersFilePath, 'utf-8');
    const users = JSON.parse(usersData);

    // Verifica se o e-mail já existe
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ success: false, message: 'E-mail já cadastrado.' });
    }

    // Cria e salva novo usuário no arquivo
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    fileSystem.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    // Responde ao frontend
    res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!' });
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


//Rotas de autenticação
app.post("/register", (req, res) => {
  const { nome, email, senha } = req.body;

  // Verifica se já existe usuário com o mesmo email
  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({ erro: "Email já cadastrado" });
  }

  usuarios.push({ nome, email, senha });
  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
});
