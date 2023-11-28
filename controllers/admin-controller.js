const Admin = require('../models/admin-model');
const asyncHandler = require('../utils/async-handler');
const RequestError = require('../errors/request-error');


//OBTIENE ADMIN LOGEADO EN SISTEMA
const getCurrentAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById({ _id: req.admin._id });
  if (!admin) {
    throw new RequestError(404, 'Administrador no encontrado');
  }
  res.status(200).json({ admin });
});


//ACTUALIZA CREDENCIALES DE USUARIO LOGEADO EN SISTEMA
const updateCurrentAdminCredentials = asyncHandler(async (req, res) => {
  const { userName, password, confirmPassword } = req.body;
  if (!userName || !password || !confirmPassword) {
    throw new RequestError(400, 'Todos los campos son requeridos');
  }
  const id = req.admin._id;
  const admin = await Admin.findById(id);
  checkPass(password, confirmPassword);
  admin.userName = userName;
  admin.password = password;
  await admin.save();
  res.status(200).json({ admin });
});


const checkPass = (password, confirmPassword) => {
  if (password.length < 5 || password.length > 20) {
    throw new RequestError(400, 'El password debe tener entre 5 y 20 caracteres');
  }
  if (password !== confirmPassword) {
    throw new RequestError(400, 'Los passwords no concuerdan');
  }
};

module.exports = {
  getCurrentAdmin,
  updateCurrentAdminCredentials,
};
