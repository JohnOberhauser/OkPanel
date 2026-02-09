import {execAsync} from "ags/process";
import {insertNewlines} from "../utils/strings";
import {createState} from "ags";

export default function ({cliphistId}: {cliphistId: number}) {
    const [text, textSetter] = createState("")
    const label = <label
        xalign={0}
        wrap={true}
        hexpand={true}
        cssClasses={["labelMedium"]}
        label={text}/>

    execAsync(["bash", "-c", `cliphist decode ${cliphistId}`]).catch((error) => {
        console.log(error)
    }).then((value) => {
        if (typeof value !== "string") {
            return
        }
        textSetter(insertNewlines(value, 46))
    })

    return label
}
