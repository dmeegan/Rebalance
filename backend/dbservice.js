const mysql = require('mysql');
const dotenv = require('dotenv');
const { response } = require('express');
let instance = null;

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

db.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection failed" + err.message);
    }
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    // async getPortfolio() {
    //     try {
    //         const response = await new Promise((resolve, reject)) => {
    //             const query = "SELECT * FROM " //not completed//
    //         }

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    async registerUser(first_name, last_name, email, password) {
        try {
            const response = await new Promise((resolve, reject) => {
                const checkIfUserExists = "SELECT * FROM users WHERE email = ?";
                db.query(checkIfUserExists, email, (err, result) => {
                    if (result.length > 0) {
                        reject(new Error('Email already exists in database')) 
                    } else {
                    const addUserToDatabase = "INSERT IGNORE INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)";
                        db.query(addUserToDatabase, [first_name, last_name, email, password], (err, result) => {
                            if (err) reject(new Error(err.message));
                            resolve('User registered successfully');
                        })
                    }
                })
            })
            return response;
        } catch (err) {
            console.log(err);
        }
    };
};

module.exports = DbService;