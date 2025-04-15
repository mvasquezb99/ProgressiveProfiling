import { userFormat } from './userFormats';

/**
 * 
 * @param {string} method selected by the admin. 
 * @param {string} endpoint selected by the admin.
 * @returns {object || object[]} format to show the admin how the data should be filled.
 * 
 * !! Change the format if it isn't equal to what the DTO is expecting.
 */
export const getFormat = (method, endpoint) => {
    if (method === 'POST') {
        if (endpoint.indexOf('admin/users') !== -1) {
            if (endpoint.indexOf('/single') !== -1 || endpoint.indexOf('/relate') !== -1) {
                return userFormat;
            } else {
                return [userFormat];
            }
        }

        if (endpoint.indexOf('admin/occupations') !== -1) {
            if (endpoint.indexOf('/single') !== -1) {
                return { name: '' };
            } else {
                return [{ name: '' }];
            }
        }

        if (endpoint.indexOf('admin/categories') !== -1) {
            if (endpoint.indexOf('/single') !== -1 || endpoint.indexOf('/relate') !== -1) {
                return { name: '' };
            } else {
                return [{ name: '' }];
            }
        }
    } else if (method === 'DELETE') {
        return { name: '' }
    } else if (method === 'PUT') {
        return userFormat;
    } else {
        return {};
    }
}

export const getHint = (method, endpoint) => {
    if (method === 'GET') {
        if (endpoint.indexOf('admin/users') !== -1) {
            return "Add the param `name` with the username you want to search"
        } else if (endpoint.indexOf('admin/occupations') !== -1) {
            if (endpoint.indexOf('/single')) {
                return "Add the param `name` with the occuaption name you want to search"
            } else {
                return "Search all occupations"
            }
        } else if (endpoint.indexOf('admin/categories') !== -1) {
            if (endpoint.indexOf('/single')) {
                return "Add the param `name` with the category name you want to search"
            } else {
                return "Search all categories"
            }
        } else {
            return "Search all users"
        }
    } else if (method === 'POST') {
        if (endpoint.indexOf('admin/users') !== -1) {
            if (endpoint.indexOf('/single') !== -1) {
                return "Fill the JSON or use the form to create a new user";
            } else if (endpoint.indexOf('/relate') !== -1) {
                return "Add the param `name` and fill the JSON to relate an existing user";
            } else {
                return "Fill the JSON to create many users, you can add the ammount you need";
            }
        }

        if (endpoint.indexOf('admin/occupations') !== -1) {
            if (endpoint.indexOf('/single') !== -1) {
                return "Fill the JSON to create a new occupation";
            } else {
                return "Fill the JSON to create many occupations";
            }
        }

        if (endpoint.indexOf('admin/categories') !== -1) {
            if (endpoint.indexOf('/single') !== -1 || endpoint.indexOf('/relate') !== -1) {
                return "Fill the JSON to create a new category";
            } else {
                return "Fill the JSON to create many categories";
            }
        }
    } else if (method === 'PUT') {
        return "Fill the JSON to update an existing user"
    } else if (method === 'DELETE') {
        if (endpoint.indexOf('admin/users') !== -1) {
            return "Add the param `name` with the name of the user you want to delete"
        } else if (endpoint.indexOf('admin/occupations') !== -1) {
            return "Add the param `name` with the name of the occupation you want to delete"
        } else if (endpoint.indexOf('admin/categories') !== -1) {
            return "Add the param `name` with the name of the category you want to delete"
        }
    }
}
