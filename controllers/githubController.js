const axios = require("axios");
const db = require("../config/db");

const analyzeProfile = async (req, res) => {
    try {
        const username = req.params.username;

        const response = await axios.get(
            `https://api.github.com/users/${username}`
        );

        const user = response.data;

        const sql = `
        INSERT INTO github_profiles
        (username, name, followers, following, public_repos, profile_url)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        followers = ?,
        following = ?,
        public_repos = ?,
        profile_url = ?`;

        db.query(
            sql,
            [
                user.login,
                user.name,
                user.followers,
                user.following,
                user.public_repos,
                user.html_url,

                user.followers,
                user.following,
                user.public_repos,
                user.html_url
            ],
            (err) => {
                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "Profile analyzed and stored successfully",
                    data: user
                });
            }
        );

    } catch (error) {
    console.log(error);

    res.status(500).json({
        message: error.message,
        error: error.response?.data || error
    });
}
};

const getAllProfiles = (req, res) => {
    db.query(
        "SELECT * FROM github_profiles",
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};

const getSingleProfile = (req, res) => {
    const username = req.params.username;

    db.query(
        "SELECT * FROM github_profiles WHERE username = ?",
        [username],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Profile not found"
                });
            }

            res.json(result[0]);
        }
    );
};

module.exports = {
    analyzeProfile,
    getAllProfiles,
    getSingleProfile
};