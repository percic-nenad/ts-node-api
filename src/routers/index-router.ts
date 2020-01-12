import { Request, Response, Router, NextFunction } from "express";
import { asyncErrorHandler, attachName } from "../middlewares";
import { requireBody } from "../middlewares/body-schema-middleware";

const indexRouter = Router();

indexRouter.route("/").get(
    (request: Request, response: Response, next: NextFunction) => {
        response.send(`Hello World!`)
    }
);

indexRouter.route("/:name").get(attachName, asyncErrorHandler(
    async (request: Request, response: Response, next: NextFunction) => {
        const { name } = response.locals as {
            name: string
        };
        response.send(`Hello ${name}!`)
    }
));

const postSchema = {
    type: "object",
    properties: {
        name: { type: "string" }
    },
    required: ["name"]
}
indexRouter.route("/").post(requireBody(postSchema), asyncErrorHandler(
    async (request: Request, response: Response, next: NextFunction) => {
        const { name } = request.body;
        response.send(`Hello ${name}!`);
    }
));

export default indexRouter;
