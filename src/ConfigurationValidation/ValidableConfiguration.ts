/**
 * A ValidableConfiguration is able to validate a piece of configuration.
 */
export interface ValidableConfiguration<TConfiguration> {
    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration>;
}

export class ConfigurationValidationError extends Error {
    constructor(message: string) {
        super(message)
    }
}
