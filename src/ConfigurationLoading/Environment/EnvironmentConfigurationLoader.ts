import {AlreadyParsedLoadableConfiguration} from '../LoadableConfiguration'

export type ProcessEnv = {
    [key: string]: string | undefined
}

class EnvironmentConfigurationLoader implements AlreadyParsedLoadableConfiguration<ProcessEnv> {
    constructor(private readonly env: ProcessEnv = process.env) {}

    load(): Promise<ProcessEnv> {
        return Promise.resolve(this.env);
    }
}

export const configurationEnvironmentLoader = (env: ProcessEnv = process.env): AlreadyParsedLoadableConfiguration<ProcessEnv> =>
    new EnvironmentConfigurationLoader(env)
