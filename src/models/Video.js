import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minlength: 10 },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  // Date.now() 가 아닌 이유: function이 바로 실행되지않게 하기 위해! video를 새로 생성시켰을 때 mongoose가 알아서 실행시켜줌.
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) =>
      word.trim().startsWith("#")
        ? `#${word.replace(/#/g, "").trim()}`
        : `#${word.trim()}`
    );
});
const Video = mongoose.model("Video", videoSchema);

export default Video;
