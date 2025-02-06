document.getElementById("deuresForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const alumne = document.getElementById("alumne").value;
    const deures = document.getElementById("deures").value;

    if (!alumne || !deures) return alert("Si us plau, completa tots els camps.");

    // Guardar els deures a localStorage
    const clau = `deures_${alumne}`;
    const deuresExistents = JSON.parse(localStorage.getItem(clau)) || [];
    deuresExistents.push(deures);
    localStorage.setItem(clau, JSON.stringify(deuresExistents));

    alert("Deure enviat correctament!");
    document.getElementById("deuresForm").reset();
});
