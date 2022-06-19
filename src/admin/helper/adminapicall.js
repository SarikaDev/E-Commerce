import { API } from '../../backend';

//Create a category  => 'C'RUD

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category)
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })

}


// get a Single Category C'R'UD 

export const getSingleCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

//get all categories C'R'UD

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

// update category CR'U'D

export const updateCategory = (category, categoryId, userId, token) => fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
}).then((res) => { return res.json(); })
    .catch((err) => { console.log(err); })


// delete a Category CRU'D'

export const deleteCategory = (userId, token, categoryId) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}





// Products  'C'RUD

export const createSingleProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: product
    })
        .then((res) => { return res.json(res) })
        .catch((err) => { console.log(err) })
}

// Get All Products =>  C'R'UD

export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

// Get Single Product => C'R'UD

export const getSingleProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

// Get product Images => C'R'UD

export const productImage = (productId) => {
    return fetch(`${API}/product/photo/${productId}`, {
        method: 'GET'
    }).then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

//Update a Product => CR'U'D

export const updateProduct = (userId, token, productId, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}


// Delete a Product => CRU'D'

export const deleteProduct = (userId, token, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

//Get all Orders  => C'R'UD

export const getAllOrders = (userId, token) => {
    return fetch(`${API}/order/all/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}
//Get  OrdersStatus  => C'R'UD

export const getAllOrderStatus = (userId, token) => {
    return fetch(`${API}/order/status/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

//Create   Orders  => 'C'RUD

export const createSingleOrder = (userId, token, order) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order)
    })
        .then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}


//USer =>  C'R'UD

export const RetriveProfile = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const RetriveOrders = (userId, token) => {
    return fetch(`${API}/orders/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((res) => { return res.json() })
        .catch((err) => { console.log(err) })
}

export const editOrderStatus = (userId, token, orderId, orderStatus) => fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: 'PATCH',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: orderStatus
}).then((res) => { return res.json(); })
    .catch((err) => { console.log(err); })


//NOTE : get method   => NO Body & NO Header
//NOTE : delete method    => NO Body 



export const editUserName = (userId, token, name) => fetch(`${API}/user/${userId}`, {
    method: 'PUT',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify( name )
}).then((res) => { return res.json(); })
    .catch((err) => { console.log(err); })