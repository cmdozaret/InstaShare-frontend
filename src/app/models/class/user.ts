export class User {
    id: number = 0;
    username: string = '';
    password: string = '';
    email: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    constructor() {
        this.username = '';
        this.password = '';
        this.email = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}