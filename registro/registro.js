document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita o envio do formulário para permitir o uso do localStorage

        // Obter valores dos campos do formulário
        const username = form.querySelector('input[placeholder="Nome de Usuário"]').value;
        const email = form.querySelector('input[placeholder="email"]').value;
        const phone = form.querySelector('input[placeholder="Número de celular"]').value;
        const password = form.querySelector('input[placeholder="Senha"]').value;

        // Criptografar a senha em SHA-256 antes de armazenar
        const hashedPassword = await hashPassword(password);

        // Armazenar os dados no localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("password", hashedPassword);

        // Feedback para o usuário
        alert("Cadastro realizado com sucesso!");

        // Redirecionar para a página de login (opcional)
        window.location.href = "../login/login.html";
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
