export default async function handler(req, res) {
    // Telegram exige que o webhook retorne 200 rápido, mesmo se for GET
    if (req.method !== 'POST') {
        return res.status(200).send('OK');
    }

    try {
        const update = req.body;

        // Garante que há uma mensagem
        if (update.message) {
            const chatId = update.message.chat.id;

            // Envia mensagem com botão WebApp
            const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: "Clique no botão abaixo para preencher o formulário:",
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

            const data = await response.json();
            console.log("Mensagem enviada:", data);
        }

        // Telegram precisa receber resposta 200 sempre
        return res.status(200).send('OK');
    } catch (error) {
        console.error("Erro no webhook:", error);
        return res.status(500).send('Erro interno');
    }
}
