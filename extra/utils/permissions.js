let permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read:['trainee', 'trainer'],
        write: ['trainer'],delete: []
    }
};
function hasPermissions(module, role, permissionType)  {
    let k = permissions[module];
    let b = k[permissionType];
    return b.some(element =>{
        return element == role;
    });
}
console.log(hasPermissions('getUsers', 'trainer', 'write'));