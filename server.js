const express = require('express');
const { exec } = require('child_process');
const app = express();

// Rota para executar o arquivo .bat
app.get('/executar', (req, res) => {
    const batFile = 'C:\\caminho\\para\\seuarquivo.bat'; // Substitua pelo caminho do seu .bat

    exec(`"${batFile}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o script: ${error.message}`);
            return res.status(500).send(`Erro ao executar o script: ${error.message}`);
        }
        if (stderr) {
            console.error(`Erro no script: ${stderr}`);
            return res.status(500).send(`Erro no script: ${stderr}`);
        }

        console.log(`Saída do script: ${stdout}`);
        res.send(`<pre>${stdout}</pre>`);
    });
});

// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
