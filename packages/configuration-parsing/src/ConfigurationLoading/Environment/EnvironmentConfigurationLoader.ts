import {ParsedLoadableConfiguration} from '../LoadableConfiguration'

export type ProcessEnv = {
    [key: string]: string | undefined
}

class EnvironmentConfigurationLoader implements ParsedLoadableConfiguration<ProcessEnv> {
    constructor(private readonly env: ProcessEnv = process.env) {}

    load(): Promise<ProcessEnv> {
        return Promise.resolve(this.env);
    }
}

export const configurationEnvironmentLoader = (env: ProcessEnv = process.env): ParsedLoadableConfiguration<ProcessEnv> =>
    new EnvironmentConfigurationLoader(env)
