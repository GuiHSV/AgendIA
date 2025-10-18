//Iniciar servidor: nodemon server.js
//Encerrar servidor: Ctrl + C

const express = require("express");     //  importa o Express
const cors = require("cors");           //  importa o CORS
const fileSystem = require('fs');       //  importa do File System do Node.js
const path = require('path');           //  importa o módulo Path do Node.js
const app = express();                  //  cria instancia do Express
const PORT = 3000;                      //  define porta do servidor

app.use(cors({                          //  permite comunicação entre front e back
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
}));
app.use(express.json());                //  permite receber JSON no corpo da requisição

// Caminho do "banco de dados" temporário (arquivo JSON)
const usersFilePath = path.join(__dirname, 'users.json');


// Rota de teste
app.get("/", (request, response) => {
  //response.send("Servidor está funcionando!");
  return response.status(201).json({ success: true, message: 'Testando sucesso' });
});

// Rota de login
app.post('/login', (request, response) => {
  const { email, password } = request.body;

  try {
    // Lê o arquivo de usuários
    const usersData = fileSystem.readFileSync(usersFilePath, 'utf-8');
    const users = JSON.parse(usersData);
    
    // Cofere informações 
    const userExists = users.find(user => user.email === email && user.password === password);
    if (userExists) {
      return response.status(200).json({ success: true, message: 'Login realizado com sucesso!' });
    } else {
      return response.status(400).json({ success: false, message: 'E-mail ou Senha incorretos.' });
    }

  } catch (error) {
    console.error('Erro ao processar login:', error);
    return response.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
})

// Rota de cadastro
app.post('/register', (request, response) => {
  const { name, email, password } = request.body;

  try {
    // Lê o arquivo de usuários
    const usersData = fileSystem.readFileSync(usersFilePath, 'utf-8');
    const users = JSON.parse(usersData);

    // Verifica se o e-mail já existe
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return response.status(400).json({ success: false, message: 'E-mail já cadastrado.' });
    }
    

    // Cria e salva novo usuário no arquivo
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    fileSystem.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    
    // Responde ao frontend
    return response.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!' });
  
  } catch (error) {
    console.error('Erro ao processar cadastro:', error);
    return response.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
});



// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});







