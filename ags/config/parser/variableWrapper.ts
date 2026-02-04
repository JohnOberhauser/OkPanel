import {Field} from "../schema/primitiveDefinitions";
import {SchemaToType, VariableSchemaToType} from "../types/typeGeneration";
import {StateWrapper} from "../StateWrapper";

/**
 * This function will take a Schema object and turn it into a new, nearly identical object,
 * but the leaf values will be wrapped in a reactive object.
 */
export function wrapConfigInVariables<T extends readonly Field[]>(
    schema: T,
    config: SchemaToType<T>
): VariableSchemaToType<T> {
    const result: any = {};
    for (const field of schema) {
        const value = config[field.name as keyof typeof config];
        if (field.type === 'object' && field.children) {
            result[field.name] = wrapConfigInVariables(field.children, value as any);
        } else if (field.type === 'array' && field.item) {
            if (field.item.type === 'object') {
                if (field.reactive === true || field.reactive === undefined) {
                    result[field.name] = new StateWrapper(value);
                } else {
                    result[field.name] = (value as any[]).map(item =>
                        wrapConfigInVariables(field.item!.children!, item)
                    )
                }
            } else {
                if (field.reactive === true || field.reactive === undefined) {
                    result[field.name] = new StateWrapper(value);
                } else {
                    result[field.name] = value;
                }
            }
        } else {
            if (field.reactive === true || field.reactive === undefined) {
                result[field.name] = new StateWrapper(value);
            } else {
                result[field.name] = value;
            }
        }
    }
    return result;
}

let variablesChanged: number = 0
let reactiveVariablesChanged: number = 0

/**
 * This function updates all the reactive values in the wrapped object to match the newConfig values.
 */
export function updateVariablesFromConfig<T extends readonly Field[]>(
    schema: T,
    wrapped: VariableSchemaToType<T>,
    newConfig: SchemaToType<T>,
    path: string = "",
): void {
    if (path === "") {
        variablesChanged = 0
        reactiveVariablesChanged = 0
    }
    for (const field of schema) {
        const name = field.name;
        const newValue = newConfig[name as keyof typeof newConfig];
        const wrappedValue = wrapped[name as keyof typeof wrapped];

        if (field.reactive === false) {
            if (wrappedValue !== newValue) {
                console.log(`Variable changed: ${path}${name} - old value: ${wrappedValue} - new value: ${newValue}`);
                variablesChanged += 1;
                (wrapped as any)[name] = newValue;
            }
            continue;
        }

        if (field.type === 'object' && field.children) {
            updateVariablesFromConfig(
                field.children,
                wrappedValue as any,
                newValue as any,
                `${path}${name}.`,
            );
        } else if (field.type === 'array' && field.item) {
            const currentValue = (wrappedValue as StateWrapper<any>).peek();

            if (field.item.type === 'object') {
                // Always set because we regenerate wrapped objects
                console.log(`== Reactive == variable changed: ${path}${name}`)
                reactiveVariablesChanged += 1;
                (wrappedValue as StateWrapper<any>).set(newValue);
            } else {
                // Shallow array equality check
                if (!arraysEqual(currentValue, newValue)) {
                    console.log(`== Reactive == variable changed: ${path}${name}`);
                    reactiveVariablesChanged += 1;
                    (wrappedValue as StateWrapper<any>).set(newValue);
                }
            }
        } else {
            const currentValue = (wrappedValue as StateWrapper<any>).peek();
            if (currentValue !== newValue) {
                console.log(`== Reactive == variable changed: ${path}${name}`)
                reactiveVariablesChanged += 1;
                (wrappedValue as StateWrapper<any>).set(newValue);
            }
        }
    }
    if (path === "") {
        console.log(`Variables changed: ${variablesChanged}`)
        console.log(`Reactive variables changed: ${reactiveVariablesChanged}`)
    }
}

function arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((val, i) => val === b[i]);
}