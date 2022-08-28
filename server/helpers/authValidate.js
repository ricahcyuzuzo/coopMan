import Joi from 'joi';

export const validateSignup = (user) => {
    const schema = Joi.object().keys({
        cooperative: Joi.string().min(2).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(user);

}
