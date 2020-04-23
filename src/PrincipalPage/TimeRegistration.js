import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import MyContext from '../context';
import './TimeRegistration.scss';


function TimeRegistration() {

    //Material UI styles
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        button: {
            margin: theme.spacing(1),
        },
    }));

    //Clock Icon
    const clock = <FontAwesomeIcon icon={faClock} size="fa-3x" color="#3F51B5" />

    //------START STATE:------
    const contextInfo = useContext(MyContext); //Global Context

    //To get actual minutes and seconds
    let date = new Date();

    const [timeTable, setTimeTable] = useState({
        startWorkHours: date.getHours(),
        startWorkMinutes: date.getMinutes(),
        startPauseHours: 0,
        startPauseMinutes: 0,
        stopPauseHours: 0,
        stopPauseMinutes: 0,
        stopWorkHours: 0,
        stopWorkMinutes: 0
    })
    //------END STATE:------

    //Copy the timeTable state to the context every time that this state change
    let updateComponentToContext = () => {
        contextInfo.setHooksState({ ...contextInfo.hooksState, timeTable })
    }
    useEffect(() => { updateComponentToContext() }, [timeTable]);
    const classes = useStyles();

    //Button on submit
    let submitInfo = () => {
        console.log('Formulario enviado')
    }

    return (
        <div className="container-fluid timeRegistration">
            <div className="row alignItems">
                <div className="clockIcon">{clock}</div>
                <h5>GESTIÓN DE HORAS:</h5>
            </div>

            <div className="row timeForm">
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => submitInfo(event)} style={{ display: "flex" }}>
                    <div className="col">
                        <InputLabel htmlFor="Hora de entrada:">Hora de entrada:</InputLabel>
                    </div>
                    <div className="col">
                        <TextField
                            id="outlined-helperText"
                            label="Hora"
                            defaultValue={timeTable.startWorkHours}
                            variant="outlined"
                            onChange={(event) => setTimeTable({ ...timeTable, startWorkHours: event.target.value })} required />
                    </div>
                    <div className="col">
                        <TextField
                            id="outlined-helperText"
                            label="Minutos"
                            defaultValue={timeTable.startWorkMinutes}
                            variant="outlined"
                            onChange={(event) => setTimeTable({ ...timeTable, startWorkMinutes: event.target.value })} required />
                    </div>

                    {/* 
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                    >
                        Enviar
                    </Button> */}
                </form>
            </div>
        </div>
    );
}

export default TimeRegistration;