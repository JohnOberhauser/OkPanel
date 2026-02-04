import { createState} from "ags";
import type { Accessor, Setter } from "ags";

/**
 * Back-compat mutable wrapper around AGS State.
 */
export class StateWrapper<T> {
    private readonly acc: Accessor<T>;
    private readonly setter: Setter<T>;

    constructor(initial: T) {
        const [acc, setAcc] = createState(initial);
        this.acc = acc;
        this.setter = setAcc;
    }

    peek(): T {
        return this.acc.peek()
    }

    set(newValue: T): void {
        this.setter(newValue);
    }

    asAccessor(): Accessor<T> {
        return this.acc;
    }
}
