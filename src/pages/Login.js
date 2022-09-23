import React, { useState, useEffect } from 'react'
import './login.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, signinUser } from '../redux/actions';
import { toast } from 'react-toastify';
const Login = () => {
    let history = useNavigate()
    const [state, setState] = useState({
        email: "",
        password: "",
    })
    let dispatch = useDispatch()
    let { users } = useSelector(state => state.users)
    useEffect(() => {
        dispatch(loadUsers());
    }, [])
    const handleInputChange = (e) => {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
    }
    const { email, password } = state
    const handleLogin = (e) => {
        e.preventDefault()
        let userId
        users.forEach((u) => {
            if (email == u.email && password == u.password) {
                userId = u.id
            }
        })
        dispatch(signinUser(userId))
        if (userId) {
            history(`/home/${userId}`)
        } else {
            toast.error("Invalid Credentials!")
        }
    }
    return (
        <div class="align">
            <div class="grid">
                <form onSubmit={(e) => handleLogin(e)} class="form login">
                    <header class="login__header">
                        <h3 class="login__title">Login</h3>
                    </header>
                    <div class="login__body">
                        <div class="form__field">
                            <input type="email" name='email' placeholder="Email" required onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div class="form__field">
                            <input type="password" name='password' placeholder="Password" required onChange={(e) => handleInputChange(e)} />
                        </div>
                    </div>
                    <footer class="login__footer">
                        <input type="submit" value="Login" />
                        <input type="submit" value="Sign Up" onClick={() => history('/register')} />
                    </footer>
                </form>
            </div>
        </div>
    )
}
export default Login
