// Seleccionem els elements HTML
const llista = document.getElementById("llistaDeures");
const botóActualitzar = document.getElementById("actualitzaDeures");

// Funció per carregar els deures
function carregarDeures() {
    // Llegim els deures des del localStorage
    const deures = JSON.parse(localStorage.getItem(`deures_${alumne}`)) || [];
    console.log(`Deures carregats per a ${alumne}:`, deures); // Depuració

    // Neteja la llista abans de mostrar deures
    llista.innerHTML = "";

    // Mostrem un missatge si no hi ha deures
    if (deures.length === 0) {
        llista.innerHTML = "<p>No tens deures assignats.</p>";
        return;
    }

    // Recorrem els deures i els afegim a la pàgina
    deures.forEach((deure, index) => {
        const div = document.createElement("div");
        div.className = "deure";
        div.innerHTML = `<h2>${deure.nom}</h2>`;

        // Afegim les preguntes de cada exercici
        deure.preguntes.forEach((preguntaObj, i) => {
            div.innerHTML += `
                <p>${i + 1}. ${preguntaObj.pregunta}</p>
                <input type="text" id="resposta_${index}_${i}" placeholder="Escriu la resposta">
            `;
        });

        // Botó per corregir l'exercici
        div.innerHTML += `
            <button onclick="corregir(${index})">Enviar exercici</button>
            <p id="resultat_${index}"></p>
        `;
        llista.appendChild(div);
    });
}

// Funció per corregir un exercici
function corregir(index) {
    const deures = JSON.parse(localStorage.getItem(`deures_${alumne}`)) || [];
    const deure = deures[index];
    let correctes = 0;

    // Comprovar les respostes
    deure.preguntes.forEach((preguntaObj, i) => {
        const resposta = document.getElementById(`resposta_${index}_${i}`).value.trim().toLowerCase();
        if (resposta === preguntaObj.resposta.trim().toLowerCase()) {
            correctes++;
        }
    });

    // Calcula la nota
    const nota = (correctes / deure.preguntes.length) * 10;
    const resultat = document.getElementById(`resultat_${index}`);

    if (nota >= 5) {
        resultat.textContent = `Has aprovat amb un ${nota.toFixed(1)}/10. Correctes: ${correctes}/${deure.preguntes.length}`;
        resultat.style.color = "green";
    } else {
        resultat.textContent = `Has suspès amb un ${nota.toFixed(1)}/10. Correctes: ${correctes}/${deure.preguntes.length}`;
        resultat.style.color = "red";
    }
}

// Assignem la funció d'actualització al botó
botóActualitzar.addEventListener("click", carregarDeures);

// Carrega inicial
carregarDeures();
