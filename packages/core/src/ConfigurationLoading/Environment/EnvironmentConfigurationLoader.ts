import {ParsedLoadableConfiguration} from '../LoadableConfiguration'

export type ProcessEnv = {
    [key: string]: string | undefined
}

class EnvironmentConfigurationLoader implements ParsedLoadableConfiguration<ProcessEnv, ProcessEnv> {

    load(env: ProcessEnv = process.env): Promise<ProcessEnv> {
        return Promise.resolve(env);
    }
}

export const configurationEnvironmentLoader = (): ParsedLoadableConfiguration<ProcessEnv, ProcessEnv> =>
    new EnvironmentConfigurationLoader()
