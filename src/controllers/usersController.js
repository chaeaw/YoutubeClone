const join = (req, res) => res.send("Join");
const edit = (req, res) => res.send("Edit");
const remove = (req, res) => res.send("Delete");
const login = (req, res) => res.send("Login");
const logout = (req, res) => res.send("Log Out");
const see = (req, res) => res.send("See User");

export { join, edit, remove, login, logout, see };
