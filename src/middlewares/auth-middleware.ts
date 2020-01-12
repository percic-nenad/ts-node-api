import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../common/exceptions";

const defaultSecret = "super-secret-secret";
const tokenExpirationTime = "7d";

export interface AuthPayload {
    sub: string;
    name: string;
}

export function encodeBearerToken(data: AuthPayload): string {
    return jwt.sign(data, defaultSecret, {
        expiresIn: tokenExpirationTime
    });
}

function decodeBearerToken(token: string): any {
    return jwt.verify(token, defaultSecret);
}

export function requireAuthentication(request: Request, response: Response, next: NextFunction) {
    if (request.method === "OPTIONS")
        next();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.includes("Bearer "))
        throw new UnauthorizedException();

    const authPayload = decodeBearerToken(authHeader.replace("Bearer ", ""));
    if (!authPayload || authPayload.error)
        throw new UnauthorizedException();

    response.locals.authPayload = authPayload;
    next();
}
