const express = require("express");

const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(express.json());

app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
    res.send("GitHub Profile Analyzer API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});