import React, {useContext} from 'react';
import TimeRegistration from './TimeRegistration/TimeRegistration';
import ToDo from './ToDo/ToDo';
import Menu from './Menu/Menu';
import MyContext from '../context';

function PrincipalPage() {

     //Global Context
     const contextInfo = useContext(MyContext);
     const hooksState = contextInfo.hooksState;
     const setHooksState = contextInfo.setHooksState;

    return (
        <div className="container-fluid PrincipalPage">
            <div className="row menu">
                < Menu/>
            </div>
            <div className="row">
                <div className="col-12 col-md-4" style={{padding:'0 5px 0 5px'}}>
                    <TimeRegistration />
                </div>
                <div className = "col-12 col-md-8" style = {{padding: '0 5px 0 0'}}>
                    <ToDo/>
                </div>
            </div>
        </div>
    )
}

export default PrincipalPage;