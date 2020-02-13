import { permissions } from './constantsTrn';
export default function hasPermissions(moduleName: string, role: string, permissionType: string): boolean {

    for (let i = 0; i < permissions[moduleName][permissionType].length; i++) {
        if (permissions[moduleName][permissionType][i].match(role)) {
            return true;
        }
    }
    return false;
}  