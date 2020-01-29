import {permissions} from './../constants';
export default function hasPermissions(module, role, permissionType)  {
    let k = permissions[module];
    let b = k[permissionType];
    return b.some(element =>{
        return element == role;
    });
}
//console.log(hasPermissions('getUsers', 'trainer', 'write'));