
const apiPath = 'http://fitnesstrac-kr.herokuapp.com/api/';

export const registerUser = async (username, password) => {
    const body = {
        username,
        password,
    };
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    try{
        const fetchResult = await fetch(`${apiPath}users/register`, config);
        const json = fetchResult.json();
        return json;
    } catch(error) {
        throw(error);
    };
};

export const loginUser = async (username, password) => {
    const body = {
        username,
        password,
    };
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    try{
       const fetchResult = await fetch(`${apiPath}users/login`, config);
        const json = fetchResult.json();
        return json; 
    } catch (error) {
        throw(error);
    };
};