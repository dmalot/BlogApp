import { Injectable } from "@angular/core";


@Injectable()
export class LocalStorageService {

    set(key: string, value: string) {
        sessionStorage.setItem(key, value)
    }

    get(key: string) {
        return sessionStorage.getItem(key);
    }

    remove(key: string) {
        sessionStorage.removeItem(key);
    }

}