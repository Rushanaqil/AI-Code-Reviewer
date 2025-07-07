const generateContent = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        console.log("Request received with body:", req.body);

        const code = req.body.code;

        if (!code) {
            console.log("No prompt provided");
            return res.status(400).send("Prompt is required");
        }

        const response = await generateContent(code);

        console.log("AI Response:", response);

        res.send(response);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send("Something went wrong");
    }
};
