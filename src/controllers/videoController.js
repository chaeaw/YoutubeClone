const trending = (req, res) => res.send("HomePage Videos");
const see = (req, res) => {
  console.log(req.params);
  return res.send(`Watch Video #${req.params.id}`);
};
const edit = (req, res) => {
  console.log(req.params);
  return res.send("Edit");
};
const search = (req, res) => res.send("Search");
const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete Video");
};
const upload = (req, res) => {
  return res.send("Upload Video");
};

export { trending, edit, search, see, deleteVideo, upload };
