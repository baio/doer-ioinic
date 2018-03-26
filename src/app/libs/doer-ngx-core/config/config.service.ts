import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService<T> {

    constructor(public readonly val: T) {
    }
}