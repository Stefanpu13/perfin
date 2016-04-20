/**
 * Created by stefan.uzunov on 4/19/2016.
 */

module.exports = {
    checkStatus:(response) => {
        if (!response.status || (response.status && response.status >= 200 && response.status < 300)) {
            return response
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
};