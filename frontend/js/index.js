
const form = document.getElementById("login-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value; //permitir comparar com o nome de usuário também?
    const senha = document.getElementById("senha").value;
    console.log("Formulário enviado:\nemail: " + email + "\nsenha: " + senha);

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

    const msgErro = document.getElementById("mensagem-erro");
    if (usuarioValido) {
        msgErro.textContent = "";
        alert("Login realizado com sucesso!");
        window.location.href = "agenda.html"; //temporário
    } else {
        msgErro.textContent = "Email ou senha incorretos";
    }
});