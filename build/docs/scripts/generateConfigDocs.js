"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const root_1 = require("../../ags/config/schema/definitions/root");
const INTRO = `# Configuration Schema

Here you will find the definitions of all available configurations

## Config values

---
`;
const OUT_PATH = "config.md";
function mdEscape(s) {
    return s.replace(/\|/g, "\\|").replace(/`/g, "\\`");
}
function isResolvableDefault(value) {
    return typeof value === 'object' && value !== null && 'from' in value;
}
function collectRow(field) {
    const isArray = field.type === "array";
    const item = field.item;
    const enumVals = field.enumValues?.length ? field.enumValues : item?.enumValues;
    let baseType = field.type;
    if (isArray && item?.type === "enum") {
        baseType = `enum[(${item.enumValues.map(v => `${v}`).join(", ")})]`;
    }
    else if (isArray && item) {
        baseType = `[${item.type}]`;
    }
    else if (field.type === "enum" && enumVals) {
        baseType = `enum (${enumVals.map(v => `${v}`).join(", ")})`;
    }
    return {
        name: field.name,
        type: baseType,
        default: isResolvableDefault(field.default)
            ? `Inherits from: ${field.default.from}`
            : field.default === undefined ||
                field.default === "" ||
                (Array.isArray(field.default) && field.default.length === 0)
                ? ""
                : Array.isArray(field.default)
                    ? `[${field.default.map(String).join(", ")}]`
                    : String(field.default),
        description: mdEscape(field.description ?? ""),
    };
}
function collectChildren(field, prefix = "") {
    const tables = [];
    const fullPrefix = prefix ? `${prefix}.${field.name}` : field.name;
    if (field.type === "object" && field.children) {
        const rows = field.children.map(collectRow);
        tables.push({ path: fullPrefix, rows });
        for (const child of field.children) {
            tables.push(...collectChildren(child, fullPrefix));
        }
    }
    if (field.type === "array" && field.item?.type === "object" && field.item.children) {
        const rows = field.item.children.map(collectRow);
        tables.push({ path: `${fullPrefix}[]`, rows });
        for (const child of field.item.children) {
            tables.push(...collectChildren(child, `${fullPrefix}[]`));
        }
    }
    return tables;
}
function formatTable(rows) {
    const header = ["Name", "Type", "Default", "Description"];
    const widths = header.map((_, i) => Math.max(header[i].length, ...rows.map(row => [
        row.name,
        row.type,
        row.default,
        row.description,
    ][i]?.length || 0)));
    const formatRow = (cols) => `| ${cols.map((col, i) => col.padEnd(widths[i])).join(" | ")} |`;
    const lines = [];
    lines.push(formatRow(header));
    lines.push(`|${widths.map(w => "-".repeat(w + 2)).join("|")}|`);
    for (const row of rows) {
        lines.push(formatRow([
            row.name,
            row.type,
            row.default,
            row.description,
        ]));
    }
    return lines;
}
function generateDocs(schema) {
    const out = [];
    out.push(INTRO);
    // Top-level table for all non-object fields
    const topLevelRows = [];
    const nestedSections = [];
    for (const field of schema) {
        const row = collectRow(field);
        topLevelRows.push(row);
        const childTables = collectChildren(field);
        for (const { path, rows } of childTables) {
            nestedSections.push(`\n${path.includes('.') ? '####' : '###'} ${path}\n`);
            nestedSections.push(...formatTable(rows));
        }
    }
    // Main table
    out.push(...formatTable(topLevelRows));
    // Append nested sections
    out.push(...nestedSections);
    return out.join("\n");
}
// Generate and write file
const markdown = generateDocs(root_1.CONFIG_SCHEMA);
(0, fs_1.writeFileSync)(OUT_PATH, markdown);
console.log(`✅ Generated config docs to ${OUT_PATH}`);
