import { permissions } from './constants';

export default function hasPermissions(moduleName: string, role: string, permissionType: string): boolean {
  for (let i = 0; i < permissions[moduleName][permissionType].length; i++) {
    if (permissions[moduleName][permissionType][i] === (role)) {
      return true;
    }
  }
  return false;
}
