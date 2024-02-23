import React from 'react'


export default function Display({result}){

    if(!result[0])
        result='0'

    return(
        <div className='display'>
            <div className='output'>
                {result}
            </div>
        </div>
    )
}