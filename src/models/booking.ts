import * as mongoose from 'mongoose';
import { IUser } from './user';
import { IEvent } from './event';

export interface IBooking extends mongoose.Document {
    user: IUser['_id'];
    event: IEvent['_id'];
    createdAt: Date;
    updatedAt: Date;
}

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        }
    }, 
    {
        timestamps: true,
    }
);

export default mongoose.model<IBooking>('Booking', bookingSchema);
