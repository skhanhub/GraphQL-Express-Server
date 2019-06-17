import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import User, { IUser } from '../../models/user';
import configs from '../../config';


const app = express();
const config = configs[app.get('env')];



export default {

    createUser: async (args) => {
        try{
            const result = await User.findOne({email: args.userInput.email});
            if(result){
                throw new Error('User already exists.')
            }
            console.log(args.userInput.email);
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
            });  
            const savedUser = await user.save();
            return ({email: savedUser.email, password: null, _id: savedUser.id});
        }
        catch (err){
            console.log({err});
            throw err;
        }          
    },
    
    login: async (args) => {
        try{
            const user = await User.findOne({email: args.email});
            if(!user){
                throw new Error('User does not exist!')
            }
            const isEqual = await bcrypt.compare(args.password, user.password);
            if(!isEqual){
                throw new Error('Password is incorrect!');
            }
            const token = await jwt.sign({
                userId: user.id,
                email: user.email,
            }, 
            `${config.SECRECT}`,
            {
                expiresIn: '1h'
            });
            return {
                userId: user.id,
                token: token,
                tokenExpiration: 1,
            }
        }
        catch (err){
            console.log({err});
            throw err;
        }          
    },
}