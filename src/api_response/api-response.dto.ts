export class ApiResponse<T> {
    constructor(
        public sucess: boolean,
        public message: string,
        public data?: T, 
    ) {}
}