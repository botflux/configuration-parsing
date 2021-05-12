import {validators} from './ConfigurationValidators'
import * as Joi from 'joi'

it('pass', function () {
    validators.joi(Joi.object())
})
