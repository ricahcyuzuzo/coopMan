export const createUser = (req) => {
    const user = {
        cooperative: req.body.cooperative,
        email: req.body.email,
        password: req.body.password,
    }

    return user;
}
