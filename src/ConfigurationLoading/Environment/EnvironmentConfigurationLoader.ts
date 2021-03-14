import {LoadableConfiguration} from '../LoadableConfiguration'

export type ProcessEnv = {
    [key: string]: string | undefined
}

class EnvironmentConfigurationLoader implements LoadableConfiguration {
    constructor(private readonly env: ProcessEnv = process.env) {}

    load(): Promise<string> {
        return Promise.resolve(JSON.stringify(this.env));
    }
}

export const configurationEnvironmentLoader = (env: ProcessEnv = process.env): LoadableConfiguration =>
    new EnvironmentConfigurationLoader(env)
