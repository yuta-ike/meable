import { DateTime } from "luxon";
import Task from "../task";

const generateTask = (key: string = "1") => new Task(`task${key}`, `課題${key}`, `課題${key}の説明。`, 1, DateTime.local(2020, 10, 20, 20, 20), DateTime.local(2020, 10, 20, 20, 20))

export default generateTask