const express = require("express");
const router = express.Router();

const {authRequired, ensureCorrectUser} = require("../middleware/auth")

const User = require("../models/user");
const { validate } = require("jsonschema");

const {userNewSchema, userAuthSchema, userAddressNewSchema} = require("../schemas/index");

const createToken = require("../helpers/createToken")

router.post("/register", async (req, res, next) =>{
    try{
        if(req.body._token){
            delete req.body._token
        }
        const isValid = validate(req.body, userNewSchema);

        if(!isValid.valid){
            return next({
                status: 400,
                message: isValid.errors.map(e => e.stack)
            });
        };

        const newUser = await User.register(req.body);
        const token = createToken(newUser);
        newUser[0]._token = token;
        return res.status(201).json(newUser[0]);
    }catch(e){
        return next(e)
    }
});

router.post("/login", async (req, res, next) => {
    try{
        const isValid = validate(req.body, userAuthSchema);

        if(!isValid.valid){
            return next({
                status: 400,
                message: isValid.errors.map(e => e.stack)
            });
        };

        const user = await User.authenticate(req.body);
        const token = createToken(user);
        user._token = token;

        return res.status(200).json(user)
    }catch(e){
        return next(e)
    }
});

router.get('/:userid/addresses', authRequired, ensureCorrectUser, async (req, res, next) => {
    try{
        const addresses = await User.getAddresses(req.body.userid || req.query.userid)
        return res.json(addresses)
        
    }catch(e){
        return next(e);
    };
});

router.post('/:userid/addresses', authRequired, ensureCorrectUser, async (req, res, next) => {
    try{
        let addressToValidate = req.body.address;
        
        const isValid = validate(addressToValidate, userAddressNewSchema)
        if(!isValid.valid){
            return next({
                status: 400,
                message: isValid.errors.map(e => e.stack)
            });
        };

        const address = {
            streetone: req.body.address.streetone,
            streettwo: req.body.address.streettwo,
            city: req.body.address.city,
            state: req.body.address.state,
            postalcode: req.body.address.postalcode,
            country: req.body.address.country,
            phonenumber: req.body.address.phonenumber
        };
        const addressres = await User.addAddress({userid: req.body.userid, ...address})

        return res.json(addressres)
    }catch(e){
        return next(e)
    };
});

module.exports = router;