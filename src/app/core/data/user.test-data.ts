import { User } from "../models/user.model";

export const USERDATA: User = {
    id: 1,
    name: 'Omar',
    phone: '999999',
    username: 'OmarElkholy',
    website: 'www.test.com',
    address: {
        city: 'Cairo',
        geo: {
            lat: 'test',
            lng: 'test'
        },
        street: 'test',
        suite: 'test',
        zipcode: 'test',
    },
    company: {
        bs: 'test',
        catchPhrase: 'test',
        name: 'Vodafone'
    },
    email: 'omaralkholy2021@gmail.com'
}
