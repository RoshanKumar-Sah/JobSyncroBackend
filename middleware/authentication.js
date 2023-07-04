const jwt = require('jsonwebtoken');


const authentication = (key) => {
    return (req, res, next) => {

        // console.log(req.headers.authorization);

        if (req.headers.authorization) {


            let token = req.headers.authorization.split(" ")[1]
            // console.log(token);

            if (token) {
                try {
                    const decoded = jwt.verify(token, key);
                    req.user = decoded

                    return next()
                } catch (err) {

                }

            }




        }

        res.status(401).send({ msg: "unauthenticated" })


    }
}

module.exports = {
    authentication
}