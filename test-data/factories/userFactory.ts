import { faker } from "@faker-js/faker";
import { User } from "../interfaces/user";

export class UserFactory {
    static createUser():User {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: 'Password@123',
            company: faker.company.name(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: 'India',
            state: 'Karnataka',
            city: 'Bangalore',
            zipCode: '560066',
            mobileNumber: '9876543210',
            day: "1",
            month: "1",
            year: "2000"
        };
    }
}