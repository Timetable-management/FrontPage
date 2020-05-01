import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import MyContext from '../../context';
import './NewToDo.scss';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

function NewToDo() {

    const closeIcon = <FontAwesomeIcon icon={faTimes} size="lg" color="#3F51B5" /> //AddTask Icon
    const calendarIcon = <FontAwesomeIcon icon={faCalendarAlt} size="lg" color="#3F51B5" /> //calendar Icon
    const contextInfo = useContext(MyContext); //Global Context

    const date = new Date();//To get actual minutes and seconds
    const [newItem, setnewItem] = useState({
        date: date,
        title: '',
        note: '',
        priority: '',
        color: '',
        participants: '',
        toDoState: ''
    })

    //Copy the NewToDoList state to the context every time that this state change
    const updateComponentToContext = () => {
        contextInfo.setHooksState({ ...contextInfo.hooksState, newItem });
    }
    useEffect(() => { updateComponentToContext() }, [newItem]);

    //Edit time -> Function to change the hours of an input
    const changeHours = (hourValue) => {
        const object = newItem;
        object.date.setHours(hourValue);
        return object;
    }

    //Edit time -> Function to change the minutes of an input
    const changeMinutes = (minuteValue) => {
        const object = newItem;
        object.date.setMinutes(minuteValue);
        return object;
    }
    //Edit time -> Function to change the Date of an input
    const changeDate = (dateValue) => {
        const object = newItem;
        object.date.setDate(dateValue);
        console.log(newItem.date);
        return object;
    }
    //Edit time -> Function to change the Month of an input
    const changeMonth = (monthValue) => {
        const object = newItem;
        object.date.setMonth(monthValue++);
        console.log(newItem.date);
        return object;
    }
    //Edit time -> Function to change the FullYear of an input
    const changeFullYear = (fullYearValue) => {
        const object = newItem;
        object.date.setFullYear(fullYearValue);
        console.log(newItem.date);
        return object;
    }

    return (
        <div className="container NewToDoComponent">
            <div className="row closeButton"><Link to='/principalPage'>{closeIcon}</Link></div>
            <div>
                <form>
                    <div className="row hoursAndDate">
                        <div className="boxDate col-12 col-md-5">
                            <div className="row">
                                <div className="col-12 col-md-5 labelDate">
                                    <p>Hora:</p>
                                </div>
                                <div className="col-12 col-md-7 date">
                                    <input
                                        name='Hora'
                                        type='number'
                                        defaultValue={newItem.date.getHours().toString().padStart(2, '0')}
                                        onChange={(event) => setnewItem(changeHours(event.target.value))} required />
                                    <p>:</p>
                                    <input
                                        name='Minutos'
                                        type='number'
                                        defaultValue={newItem.date.getMinutes().toString().padStart(2, '0')}
                                        onChange={(event) => setnewItem(changeMinutes(event.target.value))} required />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-7 boxDate">
                            <div className="row">
                                <div className="col-12 col-md-4 labelDate">
                                    <p>Fecha:</p>
                                </div>
                                <div className="col-12 col-md-8 date">
                                    <input
                                        label='Día'
                                        type='number'
                                        defaultValue={newItem.date.getDate()}
                                        onChange={(event) => setnewItem(changeDate(event.target.value))} required />
                                    <p>/</p>
                                    <input
                                        label='Mes'
                                        type='number'
                                        defaultValue={(newItem.date.getMonth()+1)}
                                        onChange={(event) => setnewItem(changeMonth(event.target.value-1))} required />
                                    <p>/</p>
                                    <input
                                        label='Año'
                                        type='number'
                                        defaultValue={newItem.date.getFullYear()}
                                        onChange={(event) => setnewItem(changeFullYear(event.target.value))} required />
                                    <span style={{ margin: '0 10px' }}>{calendarIcon}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row title">
                        <div className="col-12 col-md-2 labelTitulo">
                            <p>Titulo:</p>
                        </div>
                        <div className="col-12 col-md-10 titleInput">
                            <input
                            type='text'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 textArea">
                            <TextareaAutosize aria-label="empty textarea" placeholder="¿Sobre qué trata la reunión?" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewToDo;