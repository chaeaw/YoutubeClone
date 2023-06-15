const fakeUser = {
  username : "user1",
  loggedIn : false,
}

let videos = [
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
    views: 1,
    id: 3
  },
]

const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos});
};
const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing:  ${video.title}`, video });
};

const postEdit = (req, res) => {
  const {id} = req.params;
  const { title} = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);

}
const search = (req, res) => res.send("Search");
const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete Video");
};
const upload = (req, res) => {
  return res.send("Upload Video");
};

export { trending, getEdit,postEdit, search, watch, deleteVideo, upload };
