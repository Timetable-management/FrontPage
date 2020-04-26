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
import { faClock, faTrashAlt, faBriefcase, faMugHot, faHome } from '@fortawesome/free-solid-svg-icons';
import MyContext from '../context';
import './TimeRegistration.scss';
import PropTypes from 'prop-types'


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
    const classes = useStyles(); //MaterialUI classes
    const clock = <FontAwesomeIcon icon={faClock} size="3x" color="#3F51B5" /> //Clock Icon
    const trash = <FontAwesomeIcon icon={faTrashAlt} size="md" color="rgb(172, 24, 36)" /> //Trash Icon
    const startWork = <FontAwesomeIcon icon={faBriefcase} size="md" color="#9573DA" /> //StartWork Icon
    const pause = <FontAwesomeIcon icon={faMugHot} size="md" color="#73DAC9" /> //Pause Icon
    const finishWork = <FontAwesomeIcon icon={faHome} size="md" color="#DA7373" /> //FinishWork Icon

    const contextInfo = useContext(MyContext); //Global Context

    //GLOBAL Cases Types
    const type = Object.freeze({
        Hora_de_entrada: 0,
        Hora_de_salida: 1,
        Hora_de_inicio_de_pausa: 2,
        Hora_de_final_de_pausa: 3
    })
    //Translation cases
    const typeToString = (type) => {
        switch (type) {
            case 0:
                return 'Hora de entrada';
            case 1:
                return 'Hora de salida';
            case 2:
                return 'Hora de inicio de pausa';
            case 3:
                return 'Hora de final de pausa';
        }
    }

    //Decide wich icon show
    const iconType= (type) => {
        switch (type) {
            case 0:
                return startWork;
            case 1:
                return finishWork;
            case 2:
                return pause;
            case 3:
                return startWork;
        }
    }

    //Depending on the Type, Paint diferents buttons. Each button have it own function
    const buttonCase = (type) => {
        switch (type) {
            case 0:
                return (
                    <div>
                        <button onClick={() => startPause()}>Inicio de pausa</button>
                        <button onClick={() => endWork()}>Fin de trabajo</button>
                    </div>
                )
            case 2:
                return (
                    <button onClick={() => endPause()}>Fin de pausa</button>
                )
            case 3:
                return (
                    <div>
                        <button onClick={() => startPause()}>Inicio de pausa</button>
                        <button onClick={() => endWork()}>Fin de trabajo</button>
                    </div>
                )
        }
    }
    //BUTTONS FUNCTIONS 
    //Button on startWork
    let startWorking = () => {
        setTimeTable([...timeTable, {
            type: type.Hora_de_entrada,
            dateTime: date
        }])
    }
    let startPause = () => {
        setTimeTable([...timeTable, {
            type: type.Hora_de_inicio_de_pausa,
            dateTime: date
        }])
    }
    let endWork = () => {
        setTimeTable([...timeTable, {
            type: type.Hora_de_salida,
            dateTime: date
        }])
    }
    let endPause = () => {
        setTimeTable([...timeTable, {
            type: type.Hora_de_final_de_pausa,
            dateTime: date
        }])
    }

    let date = new Date();//To get actual minutes and seconds
    //Here we are going to push the input registers --> CONTEXT
    const [timeTable, setTimeTable] = useState([

    ])
    //Copy the timeTable state to the context every time that this state change
    let updateComponentToContext = () => {
        contextInfo.setHooksState({ ...contextInfo.hooksState, timeTable })
    }
    useEffect(() => { updateComponentToContext() }, [timeTable]);

    //Edit time -> Function to change the hours of an input
    let changeHours = (hourValue, index) => {
        let array = [...timeTable];
        array[index].dateTime.setHours(hourValue);
        return array;
    }
    //Edit time -> Function to change the minutes of an input
    let changeMinutes = (minuteValue, index) => {
        let array = [...timeTable];
        array[index].dateTime.setMinutes(minuteValue);
        return array;
    }

    //Function to display the button trash depending on the input type
    let showTrashButton = (type) => {
        if (timeTable.length > 1 && type !== 3 && type !== 0) {
            return trash;
        }
        if(timeTable.length === 1){
            return trash;
        }
    }

    //Function to delete input rows when click the trash button
    let deleteInput = (type, index) => {
        let array = [...timeTable];
        if (type !== 2) {
            array.splice(index, 1);
        } else {
            array.splice(index, 2);
        }
        return array;
    }

    return (
        <div className="container-fluid timeRegistration">
            <div className="row titleSection">
                <div className="clockIcon">{clock}</div>
                <h5>GESTIÓN DE HORAS:</h5>
            </div>
            <div className="timeForm">
                {timeTable.length === 0 ? <p>Aun no tienes registros</p>
                    : <form className={classes.root} noValidate autoComplete="off" style={{ display: "flex", flexDirection: "column" }}>
                        {timeTable.map((register, index) =>
                            <div className="row rowInput" key={index}>
                                <p className="typeRegistration"><span className="iconTimeRegistration">{iconType(register.type)}</span>{typeToString(register.type)}</p><span className="smallTrashIcon" onClick={() => setTimeTable(deleteInput(register.type, index))}>{showTrashButton(register.type)}</span>
                                <div className="col-12 col-sm-2 alignInput">
                                    <TextField
                                        id="outlined-helperText"
                                        label='Hora'
                                        defaultValue={register.dateTime.getHours().toString().padStart(2, '0')}
                                        variant="outlined"
                                        onChange={(event) => setTimeTable(changeHours(event.target.value, index))} required />
                                </div>
                                <div className="col-12 col-sm-2 alignInput">
                                    <TextField
                                        id="outlined-helperText"
                                        label='Minutos'
                                        defaultValue={register.dateTime.getMinutes().toString().padStart(2, '0')}
                                        variant="outlined"
                                        onChange={(event) => setTimeTable(changeMinutes(event.target.value, index))} required />
                                </div>
                                <div className="col-sm-1 bigTrashIcon" onClick={() => setTimeTable(deleteInput(register.type, index))}>
                                    {showTrashButton(register.type, index)}
                                </div>
                            </div>
                        )}
                    </form>
                }
            </div>
            <div>
                {timeTable.length === 0 ? <button onClick={() => startWorking()}>Empezar a trabajar</button>
                    : buttonCase(timeTable[timeTable.length - 1].type)}
            </div>
        </div>
    );
}

export default TimeRegistration;