import React, { useState } from 'react';
import './Home.scss';
import SignIn from './SignIn';
import LogIn from './LogIn';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

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




function Home() {
    const classes = useStyles();
    const [menuItemSelected, setMenuItemSelected] = useState('LogIn');

    let renderSwitch = () => {
        switch (menuItemSelected) {
            case 'SignIn':
                return (<SignIn />)
            case 'LogIn':
                return (<LogIn />)
        }
    }

    return (
        <div className="Home container-fluid">
            <div className="row">
                <div className="col-12 col-md-5 imgLogin">
                    <div className="imgLoginFiltro">
                        <div className="textLogin">
                            <p>Bienvenido a</p>
                            <p>TimeTableManagement</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-7 ">
                    <div className="row menuDisplay" >
                        <div className="col-12" className={classes.root}>
                            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                <Button onClick={() => setMenuItemSelected('LogIn')}>Iniciar sesión</Button>
                                <Button onClick={() => setMenuItemSelected('SignIn')}>Registrarme</Button>
                            </ButtonGroup>
                        </div>
                        <div className="col-12 formDisplay">
                            {renderSwitch()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
