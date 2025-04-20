const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful baby care assistant. Answer like a pediatric expert in Hindi or English based on user input.' },
                { role: 'user', content: message }
            ],
        });

        res.json({ reply: completion.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to get response from ChatGPT' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});