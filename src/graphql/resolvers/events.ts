import {transformEvent} from './merge';
import dateToString from '../../helpers/date';
import Event from '../../models/event';
import User from '../../models/user';


export default {
    events: async () => {
        try{
            let events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        }
        catch (err){
            console.log({err});
            throw err;
        } 
    },
    createEvent: async (args, req) => {
        try{
            if(!req.isAuth){
                throw new Error('Unauthenticated!');
            }
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: dateToString(args.eventInput.date),
                creator: req.userId,
            });
            let result = await event.save();
            let user = await User.findById(req.userId);
            if(!user){
                throw new Error('User not found.');
            }
            user.createdEvents.push(event._id)
            await user.save()
            return transformEvent(result);
        }
        catch (err){
            console.log({err});
            throw err;
        } 
    },
}
    