export default (config) => {
    return (req, res, next) => {
        const arr: string[] = [];
        Object.keys(config).forEach(key => {
            // Checks the entered key for validations
            if (config[key].in) {
                config[key].in.forEach(location => {
                    console.log(req[location]);
                    let keyValue = req[location][key];
                    const values = Object.keys(req[location]);

                    // If Body has this key, it is Presented
                    if (config[key].required && !req[location][key]) {

                        arr.push(`${key} is requird`);
                    }
                    // Check for the string
                    if (config[key].string && typeof (req[location][key]) !== 'string') {
                        arr.push(`${key} should be String`);
                    }
                    // Check For Skip and limit
                    if (config[key].number && typeof (req[location][key] !== 'number')) {
                        if (values.includes(key)) {
                            if (!keyValue && config[key].default) {
                                keyValue = config[key].default;
                            }
                            if (isNaN(req[location][key])) {
                                arr.push(`${key} should be number`);
                            }
                        }
                        else {
                            arr.push(`${key} should be Valid`);
                        }
                    }
                    if (config[key].regex) {
                        const regexString = new RegExp(config[key].regex);
                        if (!regexString.test(keyValue)) {
                            arr.push(`Invalid ${key}`);
                        }
                    }
                    // If Key contains isObject, Checks the Object and is retrived from Body
                    if (config[key].isObject && !(typeof req[location][key] === 'object')) {
                        arr.push('Data is required of type object');
                    }
                    // If key Contains Custom function
                    if (config[key].custom) {
                        try {
                            config[key].custom(req[location][key]);
                        }
                        catch (err) {
                            console.log("sd0f0000000s", err.error)
                            arr.push(err.error);
                        }
                    }

                });
            }
        });
        arr.length ? next({ arr }) : next();
    };
};
