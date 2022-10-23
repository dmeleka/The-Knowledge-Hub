import User from '../models/userModel.js';

export const getUser = async (req, res) => {
    try {
        const user = await User.find();
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = (req, res) => {
    const user = new User({
        FirstName: "firstname",
        LastName: "lastname",
        Email: "email",
        Gender: "gender",
        UserName: "username",
        Password: "password",
    })
    user.save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
}