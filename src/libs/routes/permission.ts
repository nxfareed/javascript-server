import { permissions } from './constantsTrn';
export default function hasPermissions(moduleName: string, role: string, permissionType: string): boolean {

    for (let i = 0; i < permissions[moduleName][permissionType].length; i++) {
        if (permissions[moduleName][permissionType][i]===(role)) {
            return true;
        }
    }
    return false;
}  









/*import { permissions } from './constantsTrn';
import { IgetUsers } from "../../../extraTs/interfaces";
function hasPermissions(modul: string, role: string, permissionType: string) {
const m = permissions[modul];
let k: any = m[permissionType];
return k.some(element => {
return element === role;
});
}
export default hasPermissions ;*/