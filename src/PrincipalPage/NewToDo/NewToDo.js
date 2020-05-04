import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUserPlus, faSearch, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import MyContext from '../../context';
import './NewToDo.scss';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import allUsersJson from '../../apiUsers.json';

function NewToDo() {

    const closeIcon = <FontAwesomeIcon icon={faTimes} size="lg" color="#3F51B5" /> //AddTask Icon
    const calendarIcon = <FontAwesomeIcon icon={faCalendarAlt} size="lg" color="#3F51B5" /> //calendar Icon
    const addUser = <FontAwesomeIcon icon={faUserPlus} size="lg" color="#62B53F" /> //addUser Icon
    const deleteUser = <FontAwesomeIcon icon={faUserTimes} size="lg" color="#E74B4B" /> //addUser Icon
    const search = <FontAwesomeIcon icon={faSearch} size="lg" color="#3F51B5" /> //Search Icon
    const contextInfo = useContext(MyContext); //Global Context

    const date = new Date();//To get actual minutes and seconds
    const [choosenDate, setChoosenDate] = useState({
        dia: date.getDate(),
        mes: date.getMonth(),
        año: date.getFullYear()
    })

    const [newItem, setNewItem] = useState({
        date: date,
        title: '',
        note: '',
        priority: '',
        color: '',
        participants: [],
        toDoState: 'toDo'
    })

    //Copy the NewToDoList state to the context every time that this state change
    const updateComponentToContext = () => {
        contextInfo.setHooksState({ ...contextInfo.hooksState, newItem });
    }
    useEffect(() => { updateComponentToContext() }, [newItem]);

    //Edit time -> Function to change the hours of an input
    const changeHours = (hourValue) => {
        const newDate = newItem.date;
        newDate.setHours(hourValue);
        setNewItem({ ...newItem, date: newDate });
    }

    //Edit time -> Function to change the minutes of an input
    const changeMinutes = (minuteValue) => {
        const newDate = newItem.date;
        newDate.setMinutes(minuteValue);
        setNewItem({ ...newItem, date: newDate });
    }

    useEffect(() => {
        const newDate = newItem.date;
        newDate.setDate(choosenDate.dia);
        newDate.setMonth(choosenDate.mes);
        newDate.setFullYear(choosenDate.año);
        setNewItem({ ...newItem, date: newDate });
    }, [choosenDate])


    //Edit the Title
    const changeTitle = (valueTitle) => {
        return { ...newItem, title: valueTitle }
    }
    const changeNote = (valueNote) => {
        return { ...newItem, note: valueNote }
    }

    //Priority Buttons
    const priorityButtons = [
        {
            level: 1,
            color: '#FF3C3C'
        },
        {
            level: 2,
            color: '#FF8282'
        },
        {
            level: 3,
            color: '#FFA882'
        },
        {
            level: 4,
            color: '#FFDA82'
        },
        {
            level: 5,
            color: '#FAFF82'
        }
    ];
    //Select Priority Buttons
    const selectPriority = (level) => {
        let object = newItem.priority;
        object = level;
        setNewItem({...newItem, priority: object});
    }

    //Colores de la cita
    const colorTask = [
        {
            type: 1,
            color: '#9573DA'
        },
        {
            type: 2,
            color: '#73DAC9'
        },
        {
            type: 1,
            color: '#DA7373'
        }
    ]

    //Nombre de persona que buscamos
    const [searchName, setSearchName] = useState();
    //Funcion para buscar las personas con el mismo nombre que buscamos
    const resultsNames = (searchName) => {
        const result = allUsersJson.results.filter(persona => (persona.name.first + ' ' + persona.name.last).toLocaleLowerCase().includes(searchName.toLocaleLowerCase()) && !newItem.participants.some(participant => JSON.stringify(participant.name) == JSON.stringify(persona.name)))
        return result;
    }
    //Funcion para añadi persona encontrada a nuestro objeto newItem
    const addParticipant = (persona) => {
        return { ...newItem, participants: [...newItem.participants, persona] }
    }
    //Funcion para eliminar una persona invitada
    const deleteParticipant = (persona) => {
        return { ...newItem, participants: newItem.participants.filter(item => item != persona) }
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
                                        defaultValue={newItem.date.getHours().toString().padStart(2, '0')}
                                        onChange={(event) => changeHours(event.target.value)} required />
                                    <p>:</p>
                                    <input
                                        name='Minutos'
                                        defaultValue={newItem.date.getMinutes().toString().padStart(2, '0')}
                                        onChange={(event) => changeMinutes(event.target.value)} required />
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
                                        onChange={(event) => setChoosenDate({ ...choosenDate, dia: event.target.value })} required />
                                    <p>/</p>
                                    <input
                                        label='Mes'
                                        type='number'
                                        defaultValue={(newItem.date.getMonth() + 1)}
                                        onChange={(event) => setChoosenDate({ ...choosenDate, mes: event.target.value - 1 })} required />
                                    <p>/</p>
                                    <input
                                        label='Año'
                                        type='number'
                                        defaultValue={newItem.date.getFullYear()}
                                        onChange={(event) => setChoosenDate({ ...choosenDate, año: event.target.value })} required />
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
                                type='text' onChange={(event) => setNewItem(changeTitle(event.target.value))} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 textArea">
                            <TextareaAutosize aria-label="empty textarea" placeholder="¿Sobre qué trata la reunión?" onChange={(event) => setNewItem(changeNote(event.target.value))} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="labelTitle">
                            <p>Prioridad:</p>
                        </div>
                        <div className="col-8 priorityLevels">
                            <hr className="priorityLine" />
                            {priorityButtons.map((priorityButton, index) =>
                                <div key={index} className={priorityButton.level <= newItem.priority ? 'priorityButtonsSelected' : 'priorityButtons'} style={{ backgroundColor: `${priorityButton.color}` }} onClick={() => selectPriority(priorityButton.level)}>{priorityButton.level}</div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="labelTitle">
                            <p>Color:</p>
                        </div>
                        {colorTask.map(circle => <div className="colorTask" style={{ backgroundColor: `${circle.color}` }}></div>)}
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6  paddingDeletePersons ">
                            <div className="labelPersonasInvitadas">
                                <p>Personas invitadas:</p>
                            </div>

                            {newItem.participants.length === 0
                                ? <p className="deletePersons" style={{ textAlign: 'center' }}>Aún no hay asistentes</p>
                                : newItem.participants.map((persona, index) =>
                                    <div key={index} className="row deletePersons alignItems" onClick={() => setNewItem(deleteParticipant(persona))}>
                                        <div className="col-9 alignItems ">
                                            <img className="avatar" src={`${persona.picture.thumbnail}`} alt="avatarImg" />
                                            <p>{`${persona.name.first} ${persona.name.last}`}</p>
                                        </div>
                                        <div className="col-3 displayEnd">{deleteUser}</div>
                                    </div>
                                )}
                        </div>

                        <div className="col-12 col-md-6 paddingFindPersons">
                            <div>
                                <input className="searchPersonInput" type="text" onChange={(event) => setSearchName(event.target.value)} />
                                {search}
                            </div>
                            {searchName && resultsNames(searchName).map((persona, index) =>
                                <div key={index} className="row searchPersons alignItems" onClick={() => setNewItem(addParticipant(persona))}>
                                    <div className="col-9 alignItems ">
                                        <img className="avatar" src={`${persona.picture.thumbnail}`} alt="avatarImg" />
                                        <p>{`${persona.name.first} ${persona.name.last}`}</p>
                                    </div>
                                    <div className="col-3 displayEnd">{addUser}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewToDo;