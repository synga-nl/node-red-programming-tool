import {Tool, create} from "./Tool";
import {Enum} from "./Enums/Enum";
import {Switch} from "./Enums/Service/Switch";
import {InstallIntelliSense} from "./Support/InstallIntelliSense";
import {Light} from "./Enums/Service/Light";
import {MotionBlind} from "./Enums/Service/MotionBlind";
import {collect} from "collect.js";

const Enums = {
    Enum,
    Service: {
        Switch,
        Light,
        MotionBlind
    },
};

export {
    Tool,
    Enums,
    create,
    InstallIntelliSense,
    collect,
}
