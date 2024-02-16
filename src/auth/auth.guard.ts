import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const idToken = context.switchToHttp().getRequest().headers.authorization?.split(" ")[1];

        if (!idToken) {
            throw new UnauthorizedException();
        }

        const permissions = this.reflector.get<string[]>("permissions", context.getHandler());
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);

            if (decodedToken.role === permissions[0]) {
                return true;
            }
            throw new UnauthorizedException();
        } catch (error) {
            console.log("Error", error);
            throw new UnauthorizedException();
        }
    }
}
