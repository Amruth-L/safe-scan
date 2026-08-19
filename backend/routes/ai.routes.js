import express from 'express';
import { summarizeText } from '../services/ai.service.js';
const router = express.Router();
router.post("/summarize", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({
                error: "Text is required",
            });
        }
        const summary = await summarizeText(text);

        return res.status(200).json({
            success: true,
            summary,
        });
    }
    catch (error) {
        console.error("Ai summerization error :", error);

        return res.status(500).json({
            success: false,
            error: "Failed to summarize text",
        });
    }
});
export default router;