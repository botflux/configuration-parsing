/**
 * A ValidatableConfiguration is able to validate a piece of configuration.
 */
export interface ValidatableConfiguration<TConfiguration> {
    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration>;
}

export class ConfigurationValidationError extends Error {
    public readonly validatorName: string

    constructor(message: string, validatorName: string) {
        super(message || 'Something went wrong while validating this configuration.')
        this.validatorName = validatorName
    }
}

export const isConfigurationValidationError = (something: any): something is ConfigurationValidationError =>
    something !== undefined && something !== null && typeof something === 'object' && 'validatorName' in something
