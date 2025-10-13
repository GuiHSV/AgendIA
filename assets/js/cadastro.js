
const form = document.getElementById("cadastro-form")

form.addEventListener("submit", function(event) {
    event.preventDefault();

    localStorage.clear(); //para testes

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const senhaConfirmacao = document.getElementById("confirmar-senha").value;

    const msgErro = document.getElementById("mensagem-erro");
    if(senha !== senhaConfirmacao) {
        msgErro.textContent = "As senhas não coencidem";
        return;
    }
    msgErro.textContent = "";
    console.log("Formulário enviado:\nnome: " + nome + "\nemail: " + email + "\nsenha: " + senha);

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({ nome: nome, email: email, senha: senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado");
    window.location.href = "index.html";
});