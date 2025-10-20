export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(200).send('OK');
    }

    const update = req.body;

    // Verifica se é uma mensagem comum
    if (update.message) {
        const chatId = update.message.chat.id;

        // Responde de volta pro Telegram
        await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: `O que você deseja?`,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Abrir Formulário",
                                web_app: {
                                    url: "https://bubblekids-bot.vercel.app/formulario"
                                }
                            }
                        ]
                    ]
                }
            })
        });
    }

    // Apenas responde OK para o Telegram
    return res.status(200).send('OK');
}
