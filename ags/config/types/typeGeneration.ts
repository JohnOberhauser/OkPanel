// ───────────────────────────────────────────────
//  Type‑generation helpers – compile‑time only
// ───────────────────────────────────────────────
import {Field, PrimitiveType} from "../schema/primitiveDefinitions";
import {Variable} from "../Variable";

type PrimitiveByKind<K extends PrimitiveType> =
    K extends 'string' ? string :
    K extends 'number' ? number :
    K extends 'boolean' ? boolean :
    K extends 'color' ? string :
    K extends 'icon' ? string :
    never
type FieldToProp<F extends Field> =
    F['type'] extends 'object'
        ? SchemaToType<F['children']>
        : F['type'] extends 'array'
            ? FieldToProp<NonNullable<F['item']>>[]
            : F['type'] extends 'enum'
                ? (F['enumValues'] extends readonly (infer E)[] ? E : string)
                : F['type'] extends PrimitiveType
                    ? PrimitiveByKind<F['type']>
                    : never

export type SchemaToType<S extends readonly Field[] | undefined> =
    S extends readonly Field[]
        ? { [K in S[number] as K['name']]: FieldToProp<K> }
        : unknown

// ───────────────────────────────────────────────
//  Type‑generation helpers for leafs wrapped in Variables
// ───────────────────────────────────────────────
type VariableWrappedPrimitiveByKind<K extends PrimitiveType> =
    K extends 'string' ? Variable<string> :
    K extends 'number' ? Variable<number> :
    K extends 'boolean' ? Variable<boolean> :
    K extends 'color' ? Variable<string> :
    K extends 'icon' ? Variable<string> :
    never

type VariableWrappedPrimitiveListByKind<K extends PrimitiveType> =
    K extends 'string' ? Variable<string[]> :
    K extends 'number' ? Variable<number[]> :
    K extends 'boolean' ? Variable<boolean[]> :
    K extends 'color' ? Variable<string[]> :
    K extends 'icon' ? Variable<string[]> :
    never

type VariableFieldToProp<F extends Field> =
    F['reactive'] extends false
        ? FieldToProp<F>
        : F['type'] extends 'object'
            ? VariableSchemaToType<F['children']>
            : F['type'] extends 'array'
                ? F['item'] extends Field
                    ? F['item']['type'] extends 'object'
                        ? Variable<VariableSchemaToType<F['item']['children']>[]>
                        : F['item']['type'] extends 'enum'
                            ? F['item']['enumValues'] extends readonly (infer E)[]
                                ? Variable<E[]>
                                : Variable<string[]>
                            : F['item']['type'] extends PrimitiveType
                                ? VariableWrappedPrimitiveListByKind<F['item']['type']>
                                : never
                    : never
                : F['type'] extends 'enum'
                    ? (F['enumValues'] extends readonly (infer E)[]
                        ? Variable<E>
                        : Variable<string>)
                    : F['type'] extends PrimitiveType
                        ? VariableWrappedPrimitiveByKind<F['type']>
                        : never

export type VariableSchemaToType<S extends readonly Field[] | undefined> =
    S extends readonly Field[]
        ? { [K in S[number] as K['name']]: VariableFieldToProp<K> }
        : unknown