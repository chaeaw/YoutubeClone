import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddlewares } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hello!",
    resave: true,
    //변경 사항이 없어도 저장
    saveUninitialized: true,
    // 세션 초기화 전에도 저장
  })
);

/*
session 미들웨어가 session id를 만들어 브라우저(유저)에게 보내준다.
(왜 사용해야 하는가? 서버(백엔드)와 브라우저가 실시간 연결이 아니므로!)
-> 브라우저(유저)는 쿠키에 session id를 저장하고, express에서는 session DB(백엔드)에 저장한다.
-> 브라우저는 서버(백엔드)에 요청할 때마다 쿠키에 저장된 session id를 보낸다!
-> 서버(백엔드)는 session id를 통해 어떤 유저가 어떤 브라우저에서 요청을 보냈는지 알 수 있다!
*/

app.use(localsMiddlewares);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
