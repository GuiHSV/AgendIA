const form1 = document.getElementById("enviar-código");

form1.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(user => user.email === email);

    const msgErro = document.getElementById("mensagem-solicitar-código");
    if (usuarioValido) {
        msgErro.textContent = "";
        //manda back gerar código e enviar ao e-mail
        alert("código")
    } else {
        msgErro.textContent = "Email não cadastrado";
    }
});

const form_resetPassword = document.getElementById("recuperar-senha");

form_resetPassword.addEventListener("submit", function(event) {
    event.preventDefault();

});