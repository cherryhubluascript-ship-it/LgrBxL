const express = require("express");
const app = express();

app.use(express.json());

let serverData = {
    placeId: null,
    jobId: null,
    players: 0,
    maxPlayers: 0,
    time: 0
};

app.post("/set-server", (req, res) => {
    const { placeId, jobId, players, maxPlayers, time } = req.body;
    if (!placeId || !jobId) return res.status(400).json({ error: "Faltan placeId o jobId" });

    serverData = { placeId, jobId, players, maxPlayers, time };
    console.log("Datos guardados:", serverData);
    res.json({ status: "Server guardado!" });
});

app.get("/get-server", (req, res) => {
    res.json(serverData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server corriendo en puerto ${PORT}`));
