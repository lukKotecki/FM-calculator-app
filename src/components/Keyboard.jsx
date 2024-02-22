
import React from 'react'


export default function Keyboard({ children, onClick }){


    return(
        <div onClick={onClick} className='kayboard'>
            {children}
        </div>
    )
}