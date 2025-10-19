export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('OK');
  }

  const update = req.body;

  console.log('Mensagem recebida do Telegram:', update);

  // Apenas responde OK para o Telegram
  return res.status(200).send('OK');
}