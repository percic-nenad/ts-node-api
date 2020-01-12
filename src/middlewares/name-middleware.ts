import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../common/exceptions";

export function attachName(request: Request, response: Response, next: NextFunction) {
    if (request.method === "OPTIONS")
        next();

    const name = request.params.name;
    if (!name)
        throw new BadRequestException();

    response.locals.name = name;
    next();
}
