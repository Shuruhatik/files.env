import { FileEnv } from "./variables";
import { stringify, parse } from "./util"

function config(envPath: string = ".env", envSystemVariables: boolean = true) {
    const systemVariables = process.env || {}
    process.env = new FileEnv(envPath, !envSystemVariables ? {} : systemVariables)
}

export { config, FileEnv, stringify, parse }