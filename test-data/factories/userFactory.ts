import { faker } from "@faker-js/faker";

export class UserFactory {
    static createUser() {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: 'Password@123',
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            address: faker.location.streetAddress(),
            country: 'India',
            state: 'Karnataka',
            city: 'Bangalore',
            zipCode: '560066',
            mobileNumber: '9876543210'
        };
    }
}