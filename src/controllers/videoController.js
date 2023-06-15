const fakeUser = {
  username : "user1",
  loggedIn : false,
}

const trending = (req, res) => {
  const videos = [
    {
      title: "First Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 38,
      id: 1
    },
    {
      title: "Second Video",
      rating: 5,
      comments: 65,
      createdAt: "32 minutes ago",
      views: 367,
      id: 2
    },
    {
      title: "Third Video",
      rating: 3,
      comments:1,
      createdAt: "54 minutes ago",
      views: 5,
      id: 3
    },
  ]
  return res.render("home", { pageTitle: "Home", videos});
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
