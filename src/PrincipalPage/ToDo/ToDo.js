import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import MyContext from '../../context';
import './ToDo.scss';

function ToDo() {

      //Global Context
      const contextInfo = useContext(MyContext);
      const hooksState = contextInfo.hooksState;
      const setHooksState = contextInfo.setHooksState;

    const addTask = <FontAwesomeIcon icon={faPlusSquare} size="lg" color="#3F51B5" /> //AddTask Icon

    //Here we are going to push the to do tasks --> CONTEXT
    const [toDoList, setToDoList] = useState([])

    //Copy the toDoList state to the context every time that this state change
    const updateComponentToContext = () => {
        setHooksState({ ...hooksState, toDoList })
    }
    // useEffect(() => { updateComponentToContext() }, [toDoList]);


    return (
        <div className="container-fluid toDoComponent">
            <div className="row">
                <div className="col-12 col-md-6 listToDo">
                    <div className="row">
                        <h5>TAREAS POR HACER:</h5><Link to ='/newToDo'>{addTask}</Link>
                    </div>
                    <div className="timeForm">
                        {toDoList.length === 0 ? (<div>
                            <p>Aun no tienes registros</p>
                        </div>)
                            : (<p>hola</p>)
                        }
                    </div>
                </div>
                <div className="col-12 col-md-6 listDone">
                    <div className="row">
                        <h5>TAREAS HECHAS:</h5>{addTask}
                    </div>
                    <div className="timeForm">
                        {toDoList.length === 0 ? (<div>
                            <p>Aun no tienes registros</p>
                        </div>)
                            : (<p>hola</p>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToDo;