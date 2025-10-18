
const form = document.getElementById("cadastro-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Coletando valores
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirmacao = document.getElementById("password-confirmacao").value;

    // Verificação inicial de erros
    const msgErro = document.getElementById("mensagem-erro");
    if(!name || !email || !password || !passwordConfirmacao) {
        msgErro.textContent = "Preencha todos os campos";
        return;

    } else if(password !== passwordConfirmacao) {
        msgErro.textContent = "As senhas não coencidem";
        return;
    }
    msgErro.textContent = "";

    // Comunicação com o servidor
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password,
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert(data.message);
            window.location.href = "index.html";
        } else {
            msgErro.textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Ocorreu um erro ao tentar se cadastrar.");
    });
});