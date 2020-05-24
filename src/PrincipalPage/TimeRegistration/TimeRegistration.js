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
import MyContext from '../../context';
import './TimeRegistration.scss';
import PropTypes from 'prop-types';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


function TimeRegistration() {

    //Global Context
    const contextInfo = useContext(MyContext);
    const hooksState = contextInfo.hooksState;
    const setHooksState = contextInfo.setHooksState;

    //Material UI styles
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1)
            },
        },
        button: {
            margin: theme.spacing(1)
        },
    }));
    const classes = useStyles(); //MaterialUI classes
    const clock = <FontAwesomeIcon icon={faClock} size="2x" color="#3F51B5" /> //Clock Icon
    const trash = <FontAwesomeIcon icon={faTrashAlt} size="md" color="rgb(172, 24, 36)" /> //Trash Icon
    const startWork = <FontAwesomeIcon icon={faBriefcase} size="md" color="#9573DA" /> //StartWork Icon
    const pause = <FontAwesomeIcon icon={faMugHot} size="md" color="#73DAC9" /> //Pause Icon
    const finishWork = <FontAwesomeIcon icon={faHome} size="md" color="#DA7373" /> //FinishWork Icon

    const buttonStartWork = <FontAwesomeIcon icon={faBriefcase} size="md" color="#ffffff" /> //StartWork Icon Button
    const buttonPause = <FontAwesomeIcon icon={faMugHot} size="md" color="#ffffff" /> //Pause Icon Button
    const buttonFinishWork = <FontAwesomeIcon icon={faHome} size="md" color="#ffffff" /> //FinishWork Icon Button

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
    const iconType = (type) => {
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
                    <div className="row">
                        <div className="col-12 justifyCenter">
                            <button onClick={() => startPause()}>Pausa &nbsp; {buttonPause}</button>
                        </div>
                        <div className="col-12 justifyCenter">
                            <button className="endWorkButton" onClick={() => endWork()}>Fin de trabajo &nbsp; {buttonFinishWork}</button>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="col-12 justifyCenter">
                        <button onClick={() => endPause()}>Fin de pausa &nbsp; {buttonStartWork}</button>
                    </div>
                )
            case 3:
                return (
                    <div className="row">
                        <div className="col-12 justifyCenter">
                            <button onClick={() => startPause()}>Pausa &nbsp; {buttonPause}</button>
                        </div>
                        <div className="col-12 justifyCenter">
                            <button className="endWorkButton" onClick={() => endWork()}>Fin de trabajo &nbsp; {buttonFinishWork}</button>
                        </div>
                    </div>
                )
        }
    }
    //BUTTONS FUNCTIONS 
    //Button on startWork
    const startWorking = () => {
        setTimeTable([{
            type: type.Hora_de_entrada,
            dateTime: new Date()
        }])
    }
    const startPause = () => {
        setTimeTable([...timeTable, {
            type: type.Hora_de_inicio_de_pausa,
            dateTime: date
        }])
    }
    const endWork = () => {
        setTimeTable([...timeTable, {
            type: type.Hora_de_salida,
            dateTime: date
        }])
    }
    const endPause = () => {
        setTimeTable([...timeTable, {
            type: type.Hora_de_final_de_pausa,
            dateTime: date
        }])
    }

    const date = new Date();//To get actual minutes and seconds
    //Here we are going to push the input registers --> CONTEXT
    const [timeTable, setTimeTable] = useState([])
    const [totalTimeWorked, setTotalTimeWorked] = useState('00:00:00')
    //Copy the timeTable state to the context every time that this state change
    const updateComponentToContext = () => {
        setHooksState({ ...hooksState, timeTable })
    }
    // useEffect(() => { updateComponentToContext() }, [timeTable]);

    //Edit time -> Function to change the hours of an input
    const changeHours = (hourValue, index) => {
        const array = [...timeTable];
        array[index].dateTime.setHours(hourValue);
        return array;
    }
    //Edit time -> Function to change the minutes of an input
    const changeMinutes = (minuteValue, index) => {
        const array = [...timeTable];
        array[index].dateTime.setMinutes(minuteValue);
        return array;
    }

    //Total time worked
    useEffect(() => {
        if (timeTable[0] !== undefined &&
            setTimeout(() => {
                const reducer = (accumulator, currentValue) => accumulator + currentValue.dateTime.getTime();
                let inicioPausa = (timeTable.filter(register => register.type == 2)).reduce(reducer, 0);
                let finalPausa = (timeTable.filter(register => register.type == 3)).reduce(reducer, 0);
                const estamosEnPausa = timeTable.length != 0 && timeTable[timeTable.length - 1].type == 2;
                let finDeTrabajo = new Date();
                if (timeTable.length != 0 && timeTable[timeTable.length - 1].type == 1) {
                    finDeTrabajo = timeTable[timeTable.length - 1].dateTime;
                }

                if (estamosEnPausa) {
                    inicioPausa = inicioPausa - timeTable[timeTable.length - 1].dateTime;
                }
                const tiempoPausas = finalPausa - inicioPausa;

                console.log(finDeTrabajo)

                const tiempoTrabajado = estamosEnPausa ? timeTable[timeTable.length - 1].dateTime - timeTable[0].dateTime - tiempoPausas :
                    finDeTrabajo - timeTable[0].dateTime - tiempoPausas;

                let h, m, s;
                s = '' + Math.floor(tiempoTrabajado / 1000);
                m = '' + Math.floor(s / 60);
                h = '' + Math.floor(m / 60);
                s = '' + s % 60;
                m = '' + m % 60;
                setTotalTimeWorked(`${h.padStart(2, "0")}:${m.padStart(2, "0")}:${s.padStart(2, "0")}`)
            }, 1000)
        )
            console.log('tiempo');
    })

    //Function to display the button trash depending on the input type
    const showTrashButton = (type) => {
        if (timeTable.length > 1 && type !== 3 && type !== 0) {
            return trash;
        }
        if (timeTable.length === 1) {
            return trash;
        }
    }

    //Function to deconste input rows when click the trash button
    const deleteInput = (type, index) => {
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
                {timeTable.length === 0 ? (<div>
                    <p>Aun no tienes registros</p>
                    <button onClick={() => startWorking()}>Empezar a trabajar &nbsp; {buttonStartWork}</button>
                </div>)
                    : (<form className={classes.root} noValidate autoComplete="off" style={{ display: "flex", flexDirection: "column" }}>
                        {timeTable.map((register, index) =>
                            <div className="row rowInput" key={index}>
                                <div className="col-12 typeInput">
                                    <p><span className="iconTimeRegistration">{iconType(register.type)}</span>{typeToString(register.type)}</p><span onClick={() => setTimeTable(deleteInput(register.type, index))}>{showTrashButton(register.type)}</span>
                                </div>
                                <div className="col-6 alignInput">
                                    <TextField
                                        id="outlined-helperText"
                                        label='Hora'
                                        defaultValue={register.dateTime.getHours().toString().padStart(2, '0')}
                                        variant="outlined"
                                        onChange={(event) => setTimeTable(changeHours(event.target.value, index))} required />
                                </div>
                                <div className="col-6 alignInput">
                                    <TextField
                                        id="outlined-helperText"
                                        label='Minutos'
                                        defaultValue={register.dateTime.getMinutes().toString().padStart(2, '0')}
                                        variant="outlined"
                                        onChange={(event) => setTimeTable(changeMinutes(event.target.value, index))} required />
                                </div>
                            </div>
                        )}
                        <div>
                            {buttonCase(timeTable[timeTable.length - 1].type)}
                        </div>
                        <div className="col-12 alignInput containerTotalTime">
                            {timeTable.length !== 0 &&
                                <p>Tiempo trabajado: <span className="totalTimeWorked">{totalTimeWorked}</span></p>}
                        </div>
                        <div className="col-12">
                            <TextareaAutosize aria-label="empty textarea" placeholder="¿Quieres dejar algún comentario?" style={{ width: '100%', border: '1px solid #3F51B5', borderRadius: '5px' }} />
                        </div>
                    </form>)
                }
            </div>
        </div>
    );
}

export default TimeRegistration;