const trending = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};
const see = (req, res) => {
  res.render("watch", { pageTitle: "Watch" });
};
const edit = (req, res) => {
  res.render("edit", { pageTitle: "Edit" });
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
