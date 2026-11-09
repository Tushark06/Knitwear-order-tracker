const API = 'http://localhost:5000/api';
export const getToken = () => localStorage.getItem('token');
export const saveToken = (token) => localStorage.setItem('token', token);
export const clearToken = () => localStorage.removeItem('token');

export async function callApi(path, method = 'GET', body){
    const res = await fetch(API + path, {
        method,
        headers: {
            'Content-Type':'application/json',
            Authorization:'Bearer ' + getToken(),
        },
        body:body ? JSON.stringify(body): undefined,
    });

    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message || 'Request failed');
    }
    return data;
}