document.getElementById("assignarForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const alumne = document.getElementById("alumne").value;
    const deureSeleccionat = document.getElementById("deure").value;

    const deures = {
        "1": {
            nom: "Matemàtiques Bàsiques",
            preguntes: [
                { pregunta: "Quant és 2 + 3?", resposta: "5" },
                { pregunta: "Quant és 4 - 1?", resposta: "3" },
                { pregunta: "Quant és 6 ÷ 2?", resposta: "3" },
                { pregunta: "Quant és 7 × 2?", resposta: "14" },
                { pregunta: "Quant és 9 - 5?", resposta: "4" }
            ]
        },
        "2": {
            nom: "Geografia",
            preguntes: [
                { pregunta: "Capital de França?", resposta: "parís" },
                { pregunta: "Capital d'Espanya?", resposta: "madrid" },
                { pregunta: "Ocean més gran?", resposta: "pacífic" },
                { pregunta: "País més gran del món?", resposta: "rússia" },
                { pregunta: "Continent més petit?", resposta: "oceania" }
            ]
        }
    };

    const clau = `deures_${alumne}`;
    const deuresExistents = JSON.parse(localStorage.getItem(clau)) || [];
    deuresExistents.push(deures[deureSeleccionat]);
    localStorage.setItem(clau, JSON.stringify(deuresExistents));

    // Missatge de verificació
    alert(`Deure assignat correctament a ${alumne}.\nDeures guardats`);
    console.log(localStorage.getItem({alumne}));

    document.getElementById("assignarForm").reset();
});
