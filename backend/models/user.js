const db = require("../db");
const bcrypt = require("bcrypt")

const BCRYPT_WORK_FACTOR = 10;

class User{
    static async register(data){
        if(!data.email){
            const err = new Error(
                'Email Address field cannot be blank'
            );
            err.status = 400;
            throw err;
        }
        if(!data.username){
            const err = new Error(
                "Username field cannot be blank"
            );
            err.status = 400;
            throw err;
        };

        if(!data.password){
            const err = new Error(
                "Password field cannot be blank"
            );
            err.status = 400;
            throw err;
        };

        if(data.username.length > 20){
            const err =  new Error(
                "Username cannot exceed 20 characters"
            );
            err.status = 400;
            throw err;
        }

        const duplicateUsernameCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [data.username]
        );

        const duplicateEmailCheck = await db.query(
            `
            SELECT email
            FROM users
            WHERE email = $1
            `,
            [data.email]
        );

        if(duplicateUsernameCheck.rows[0]) {
            const err = new Error(
                `There already exists a user with username '${data.username}`
            );
            err.status = 409;
            throw err;
        }

        if(duplicateEmailCheck.rows[0]){
            const err = new Error(
                "This email address is already in use"
            );
            err.status = 409;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `
            INSERT INTO users
                (username, password, first_name, last_name, email)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING userid, username, first_name, last_name, email
            `,
            [
                data.username,
                hashedPassword,
                data.first_name,
                data.last_name,
                data.email
            ]
        );

        return result.rows;
    };

    static async authenticate(data) {
        if(!data.email){
            const err = new Error(
                'Email Address field cannot be blank'
            );
            err.status = 400;
            throw err;
        }

        if(!data.password){
            const err = new Error(
                "Password field cannot be blank"
            );
            err.status = 400;
            throw err;
        };

        const findUserResults = await db.query(
            `
            SELECT userid,
                    username,
                    password,
                    first_name,
                    last_name,
                    email
            FROM users
            WHERE email = $1
            `,
            [data.email]
        );

        const user = findUserResults.rows[0];

        if(user){
            const isCorrectPassword = await bcrypt.compare(data.password, user.password);
            if(isCorrectPassword) {
                delete user.password;

                return user;
            };
        };

        const invalidPassword = new Error("Invalid Credentials");
        invalidPassword.status = 401;
        throw invalidPassword
    };

    static async addAddress(data){
        const res = await db.query(`
            INSERT INTO addresses
            (streetone, streettwo, city, state, postalcode, country, phonenumber)
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            RETURNING addressid
        `, [data.streetone, data.streettwo, data.city, data.state, data.postalcode, data.country, data.phonenumber]);

        if(res.rows.length === 0){
            let error = new Error('Please check your data');
            error.status = 400;
            throw error
        };

        const restwo = await db.query(`
            INSERT INTO user_addresses
            (userid, addressid)
            VALUES
            ($1, $2)
            RETURNING userid, addressid
        `, [data.userid, res.rows[0].addressid]);

        if(restwo.rows.length === 0){
            let error = new Error('Failure at user_addresses');
            error.status = 400;
            throw error
        }

        let finalResult = {
            status: 201,
            message: "Address added."
        };

        return finalResult;
    }

    static async getAddresses(data){
        const res = await db.query(`
            SELECT *
            FROM user_addresses
            RIGHT JOIN addresses
            ON addresses.addressid = user_addresses.addressid
            WHERE userid = $1
        `, [data.userid]);

        if((res).rows.length === 0){
            return{
                status: 404,
                message: "You have not added any addresses yet."
            };
        };
        return res.rows;
    }
};

module.exports = User;