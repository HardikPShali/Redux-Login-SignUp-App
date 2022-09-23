import React, { useState } from 'react'
import './login.css'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/actions';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const Register = () => {
    const [state, setState] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        phone: ""
    })
    const buttonClasses = useStyles();
    let history = useNavigate()
    let dispatch = useDispatch()
    const { name, username, email, password, phone } = state
    const [error, setError] = useState("")
    const handleInputChange = (e) => {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addUser(state))
        history('/home')
        setError("")
    }
    return (
        <div class="align">
            <div class="grid">
                <form class="form login" onSubmit={(e) => handleSubmit(e)}>
                    <header class="login__header">
                        <h3 class="login__title">Sign Up</h3>
                    </header>
                    <div class="login__body">
                        <div class="form__field">
                            <input name='name' type="name" placeholder="Name" value={name} onChange={handleInputChange} required />
                        </div>
                        <div class="form__field">
                            <input name='username' type="username" placeholder="Username" value={username} onChange={(e) => handleInputChange(e)} required />
                        </div>
                        <div class="form__field">
                            <input name='email' type="email" placeholder="Email" value={email} onChange={(e) => handleInputChange(e)} required />
                        </div>
                        <div class="form__field">
                            <input name='password' type="password" placeholder="Password" value={password} onChange={(e) => handleInputChange(e)} required />
                        </div>
                        <div class="form__field">
                            <input name='phone' type="phone" placeholder="Phone Number" value={phone} onChange={(e) => handleInputChange(e)} required />
                        </div>
                    </div>
                    <footer class="login__footer">
                        <input type="submit" value="Sign Up" />
                        <div className={buttonClasses.root}>
                            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                <Button color='secondary' onClick={() => history('/')}>Go Back</Button>
                            </ButtonGroup>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default Register
