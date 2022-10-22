import { statSync } from "node:fs";
import * as path from "node:path";

const parse = (src: string | Buffer): Record<string, string> => {
    const result: Record<string, string> = {}
    const lines = src.toString().split('\n')
    lines.forEach((line: string) => line.trim().split("=")[0] ? line.trim().split("=")[1].includes("#") ? result[line.trim().split("=")[0]] = line.trim().split("=")[1].split("#")[0].replaceAll('"', '') : result[line.trim().split("=")[0]] = line.trim().split("=")[1].replaceAll('"', '') : "")
    return result
}

const stringify = (object: Record<string, any>): string => {
    const result: string[] = []
    Object.keys(object).forEach((key: string) => result.push(`${key}=${JSON.stringify(object[key])}`))
    return result.join("\n")
}

const file_exists = (path: string): boolean => {
    try {
        statSync(`${path}`)
        return true
    } catch (e) {
        return false
    }
}


const pathResolve = (filePath: string): string => {
    if (filePath.startsWith("./")) filePath = filePath.slice(2);
    if (filePath.startsWith("." + path.sep)) filePath = filePath.slice(1);
    if (!filePath.endsWith(".env")) {
        filePath += `.env`;
    }
    return path.resolve(`./${filePath}`)
}

const formatErrorMessage = (reason: string, class_name: string, var1?: string, var2?: string): string => {
    console.log(`\x1b[36m`)
    return `\u001b[38;5;251m> \u001b[38;5;2mFiles.env\n    \u001b[38;5;160m${reason}\n\n    \u001b[38;5;160mClass:\n    \u001b[38;5;243m|  \u001b[38;5;34m'${class_name}' \x1b[4m\u001b[38;5;243m->\x1b[0m \u001b[38;5;243m\u001b[38;5;34m'${var1}'\u001b[38;5;243m\u001b[38;5;243m\x1b[4m->\x1b[0m \u001b[38;5;34m'${var2}'\x1b[0m`
}

export { stringify, parse, pathResolve, file_exists, formatErrorMessage }