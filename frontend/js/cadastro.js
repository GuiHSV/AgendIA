
const form = document.getElementById("cadastro-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

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


    // Mandando pro back


    alert("Usuário cadastrado");
    window.location.href = "index.html";
});