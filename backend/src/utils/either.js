export class Failure {
    value;
    constructor(value) {
        this.value = value;
    }
    isFailure() {
        return true;
    }
    isSuccess() {
        return false;
    }
    static create(value) {
        return new Failure(value);
    }
}
export class Success {
    value;
    constructor(value) {
        this.value = value;
    }
    isFailure() {
        return false;
    }
    isSuccess() {
        return true;
    }
    static create(value) {
        return new Success(value);
    }
}
