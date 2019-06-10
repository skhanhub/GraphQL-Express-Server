import * as mongoose from 'mongoose';
import { IEvent } from './event';

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    createdEvents: Array<IEvent['_id']>;
}

const userSchema: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        }
    ]
});

export default mongoose.model<IUser>('User', userSchema);
