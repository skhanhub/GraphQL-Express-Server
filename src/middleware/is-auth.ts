import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import configs from '../config';


const app = express();
const config = configs[app.get('env')];
console.log(config.SECRECT)

export default (req, res, next) => {
    try{
        const authHeader = req.get('Authorization');
        if(!authHeader){
            req.isAuth = false;
            return next();
        }
        const token = authHeader.split(' ')[1]; // Authorization: Bearer tokenValue
        if(!token || token === ''){
            req.isAuth = false;
            return next();
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, `${config.SECRECT}`);
        }
        catch(err){
            console.log(err);
            req.isAuth = false;
            return next();
        }
        if(!decodedToken){
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();
    }
    catch(err){
        console.log(err);
        throw err;
    }
}