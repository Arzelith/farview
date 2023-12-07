const asyncHandler = require('../utils/async-handler');
const transporter = require('../utils/email-handler');
const RequestError = require('../errors/request-error');

const sendMessage = asyncHandler(async (req, res) => {
  const { name, lastName, email, content } = req.body;
  if (!name || !lastName || !email || !content) {
    throw new RequestError(400, 'Todos los campos son requeridos');
  }
  await transporter(
    process.env.MAILER_USER,
    process.env.MAILER_USER,
    `Consulta de cliente`,
    `Cliente: ${name} ${lastName}\n
    Email: ${email}\n
    Consulta: ${content}`
  );
  res.sendStatus(200);
});

module.exports = { sendMessage };
