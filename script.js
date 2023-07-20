function calcularData() {
    let diasUteis = parseInt(document.getElementById("diasUteis").value);
    let dataInicialStr = document.getElementById("dataInicial").value;
    let dataInicial = flatpickr.parseDate(dataInicialStr, "d/m/Y");
    
    if (dataInicial instanceof Date && !isNaN(dataInicial)) {
        let dataFinal = new Date(dataInicial);
        let diasTotais = 0;
        let diasNaoUteisDescontados = 0;
        let datasNaoUteis = [];

        while (diasUteis > 0) {
            dataFinal.setDate(dataFinal.getDate() + 1);
            diasTotais++;

            if (dataFinal.getDay() !== 0 && dataFinal.getDay() !== 6) {
                diasUteis--;
            } else {
                diasNaoUteisDescontados++;
                datasNaoUteis.push(new Date(dataFinal));
            }
        }

        let dataFinalFormatted = dataFinal.toLocaleDateString("pt-BR");
        let dataFinalTexto = `Data final: ${dataFinalFormatted} - ${diaSemana(dataFinal)}`;
        document.getElementById("dataFinal").innerText = dataFinalTexto;

        let relatorioTexto = `<p>Relatório:</p>`;
        relatorioTexto += `<p>Dias corridos: ${diasTotais}</p>`;
        relatorioTexto += `<p>Dias descartados: ${diasNaoUteisDescontados}</p>`;

        if (datasNaoUteis.length > 0) {
            relatorioTexto += `<p>Datas descartadas por serem dias não úteis:</p>`;
            for (let data of datasNaoUteis) {
                relatorioTexto += `<p>- ${data.toLocaleDateString("pt-BR")} - ${diaSemana(data)}</p>`;
            }
        }

        document.getElementById("relatorio").innerHTML = relatorioTexto;
    } else {
        document.getElementById("dataFinal").innerText = "Data inválida";
        document.getElementById("relatorio").innerHTML = "";
    }
}

function diaSemana(data) {
    let diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    return diasSemana[data.getDay()];
}

// flatpickr para o input da data inicial
flatpickr(".flatpickr", {
    dateFormat: "d/m/Y",
    locale: "pt", // idioma para português brasileiro
    defaultDate: null, // Remover o defaultDate
    inline: true // Modo de calendário embutido
});
