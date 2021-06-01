import React from 'react';

const Fatal = (props) => {
    return(
        <div className='center'>
            <h2 className="rojo"> { props.mensaje } </h2>
        </div>
    )
};

export default Fatal;