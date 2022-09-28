export default class User {
    email: string;
    admin: boolean;

    constructor (email: string, admin: boolean) {
        this.email = email;
        this.admin = admin;
    }
}