import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks, faUserAlt, faUsers, faSignOutAlt, faClock, faTrashAlt, faBriefcase, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faChartBar, faPlusSquare } from '@fortawesome/free-regular-svg-icons';

const Home = <FontAwesomeIcon icon={faHome} />
const Tasks = <FontAwesomeIcon icon={faTasks} />
const UserAlt = <FontAwesomeIcon icon={faUserAlt} />
const Users = <FontAwesomeIcon icon={faUsers} />
const SignOutAlt = <FontAwesomeIcon icon={faSignOutAlt} />
const Envelope = <FontAwesomeIcon icon={faEnvelope} />
const ChartBar = <FontAwesomeIcon icon={faChartBar} />
const addTask = <FontAwesomeIcon icon={faPlusSquare} size="lg" color="#3F51B5" /> //AddTask Icon
// TIME REGISTRATION
const clock = <FontAwesomeIcon icon={faClock} size="2x" color="#3F51B5" /> //Clock Icon
const trash = <FontAwesomeIcon icon={faTrashAlt} size="md" color="rgb(172, 24, 36)" /> //Trash Icon
const startWork = <FontAwesomeIcon icon={faBriefcase} size="md" color="#9573DA" /> //StartWork Icon
const pause = <FontAwesomeIcon icon={faMugHot} size="md" color="#73DAC9" /> //Pause Icon
const finishWork = <FontAwesomeIcon icon={faHome} size="md" color="#DA7373" /> //FinishWork Icon
const buttonStartWork = <FontAwesomeIcon icon={faBriefcase} size="md" color="#ffffff" /> //StartWork Icon button
const buttonPause = <FontAwesomeIcon icon={faMugHot} size="md" color="#ffffff" /> //Pause Icon Button
const buttonFinishWork = <FontAwesomeIcon icon={faHome} size="md" color="#ffffff" /> //FinishWork Icon Button

export default {
    Home,
    Envelope,
    Tasks,
    UserAlt,
    Users,
    SignOutAlt,
    ChartBar,
    addTask,
    clock,
    trash,
    startWork,
    pause,
    finishWork,
    buttonPause,
    buttonStartWork,
    buttonFinishWork
}

