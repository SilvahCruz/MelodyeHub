document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita o envio do formulário para permitir a validação de login

        // Obter valores dos campos de entrada do formulário de login
        const usernameInput = form.querySelector('input[placeholder="Nome de Usuário"]').value;
        const passwordInput = form.querySelector('input[placeholder="senha"]').value;

        // Obter dados armazenados no localStorage
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        // Verificar se o nome de usuário coincide
        if (usernameInput === storedUsername) {
            // Criptografar a senha de entrada do usuário
            const hashedPasswordInput = await hashPassword(passwordInput);

            // Verificar se a senha criptografada coincide com a armazenada
            if (hashedPasswordInput === storedPassword) {
                alert("Login bem-sucedido!");
                localStorage.setItem("situacao", "logout")
                // Redirecionar para a página inicial ou dashboard
                window.location.href = "../index.html";
            } else {
                alert("Senha incorreta!");
            }
        } else {
            alert("Nome de usuário incorreto!");
        }
    });

    // Função para criptografar a senha em SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest("SHA-256", data);
        return hex(hash);
    }

    // Função para converter o hash para hexadecimal
    function hex(buffer) {
        const hexCodes = [];
        const view = new DataView(buffer);
        for (let i = 0; i < view.byteLength; i += 4) {
            const value = view.getUint32(i);
            const stringValue = value.toString(16);
            const padding = "00000000";
            hexCodes.push((padding + stringValue).slice(-padding.length));
        }
        return hexCodes.join("");
    }
});
