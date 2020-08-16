//utility functions use throughout application

//rename to utility?
export const utility = {
    checkStatus,
    json
}

function checkStatus(response) {        
    if (!response.ok) {
        //false
        if (response.status !== 401 && response.status !== 400) {
                throw new Error(response.status + " " + response.statusText);  
        }
    }
    return  Promise.resolve(response);
}

function json(response) {
    return response.json()
}


/*
function checkStatus(response) {        
    if (!response.ok) {
        //false
        if (response.status !== 401 && response.status !== 400) {
                throw new Error(response.status + " " + response.statusText);  
        }
    }
    return  Promise.resolve(response);
}

function json(response) {
    return response.json()
}

*/