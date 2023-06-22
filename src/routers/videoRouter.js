import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(postUpload);
// mongoose에서 랜덤으로 만들어주는 id가 24자의 16진수(0-9 a-f) 값이므로 정규식으로 일치하게끔 설정.
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);

videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
export default videoRouter;
