/**
 * A ValidatableConfiguration is able to validate a piece of configuration.
 */
export interface ValidatableConfiguration<TConfiguration> {
    validate(unvalidatedConfiguration: unknown): Promise<TConfiguration>;
}

export class ConfigurationValidationError extends Error {
    public readonly validatorName: string
    public readonly innerError: unknown | undefined

    constructor(message: string, validatorName: string, innerError?: unknown) {
        super(message || 'Something went wrong while validating this configuration.')
        this.validatorName = validatorName
        this.innerError = innerError

        Object.setPrototypeOf(this, ConfigurationValidationError.prototype)
    }

    hasInnerError(): boolean {
        return this.innerError !== undefined && this.innerError !== null
    }
}

export const isConfigurationValidationError = (something: any): something is ConfigurationValidationError =>
    something !== undefined && something !== null && typeof something === 'object' && 'validatorName' in something
