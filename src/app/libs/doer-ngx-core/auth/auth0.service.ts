import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Tokens } from "./auth.types";

@Injectable()
export class Auth0Service extends AuthService {

    setTokens(tokens: Tokens): void {
        throw new Error("Method not implemented.");
    }
}
