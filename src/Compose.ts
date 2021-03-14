import {LoadableConfiguration} from './ConfigurationLoading/LoadableConfiguration'
import {ParsableConfiguration} from './ConfigurationParsing/ParsableConfiguration'
import {ValidatableConfiguration} from './ConfigurationValidation/ValidatableConfiguration'

/**
 * Create a configuration workflow.
 *
 * @param loadable
 * @param parsable
 * @param validatable
 */
export const composeWorkflow = <TConfiguration> (
    loadable: LoadableConfiguration,
    parsable: ParsableConfiguration,
    validatable: ValidatableConfiguration<TConfiguration>
) =>
    loadable.load()
        .then(rawConfiguration => parsable.parse(rawConfiguration))
        .then(parsedConfiguration => validatable.validate(parsedConfiguration))
