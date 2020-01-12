import * as express from "express";
import * as bodyParser from "body-parser";
import { requestLogMiddleware, errorMiddleware } from "../middlewares";
import routing from "./routing";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 5000);
app.use(requestLogMiddleware);

app.use(routing);
app.use(errorMiddleware);

export default app;
