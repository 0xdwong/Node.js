const OpenAI = require('openai');
require('dotenv').config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function translate(text) {
    const prompt = `As an English-Chinese translator, your task is to accurately translate text between the two languages.`;
    const completion = await openai.chat.completions.create({

        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: prompt + text }
        ],
        model: 'gpt-3.5-turbo',
    });

    console.log(completion['choices'][0]['message']['content']);
}

async function translateByStream() {
    const prompt = `As an English-Chinese translator, your task is to accurately translate text between the two languages.`;
    const text = `The API is non-deterministic by default.`;
    const stream = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: prompt + text }
        ],
        model: 'gpt-3.5-turbo',
        stream: true,
    });

    for await (const part of stream) {
        console.log(part.choices[0]?.delta?.content || '');
    }
}

async function main() {
    // await translate(`hello world`);
    // await translateByStream();
}

main();