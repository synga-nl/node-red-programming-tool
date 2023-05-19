import {Enum} from "../Enum";

export abstract class ServiceEnum extends Enum {
    abstract get data(): { title: string | null, state: string | null }
}