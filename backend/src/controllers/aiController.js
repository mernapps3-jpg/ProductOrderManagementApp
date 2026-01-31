const { getProductAssistantResponse } = require("../services/aiService")

async function askQuestion(req, res, next) {
    try {
        const { question, productId } = req.body
        const response = await getProductAssistantResponse(question, productId);
        res.json({ success: true, response })
    } catch (error) {
        next(error)
    }
}

module.exports = { askQuestion }