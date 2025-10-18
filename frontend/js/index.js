
const form = document.getElementById("login-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Coletando valores
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verificação inicial de erros
    const msgErro = document.getElementById("mensagem-erro");
    if(!email || !password) {
        msgErro.textContent = "Preencha todos os campos";
        return;
    }
    msgErro.textContent = "";
    
    // Comunicação com o servidor
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            //alert(data.message);
            window.location.href = "../agenda.html"; //temporário
        } else {
            msgErro.textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Ocorreu um erro ao tentar executar o login.");
    });
});