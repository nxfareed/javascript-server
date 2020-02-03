import { diamond } from './patterns/index'
import { equilateral } from './patterns/index'
import { hasPermissions, validateUser } from './utils/index';
import { users } from './constants';

diamond(5);
equilateral(4);
console.log(hasPermissions("getUsers", 'trainee', 'read'))
validateUser(users)
