import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor (
        private http: HttpClient
    ) {
    }

    createUser(email: string, password: string) {
        return createUserWithEmailAndPassword(getAuth(), email, password);
    }

    internalLogin(email: string, password: string) {
        let loginData = {
            email,
            password
        };
        return this.http.post(`${environment.url_api}/api/v1/users/login`, loginData);
    }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(getAuth(), email, password);
    }

    logout() {
        return signOut(getAuth());
    }

    hasUser() {
        return authState;
    }
}
