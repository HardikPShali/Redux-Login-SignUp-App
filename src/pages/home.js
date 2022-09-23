import { React } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { deleteUser, loadUsers, logoutUser, getSingleUser } from '../redux/actions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useNavigate, useParams } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        marginTop: 100,
        minWidth: 700,
    },
});
const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Home = () => {
    const classes = useStyles();
    const buttonClasses = useButtonStyles();
    let dispatch = useDispatch()
    let { id } = useParams()
    const { user } = useSelector(state => state.users)
    useEffect(() => {
        dispatch(getSingleUser(id));
    }, [])
    let history = useNavigate()
    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteUser(id))
        }
    }
    const handleLogout = () => {
        dispatch(logoutUser())
        history('/')
    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Username</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Phone</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user && 
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.username}</StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.phone}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className={buttonClasses.root}>
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                            <Button style={{ marginRight: '5px' }} color='secondary' onClick={() => handleDelete(user.id)}>Delete</Button>
                                            <Button color='primary' onClick={(e) => history(`/editUser/${user.id}`)}>Edit</Button>
                                        </ButtonGroup>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={buttonClasses.root}>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button color='secondary' onClick={() => handleLogout()}>Logout</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default Home;
