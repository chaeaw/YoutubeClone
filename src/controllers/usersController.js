import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join Account" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password comfirmation does not mach.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join Account",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  // https://docs.github.com/ko/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
  // github oauth, 해당하는 정보들(scope)들을 보내준 뒤 API에 설정된 주소(여기선 users/github/finish)로 이동시켜줌.
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  // 이때 github에서 code를 주소에 붙여서 주는데 승인이라는 뜻! 여기서 req.qeury.code로 해당 코드를 불러와서 사용함!
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`; // POST를 위한 URL
  const tokenRequest = await // token 받기
  (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    // github API와 상호작용하기 위한 token!
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await // token을 사용해 uesr 정보 불러오기
    (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData =
      await // token을 사용해 email(user에서 감춰져있기 때문에 한 번 더 fetch) 불러오기
      (
        await fetch(`${apiUrl}/user/emails`, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
      // emailData가 array이므로 find 사용해서 조건에 부합하는 email 추적
    );

    if (!emailObj) {
      // 추후에 notification 설정
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    // github 로그인할 때, github email을 가진 유저 데이터가 기존 userDB에 있는지 확인
    if (!user) {
      // 일치하는 email이 없다면, 새로 유저를 생성시키고 로그인시켜줌
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        //password가 없는 대신 socialOnly: true 설정 => 비밀번호를 사용한 일반 로그인을 할 때 구별하기 위해
        location: userData.location,
      });
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
    // 일치하는 email이 있다면(일반 회원가입으로 이미 email이 등록되어있는 경우) 패스워드 입력 없이 로그인 시켜줌.
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
