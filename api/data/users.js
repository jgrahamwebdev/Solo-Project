
import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Mark Davis',
        email: 'mark@email.com',
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'James Michaels',
        email: 'james@email.com',
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Bob Bobberson',
        email: 'Bob@email.com',
        password: bcrypt.hashSync('password', 10)
    }
]

export default users