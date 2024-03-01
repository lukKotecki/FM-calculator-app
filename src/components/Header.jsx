import React from 'react'
import ThreeStateToggle from './ThreeStateToggle/ThreeStateToggle'

export default function Header(){

    return(
        <header>
            <h1>calc</h1>

            <div className='theme'>
                <span>THEME</span>
                <ThreeStateToggle />
            </div>

        </header>
    )
}