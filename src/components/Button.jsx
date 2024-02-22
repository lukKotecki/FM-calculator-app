import React from 'react'


export default function Button({ children, className, onClick }){


    return(
        <button value={children} className={`button ${className}`} 
            onClick={onClick}>
            {children}
        </button>
    )
}