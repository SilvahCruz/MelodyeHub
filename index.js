function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "../index/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "../index/close_white_36dp.svg";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const logoutButtonElement = document.getElementById("logoutButtonElement");

    // Verificar se o usuário está logado, ou seja, se há um nome de usuário e senha no localStorage
    // const storedUsername = localStorage.getItem("username");
    // const storedPassword = localStorage.getItem("password");
    const storedsituacao = localStorage.getItem("situacao");

    if (storedsituacao == "logout") {
        // Se estiver logado, esconder o botão de login e mostrar o de logout
        loginButton.style.display = "none";
        logoutButton.style.display = "block";
    } else {
        // Se não estiver logado, exibir o botão de login e esconder o de logout
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
    }

    // Evento de logout
    logoutButtonElement.addEventListener("click", () => {
        // Remover as informações de login do localStorage
        localStorage.setItem("situacao", "login")

        // Exibir novamente o botão de login e esconder o de logout
        loginButton.style.display = "block";
        logoutButton.style.display = "none";

        alert("Você foi desconectado!");
    });
});
