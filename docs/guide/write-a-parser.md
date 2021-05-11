# Write a parser

To write a parser you must implement the `ParsableConfiguration` interface.
The interface describe two methods: `parse(string): any` and `supports(string): boolean`.

```typescript
import {ConfigurationParsingError, ParsableConfiguration} from '@configuration-parsing/core'

const isJson = (rawConfiguration: string) => {
    try {
        JSON.parse(rawConfiguration)
        return true
    } catch (e) {
        return false
    }
}

// The class implements the ParsableConfiguration interface.
class JsonConfigurationParser implements ParsableConfiguration {
    // Parse the raw configuration.
    parse(rawConfiguration: string): any {
        try {
            return JSON.parse(rawConfiguration)
        } catch (error) {
            throw new ConfigurationParsingError(
                `Something went wrong while parsing a json configuration. ` +
                `Are you that the configuration can be parsed? `,
                JsonConfigurationParser.name,
                error
            )
        }
    }

    // Return true if this parser supports the given configuration; otherwise false.
    supports(rawConfiguration: string): boolean {
        return isJson(rawConfiguration);
    }
}

// Expose your parser using a factory to not leak the implementation details.
export const jsonConfigurationParser = (): ParsableConfiguration => new JsonConfigurationParser()
```
