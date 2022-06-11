import { API } from '../../backend';

export const signUp = ({ name, email, password }) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then((res) => { return res.json(); })
        .catch((err) => {console.log('Error', err);})
}
export const signin = ({ email, password }) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => { return res.json(); })
        .catch((err) => {console.log("Error", err);})
}
export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else {
        return false;
    }
}
// NOT DONE YET 


export const authenticate = (data, next) => {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
}


export const signout = (next,token) => {
      return   fetch(`${API}/signout`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => { return (next() || res.json())  })
        .catch((err) => { console.log(err) })
}


