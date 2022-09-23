import * as types from './actionType'
import axios from 'axios';
const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

const userDeleted = () => ({
    type: types.DELETE_USERS
})
const userAdded = () => ({
    type: types.ADD_USER
})
const userUpdated = () => ({
    type: types.UPDATE_USER
})
const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user
})
const logOutUser = () => ({
    type: types.LOGOUT_USER,
})
const loginUser = (user) => ({
    type: types.LOGIN,
    payload: user
})

export const loadUsers = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`).then((resp) => {
            console.log("Data", resp);
            dispatch(getUsers(resp.data))
        })
            .catch((error) => console.log(error))
    }
}

export const deleteUser = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            console.log("Data", resp);
            dispatch(userDeleted())
            dispatch(loadUsers())
        })
            .catch((error) => console.log(error))
    }
}
export const addUser = (user) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`, user).then((resp) => {
            console.log("Data", resp);
            dispatch(userAdded())
        })
            .catch((error) => console.log(error))
    }
}

export const getSingleUser = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            console.log("Data", resp);
            dispatch(getUser(resp.data))
        })
            .catch((error) => console.log(error))
    }
}
export const updateUser = (id, user) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API}/${id}`, user).then((resp) => {
            console.log("Data", resp);
            dispatch(userUpdated())
            dispatch(loadUsers())
        })
            .catch((error) => console.log(error))
    }
}
export const logoutUser = () => {
    return function (dispatch) {
        dispatch(logOutUser())
    }
}
export const signinUser = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            console.log("Login-Data", resp);
            dispatch(loginUser(resp.data))
        })
            .catch((error) => console.log(error))
    }
}