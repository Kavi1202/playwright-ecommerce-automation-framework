import { faker } from '@faker-js/faker';

export const userData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'Password@123'
};