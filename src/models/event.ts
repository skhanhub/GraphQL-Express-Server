import * as mongoose from 'mongoose';
import { IUser } from './user';

export interface IEvent extends mongoose.Document {
    title: string;
    description: string;
    price: Number;
    date: Date;
    creator: IUser['_id'];
}

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

export default mongoose.model<IEvent>('Event', eventSchema);
