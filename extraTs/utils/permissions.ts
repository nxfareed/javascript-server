import { permissions } from './../constants';
export default function hasPermissions(module: string, role: string, permissionType: string): boolean {
    const k = permissions[module];
    const b = k[permissionType];
    return b.some(element => {
        return element === role;
    });
}
// console.log(hasPermissions('getUsers', 'trainer', 'write'));