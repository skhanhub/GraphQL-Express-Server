
import dateToString from '../../helpers/date';
import User from '../../models/user';
import Event from '../../models/event';

export const transformBooking = booking => {
    return {
        ...booking.toObject(),
        user: getUser.bind(this, booking.user),
        event: getSingleEvent.bind(this, booking.event),
        createdAt: dateToString(booking.createdAt),
        updatedAt: dateToString(booking.updatedAt),
    }
}

export const transformEvent = event => {
    return {
        ...event.toObject(),
        date: dateToString(event.date),
        creator: getUser.bind(this, event.creator)
    }
}

export const getUser = async userId => {
    try{
        let user = await User.findById(userId);
        return {
            ...user.toObject(),
            createdEvents: getEvents.bind(this, user.createdEvents)
        };
    }    
    catch (err){
        console.log({err});
        throw err;
    } 
}

export const getEvents = async eventIds => {
    try{
        let events = await Event.find({_id: {$in: eventIds}});
        let result = events.map(event => {
            return transformEvent(event);
        })
        return result;
    }    
    catch (err){
        console.log({err});
        throw err;
    }    
}

export const getSingleEvent = async eventId => {
    try{
        const event = await Event.findById(eventId);
        return transformEvent(event);
    }
    catch (err){
        console.log({err});
        throw err;
    } 
}