const asyncHandler = require('../utils/async-handler');
const transporter = require('../utils/email-handler');
const RequestError = require('../errors/request-error');

const sendMessage = asyncHandler(async (req, res) => {
  const { name, lastName, email, content } = req.body;
  if (!name || !lastName || !email || !content) {
    throw new RequestError(400, 'Todos los campos son requeridos');
  }
  await transporter(
    `${name + ' ' + lastName} <${process.env.MAILER_USER}>`,
    process.env.MAILER_USER,
    'Consulta de cliente',
    `<p>Cliente: ${name} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Consulta: ${content}</p>`
  );
  res.sendStatus(200);
});

module.exports = { sendMessage };
