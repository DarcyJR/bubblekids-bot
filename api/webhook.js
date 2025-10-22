export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(200).send('OK');
    }

    const update = req.body;

    // Verifica se é uma mensagem comum
    if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text;

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
                                text: "Opção 1",
                                callback_data: "acao_1"
                            },
                            {
                                text: "Link Externo",
                                web_app: {
                                    url: "https://google.com"
                                }
                            }
                        ],
                        [
                            {
                                text: "Opção 3",
                                callback_data: "acao_3"
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