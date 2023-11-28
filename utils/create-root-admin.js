const Admin = require('../models/admin-model');

const createRootAdmin = async () => {
  const admin = await Admin.findOne({ role: 'root' });
  if (!admin) {
    await Admin.create({
      displayName:'Administrador',
      userName: 'admin',
      password: 'admin',
      role: 'root',
    });
  }
};

module.exports = createRootAdmin;
