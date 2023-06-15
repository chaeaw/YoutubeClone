const fakeUser = {
  username : "user1",
  loggedIn : false,
}

const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", fakeUser });
};
const see = (req, res) => {
  return res.render("watch", { pageTitle: "Watch" });
};
const edit = (req, res) => {
  return res.render("edit", { pageTitle: "Edit" });
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
