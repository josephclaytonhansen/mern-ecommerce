import bcrypt from 'bcryptjs'

const Users = [
    {name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: true
},
{name: 'John User',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: false
},
{name: 'Jane User',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: false
}

]

export default Users