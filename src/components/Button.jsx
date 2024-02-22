import React from 'react'


export default function Button({ children, className }){


    return(
        <button className={`button ${className}`} >
            {children}
        </button>
    )
}