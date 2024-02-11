import React from 'react'
import './ThreeStateToggle.css'

export default function ThreeStateToggle(){

    console.clear()

    function handleClick(e){
        console.log(e.target.id)

        switch(e.target.id){
            case 'one':
                e.target.nextElementSibling.style.opacity = 0
                e.target.nextElementSibling.nextElementSibling.style.opacity = 0
                console.log('opcja pierwsza')
                break;
            case 'two':
                e.target.previousElementSibling.style.opacity = 0
                e.target.nextElementSibling.style.opacity = 0
                console.log('opcja druga')
                break;
            case 'three':
                e.target.previousElementSibling.style.opacity = 0
                e.target.previousElementSibling.previousElementSibling.style.opacity = 0
                console.log('opcja trzecaia')
                break;
            default:
                console.log('opcja nieznana')
        }
        

        // e.target.previousElementSibling.style.opacity = 0
        e.target.style.opacity = 1

    }


    return(
        <div className='toggle'>
                    
            <div className="tri-state-toggle" onClick={handleClick}>
                <input className="button" type="radio" name="toggle" id="one" />
                <input className="button" type="radio" name="toggle" id="two" />
                <input className="button" type="radio" name="toggle" id="three" />
            </div>



        </div>
    )
}