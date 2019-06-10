import auth from './auth';
import events from './events';
import bookings from './bookings';

export default {
    ...auth,
    ...events,
    ...bookings,
}
    