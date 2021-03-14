/**
 * A ValidatableConfiguration is able to validate a piece of configuration.
 */
export interface ValidatableConfiguration<TConfiguration> {
    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration>;
}

export class ConfigurationValidationError extends Error {
    constructor(message: string) {
        super(message || 'Something went wrong while validating this configuration.')
    }
}
