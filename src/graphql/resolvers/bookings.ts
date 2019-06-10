import Booking from '../../models/booking';
import {transformBooking, transformEvent} from './merge';
import Event from '../../models/event';

export default {

    bookings: async (args, req) => {
        try{
            if(!req.isAuth){
                throw new Error('Unauthenticated!');
            }
            let bookings = await Booking.find();
            return bookings.map( booking => {
                return transformBooking(booking);
            });
        }
        catch(err){
            console.log({err});
            throw err;
        }
    },

    bookEvent: async (args, req) => {
        try{
            if(!req.isAuth){
                throw new Error('Unauthenticated!');
            }
            const returnedEvent = await Event.findOne({
                _id: args.eventId
            });
            if(!returnedEvent){
                throw new Error('Event not found.');
            }
            const booking = await new Booking({
                user: req.userId,
                event: returnedEvent
            });
            const result = await booking.save();
            return transformBooking(result);
        }
        catch (err){
            console.log({err});
            throw err;
        }          
    },
    cancelBooking: async (args, req) => {
        try{
            if(!req.isAuth){
                throw new Error('Unauthenticated!');
            }
            const booking = await Booking.findById(args.bookingId).populate('event');
            if(!booking){
                throw new Error('Booking not found.');
            }

            await Booking.deleteOne({
                _id: args.bookingId
            });
            return transformEvent(booking.event);;
        }
        catch (err){
            console.log({err});
            throw err;
        }          
    },
}