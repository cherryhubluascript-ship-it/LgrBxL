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
    brainrots: [],          // 🔥 Lista de brainrots detectados
    brainrotsMoney: [],     // 🔥 Lista con dinero por brainrot
    bestMoney: "none"       // 🔥 Dinero más alto
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
        bestMoney: bestMoney || "none"
    };

    console.log("Datos guardados:", serverData);
    res.json({ status: "Server guardado!" });
});

// Enviar datos al Auto Join
app.get("/get-server", (req, res) => {
    res.json(serverData);
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server corriendo en puerto ${PORT}`));
