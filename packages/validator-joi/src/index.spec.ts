import { joiConfigurationValidator, validatorName } from './index'
import * as Joi from 'joi'

it('pass', function () {
    const v = validatorName
    joiConfigurationValidator(Joi.object({}))
})
