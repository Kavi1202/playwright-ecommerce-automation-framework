import { faker } from '@faker-js/faker';
import { User } from './interfaces/user';

export const userData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'Password@123'
};

export const registeredUser: User = {
    name: 'Kaviraj',
    email: 'kaviraj.playwright@example.com',
    password: 'Password@123',

    firstName: 'Kaviraj',
    lastName: 'P',
    company: 'TCS',

    address1: '123 Main Street',
    address2: '',

    country: 'India',
    state: 'Tamil Nadu',
    city: 'Coimbatore',

    zipCode: '641001',

    mobileNumber: '9876543210',

    day: '1',
    month: '1',
    year: '2000'
}