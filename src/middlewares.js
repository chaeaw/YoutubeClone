import multer from "multer";

export const localsMiddlewares = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};

  next();
};

export const protectorMiddleware = (req, res, next) => {
  // 로그인이 아니라면 되돌려보내기 => 로그인 상태에만 보여져야하는 루트에서 사용. ex) 프로필 수정 ...
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  // 로그인이라면 되돌려보내기 => 비로그인 상태에만 보여져야하는 루트에서 사용. ex) 로그인, 회원가입 ...
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadFiles = multer({
  dest: "uploads/",
});
