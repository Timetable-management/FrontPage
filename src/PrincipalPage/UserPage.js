import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../context';

function UserPage(){

    const contextInfo = useContext(MyContext);

    return(
        <div className="UserPage">
            <p>{contextInfo.hooksState.name}</p>
            < button onClick = {
                (() => contextInfo.setHooksState({...contextInfo.hooksState, name: 'Luis'}))
            }> X </button>
        </div>
    )
}

export default UserPage;