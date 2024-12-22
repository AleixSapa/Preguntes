// Usuaris predefinits amb nom d'usuari, correu i contrasenya
const usuaris = [
    {
        nom: "Aleix",
        correu: "sapafamilia@gmail.com",
        contrasenya: "010914"
    },
    {
        nom: "Mat",
        correu: "mat@exemple.com",
        contrasenya: "abcd"
    },
    {
        nom: "Joan",
        correu: "joan@exemple.com",
        contrasenya: "5678"
    }
];

let usuariActual = null; // Usuari actiu després de l'inici de sessió
let fallades = 0; // Fallades acumulades

// Funció per mostrar el formulari d'inici de sessió
function mostrarIniciSessio() {
    document.getElementById('formulari-inici-sessio').style.display = 'block';
    document.getElementById('exercicis').style.display = 'none';
}

// Funció per iniciar sessió
function iniciarSessio() {
    let nom = document.getElementById('iniciNom').value.trim();
    let correu = document.getElementById('iniciCorreu').value.trim();
    let contrasenya = document.getElementById('iniciContrasenya').value.trim();

    // Busquem l'usuari per nom
    let usuariTrobat = usuaris.find(usuari => usuari.nom === nom);

    if (usuariTrobat) {
        // Verifiquem que el correu i la contrasenya coincideixen
        if (usuariTrobat.correu === correu && usuariTrobat.contrasenya === contrasenya) {
            alert("Sessió iniciada amb èxit!");
            usuariActual = usuariTrobat.nom; // Assignem l'usuari actual
            fallades = 0; // Reiniciem les fallades

            // Si l'usuari és "Aleix", redirigim a Aleix.html
            if (usuariActual === "Aleix") {
                window.location.href = "Aleix.html";
            } else {
                // Si no, anem a la secció d'exercicis
                document.getElementById('formulari-inici-sessio').style.display = 'none';
                document.getElementById('exercicis').style.display = 'block';
            }
        } else {
            alert("Credencials incorrectes. Torna-ho a provar.");
        }
    } else {
        alert("L'usuari no existeix.");
    }
}

// Funció per tancar sessió
function tancarSessio() {
    alert("Sessió tancada.");
    usuariActual = null;
    location.reload();
}

// Funció per mostrar una pregunta nova
function mostrarPregunta(materia) {
    materiaActual = materia;
    preguntesFetes = [];
    totalPreguntes = preguntes[materia].length;
    novaPregunta();
}

// Funció per mostrar la següent pregunta
function novaPregunta() {
    if (preguntesFetes.length < totalPreguntes) {
        intentsActuals = 0;
        let index = Math.floor(Math.random() * preguntes[materiaActual].length);
        let pregunta = preguntes[materiaActual][index];
        preguntes[materiaActual].splice(index, 1);
        preguntesFetes.push(pregunta);

        document.getElementById('pregunta').innerText = pregunta;
        document.getElementById('respostaUsuari').value = "";
        actualitzarProgres();
    } else {
        document.getElementById('pregunta').innerText = 
            `Examen finalitzat! Has comès ${fallades} errors.`;
        guardarFallades();
    }
}

// Funció per comprovar la resposta
function comprovarResposta() {
    var respostaUsuari = document.getElementById('respostaUsuari').value.trim();
    let respostaCorrecta = respostes[materiaActual][preguntesFetes.length - 1];

    if (respostaUsuari.toLowerCase() === respostaCorrecta.toLowerCase()) {
        alert("Resposta correcta!");
        novaPregunta();
    } else {
        fallades++;
        if (intentsActuals < MAX_INTENTS - 1) {
            alert("Resposta incorrecta! Prova-ho de nou.");
            intentsActuals++;
        } else {
            alert(`Resposta incorrecta! La resposta correcta era: ${respostaCorrecta}`);
            novaPregunta();
        }
    }
}

// Funció per actualitzar el progrés de les preguntes
function actualitzarProgres() {
    document.getElementById('progres').innerText = 
        `Pregunta ${preguntesFetes.length} de ${totalPreguntes}`;
}

// Funció per guardar errors al localStorage
function guardarFallades() {
    if (usuariActual) {
        let dadesUsuari = usuaris.find(u => u.nom === usuariActual);
        dadesUsuari.fallades = fallades;
    }
}
