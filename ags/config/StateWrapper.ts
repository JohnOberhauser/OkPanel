import { createState} from "ags";
import type { Accessor, Setter } from "ags";

/**
 * Back-compat mutable wrapper around AGS State.
 */
export class StateWrapper<T> {
    private readonly acc: Accessor<T>;
    private readonly setter?: Setter<T>;

    constructor(initial: T) {
        const [acc, setAcc] = createState(initial);
        this.acc = acc;
        this.setter = setAcc;
    }

    peek(): T {
        return this.acc.peek()
    }

    set(next: T | ((prev: T) => T)): void {
        if (!this.setter) {
            throw new Error("This Variable is read-only (no setter available).");
        }
        this.setter(next as any);
    }

    asAccessor(): Accessor<T> {
        return this.acc;
    }
}
