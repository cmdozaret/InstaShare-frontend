export class File {
    id: number = 0;
    name: string = '';
    type: string = '';
    originalSize: string = '';
    zippedSize: string = '';
    data: string = '';
    userId: number = 0;

    constructor() {
        this.id = 0;
        this.name = '';
        this.type = '';
        this.originalSize = '';
        this.zippedSize = '';
        this.data = '';
        this.userId = 0;
    }
}