import { parse, stringify, pathResolve, file_exists, formatErrorMessage } from "./util";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";

class FileEnv {
    #envPath: string
    #old_process: Record<string, any>
    [name: string]: any;
    constructor(path: string = ".env", old_process: NodeJS.ProcessEnv = process.env) {
        this.#envPath = pathResolve(path);
        this.#old_process = old_process
        this.readSystemVariables();
        this.reloadVariables();
    }
    /**
    * @description Read variables in the file
    * @example process.env.reloadVariables()()
    * @returns {void}
    */
    reloadVariables(): void {
        if (!file_exists(this.#envPath)) writeFileSync(this.#envPath, "");
        let readFileData = readFileSync(this.#envPath, { encoding: 'utf8' });
        let object_env = parse(readFileData);
        Object.keys(object_env).forEach((key: string) => this[key] = object_env[key]);
    }
    readSystemVariables(): void {
        Object.keys(this.#old_process).forEach((key: string) => this[key] = this.#old_process[key])
    }
    /**
    * @description Read variable from file
    * @example process.env.get("token")
    * @param {*} key Type a key for the element
    * @returns {*}
    */
    get(key: string): string {
        if (!key) throw Error(formatErrorMessage("You must put key", 'EnvironmentVariables', 'Method', "get"));
        if (typeof key !== "string") throw Error(formatErrorMessage("You must put key must be string", 'EnvironmentVariables', 'Method', "get"));
        this.reloadVariables();
        return this[key]
    }
    /**
    * @description Check if a variable exists in the file
    * @example process.env.has("token")
    * @param {*} key Type a key for the element
    * @returns {boolean}
    */
    has(key: string): boolean {
        if (!key) throw Error(formatErrorMessage("You must put key", 'EnvironmentVariables', 'Method', "has"));
        if (typeof key !== "string") throw Error(formatErrorMessage("You must put key must be string", 'EnvironmentVariables', 'Method', "has"));
        this.reloadVariables();
        return this[key] ? true : false
    }
    /**
    * @description set variable in the file
    * @example process.env.set("token","my_secret_token")
    * @param {*} key Type a key for the element
    * @param {*} value Type a value for the element
    * @returns {void}
    */
    set(key: string, value: string): void {
        if (!key || !value) throw Error(formatErrorMessage("You must put key and value", 'EnvironmentVariables', 'Method', "set"));
        if (typeof key !== "string" || typeof value !== "string") throw Error(formatErrorMessage("You must put key and value must be string", 'EnvironmentVariables', 'Method', "set"));
        this.reloadVariables();
        let readFileData = readFileSync(this.#envPath, { encoding: 'utf8' });
        let object_env = parse(readFileData);
        object_env[key] = value
        this[key] = value;
        this.writeFile(object_env);
    }
    /**
    * @description Delete variable from file
    * @example process.env.delete("token")
    * @param {*} key Type a key for the element
    * @returns {boolean}
    */
    delete(key: string): boolean {
        if (!key) throw Error(formatErrorMessage("You must put key", 'EnvironmentVariables', 'Method', "delete"));
        if (typeof key !== "string") throw Error(formatErrorMessage("You must put key must be string", 'EnvironmentVariables', 'Method', "delete"));
        this.reloadVariables();
        if (!this[key]) return false;
        let readFileData = readFileSync(this.#envPath, { encoding: 'utf8' });
        let object_env = parse(readFileData);
        delete object_env[key];
        delete this[key];
        this.writeFile(object_env)
        return true
    }
    /**
    * @description To write an object to the file 
    * @example process.env.writeFile({token:"",prefix:"#"})
    * @param {*} object
    * @returns {void}
    */
    writeFile(object?: Record<string, string>): void {
        writeFileSync(this.#envPath, object ? stringify(object) : stringify(this));
    }
    /**
    * @description Delete all variables from the file
    * @example process.env.clear()
    * @returns {void}
    */
    clear(): void {
        Object.keys(this).forEach((key) => delete this[key])
        this.writeFile({})
        this.readSystemVariables()
    }
    /**
    * @description Delete and destroy the file
    * @example process.env.destroy()
    * @returns {void}
    */
    destroy(): void {
        try { unlinkSync(this.#envPath) } catch (err) { throw Error(formatErrorMessage("The file has been destroyed before!", 'EnvironmentVariables', 'Method', "destroy")) }
    }
}

export { FileEnv }