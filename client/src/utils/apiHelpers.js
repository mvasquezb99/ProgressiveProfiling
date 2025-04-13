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
                return { name: 'occupation' };
            } else {
                return [{ name: 'occupation ' }];
            }
        }

        if (endpoint.indexOf('admin/categories') !== -1) {
            if (endpoint.indexOf('/single') !== -1 || endpoint.indexOf('/relate') !== -1) {
                return { name: 'category' };
            } else {
                return [{ name: 'category' }];
            }
        }
    } else if (method === 'DELETE') {
        return { name: '' }
    } else {
        return {};
    }
}