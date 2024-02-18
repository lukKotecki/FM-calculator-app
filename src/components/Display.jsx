import React from 'react'


export default function Display({result}){


    return(
        <div className='display'>
            <div className='output'>
                {result}
            </div>
        </div>
    )
}