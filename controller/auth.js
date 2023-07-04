const User = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {

    // console.log(JSON.stringify(req.body));
    // console.log(req.body);
    try {
        let hashed = await bcrypt.hash(req.body.password, 9);
        // console.log(hashed);
        let createUser = await User.create({ ...req.body, password: hashed })

        let temp = { ...createUser.toObject() }
        delete temp.password
        res.send(temp)
    } catch (err) {
        next(err)
    }
}


const login = async (req, res, next) => {

    console.log(req.body);


    try {
        let data = { ...req.body }
        let findEmail = await User.findOne({ email: data.email })
        if (findEmail) {
            let hashed_pw = findEmail.password
            // console.log(hashed_pw);
            let match_pw = await bcrypt.compare(data.password, hashed_pw);

            if (match_pw) {
                let temp = { ...findEmail.toObject() }
                delete temp.password
                var token = jwt.sign(temp, process.env.JWT_SECRET_KEY);
                // console.log(token);
                temp = { ...temp, access_token: token }
                return res.send(temp)
            }

        }
        res.status(401).send({ msg: "Invalid Credentials" })

    } catch (err) {
next(err)
    }

}

module.exports = {
    signup,
    login
}