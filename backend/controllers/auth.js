const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Account = require("../models/account");

exports.login = (req, res, next) => {
    let authorizedAccount;
    Account.findOne({ email: req.body.email})
    .then (acc => {
        if(!acc) {
            return res.status(401).json({
                message: "Niepoprawne dane"
            });
        }
        authorizedAccount = acc;
        return bcrypt.compare(req.body.password, acc.password);
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: "niepoprawne dane"
            });
        }
        const token = jwt.sign(
            {
                firstName: authorizedAccount.firstName,
                lastName: authorizedAccount.lastName,
                loginTime: new Date()
            },
            "secret",
            {
                expiresIn: "30min"
            });
    const newSession = {
        accId: authorizedAccount._id,
        token: token
    }
    newSession.save();
    res.status(200).json({
        token: token,
        id: authorizedAccount._id,
        email: authorizedAccount.email
    });
    })
    .catch(err => {
        res.status(500).json({
            message: "Wew. bd serwera"
        });
    });
}