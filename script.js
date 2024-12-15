var preguntes = {
    matematiques: [
        { pregunta: "Quin és el resultat de 7 x 6?", resposta: "42" },
        { pregunta: "Quin és el resultat de 100 - 45?", resposta: "55" },
        { pregunta: "Quants costats té un triangle?", resposta: "3" },
        { pregunta: "Quina és la meitat de 50?", resposta: "25" }
    ],
    catala: [
        { pregunta: "Com es diu en català 'book'?", resposta: "llibre" },
        { pregunta: "Quina és la capital de Catalunya?", resposta: "Barcelona" },
        { pregunta: "Plural de 'taula'?", resposta: "taules" },
        { pregunta: "Sinònim de 'petit'?", resposta: "menut" }
    ],
    castella: [
        { pregunta: "Com es diu 'perro' en castellà?", resposta: "perro" },
        { pregunta: "Quina és la forma correcta de 'jo tinc' en castellà?", resposta: "yo tengo" },
        { pregunta: "Com es diu 'coche' en català?", resposta: "cotxe" },
        { pregunta: "Traducció de 'verde'?", resposta: "verd" }
    ],
    medi: [
        { pregunta: "Quin planeta és el tercer des del sol?", resposta: "Terra" },
        { pregunta: "Quin és l'òrgan que bombeja la sang al cos?", resposta: "cor" },
        { pregunta: "Com es diu l'estrella més propera a la Terra?", resposta: "Sol" },
        { pregunta: "Quina part d'una planta absorbeix aigua?", resposta: "arrels" }
    ],
    angles: [
        { pregunta: "Com es diu 'gat' en anglès?", resposta: "cat" },
        { pregunta: "Traducció de 'hello'?", resposta: "hola" },
        { pregunta: "Com es diu 'blau' en anglès?", resposta: "blue" },
        { pregunta: "Com es diu 'taula' en anglès?", resposta: "table" }
    ],
    programacio: [
        { pregunta: "Què fa 'var' a JavaScript?", resposta: "declara una variable" },
        { pregunta: "Què fa 'console.log()'?", resposta: "mostra un missatge a la consola" },
        { pregunta: "Com es declara una funció en Python?", resposta: "def" },
        { pregunta: "Què és HTML?", resposta: "un llenguatge de marcat" }
    ]
};

var preguntaActual = null;

function registrar() {
    var nom = document.getElementById("registreNom").value.trim();
    var cognoms = document.getElementById("registreCognoms").value.trim();
    var dataNaixement = document.getElementById("registreDataNaixement").value;
    var correu = document.getElementById("registreCorreu").value.trim();
    var contrasenya = document.getElementById("registreContrasenya").value.trim();

    if (!nom || !cognoms || !dataNaixement || !correu || !contrasenya) {
        alert("Si us plau, omple tots els camps.");
        return;
    }

    var usuari = { nom, cognoms, dataNaixement, correu, contrasenya };
    localStorage.setItem(correu, JSON.stringify(usuari));
    alert("Usuari registrat correctament! Ara pots iniciar sessió.");
    mostrarIniciSessio();
}

function iniciarSessio() {
    var nom = document.getElementById("iniciNom").value.trim();
    var correu = document.getElementById("iniciCorreu").value.trim();
    var contrasenya = document.getElementById("iniciContrasenya").value.trim();

    var usuariGuardat = localStorage.getItem(correu);
    if (!usuariGuardat) {
        alert("Aquest usuari no està registrat.");
        return;
    }

    var usuari = JSON.parse(usuariGuardat);
    if (usuari.nom === nom && usuari.contrasenya === contrasenya) {
        mostrarExercicis();
    } else {
        alert("Les dades no són correctes. Revisa el nom, correu o contrasenya.");
    }
}

function mostrarPregunta(materia) {
    var materiaPreguntes = preguntes[materia];
    var randomIndex = Math.floor(Math.random() * materiaPreguntes.length);
    preguntaActual = materiaPreguntes[randomIndex];
    document.getElementById("pregunta").innerText = preguntaActual.pregunta;
    document.getElementById("respostaUsuari").value = "";
}

function comprovarResposta() {
    var respostaUsuari = document.getElementById("respostaUsuari").value.trim();
    if (!preguntaActual) {
        alert("Primer has de seleccionar una matèria!");
        return;
    }
    alert(respostaUsuari.toLowerCase() === preguntaActual.resposta.toLowerCase() ? 
        "Correcte! 🎉" : 
        `Incorrecte! La resposta correcta és: ${preguntaActual.resposta}`);
}

function mostrarRegistre() {
    document.getElementById("formulari-registre").style.display = "block";
    document.getElementById("formulari-inici-sessio").style.display = "none";
    document.getElementById("exercicis").style.display = "none";
}

function mostrarIniciSessio() {
    document.getElementById("formulari-registre").style.display = "none";
    document.getElementById("formulari-inici-sessio").style.display = "block";
    document.getElementById("exercicis").style.display = "none";
}

function mostrarExercicis() {
    document.getElementById("formulari-registre").style.display = "none";
    document.getElementById("formulari-inici-sessio").style.display = "none";
    document.getElementById("exercicis").style.display = "block";
}

function tancarSessio() {
    alert("Sessió tancada!");
    mostrarIniciSessio();
}
