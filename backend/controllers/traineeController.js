import Trainee from '../models/traineeModel.js';

export const addIndTrainee = (req, res) => {
    const trainee = new Trainee(req.body)
    trainee.save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
}