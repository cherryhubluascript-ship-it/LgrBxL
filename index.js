const express = require("express");
const app = express();

app.use(express.json());

// Datos del servidor enviados por Roblox
let serverData = {
    placeId: null,
    jobId: null,
    players: 0,
    maxPlayers: 0,
    time: 0,
    brainrots: [],
    brainrotsMoney: [],
    bestMoney: "none",
    lastUpdate: 0
};

// Recibir datos desde Roblox
app.post("/set-server", (req, res) => {
    const { placeId, jobId, players, maxPlayers, time, brainrots, brainrotsMoney, bestMoney } = req.body;

    if (!placeId || !jobId) {
        return res.status(400).json({ error: "Faltan placeId o jobId" });
    }

    serverData = {
        placeId,
        jobId,
        players: players || 0,
        maxPlayers: maxPlayers || 0,
        time: time || Date.now(),
        brainrots: brainrots || [],
        brainrotsMoney: brainrotsMoney || [],
        bestMoney: bestMoney || "none",
        lastUpdate: Date.now()
    };

    console.log("Datos guardados:", serverData);
    res.json({ status: "Server guardado!" });
});

// Auto-limpiar si pasan 2 segundos sin actualizar
setInterval(() => {
    if (serverData.lastUpdate === 0) return;

    const now = Date.now();
    const diff = now - serverData.lastUpdate;

    if (diff > 2000) { // 40 segundos
        console.log("Servidor expirado (2s sin actualizar), limpiando datos...");
        serverData = {
            placeId: null,
            jobId: null,
            players: 0,
            maxPlayers: 0,
            time: 0,
            brainrots: [],
            brainrotsMoney: [],
            bestMoney: "none",
            lastUpdate: 0
        };
    }
}, 500); // revisar cada medio segundo

// Enviar datos al Auto Join
app.get("/get-server", (req, res) => {
    res.json(serverData);
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server corriendo en puerto ${PORT}`));
