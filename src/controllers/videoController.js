import Video from "../models/Video";

const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos: [] });
};

const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching ${video.title}` });
};

const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing:  ${video.title}` });
};

const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};
const search = (req, res) => res.send("Search");
const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete Video");
};
const upload = (req, res) => {
  return res.send("Upload Video");
};

export { home, getEdit, postEdit, search, watch, deleteVideo, upload };
