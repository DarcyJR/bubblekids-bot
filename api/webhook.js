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
        text: `Você disse: ${text}`
      })
    });
  }

  // Apenas responde OK para o Telegram
  return res.status(200).send('OK');
}