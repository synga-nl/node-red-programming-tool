import {ResultInterface} from "./ResultInterface";

export class NullOutput implements ResultInterface {
    output(): any {
        return null;
    }

    isEmpty(): boolean {
        return true;
    }
}