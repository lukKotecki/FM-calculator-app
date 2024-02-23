import React, { useCallback, useContext } from 'react'
import './ThreeStateToggle.css'
import { ThemeSelectorContext } from '../../App'

export default function ThreeStateToggle(){
    const {themeName, setTheme} = useContext(ThemeSelectorContext)
    const [style, setStyle ] = React.useState('dark')

    const dark = React.useRef(null)
    const light = React.useRef(null)
    const violet = React.useRef(null)

    // console.log(themeName)

    React.useEffect(()=> {
        dark.current.style.opacity = 0
        light.current.style.opacity = 0
        violet.current.style.opacity = 0
        setTheme(style)
        
        switch(style){
            case 'dark':
            dark.current.style.opacity = 1;
                break;
            case 'light':
            light.current.style.opacity = 1
                break;
            case 'violet':
            violet.current.style.opacity = 1
                break;
            default:
                console.log('unknown option')
        }
    }, [style])

    function handleClick(e){
        setStyle(e.target.id)
    }


    return(
        <div className='toggle'>
                    
            <div className="tri-state-toggle">
                <span>1</span>
                <input ref={dark} onClick={handleClick} className="toggle" type="radio" name="toggle" id="dark" />
                <span>2</span>
                <input ref={light} onClick={handleClick} className="toggle" type="radio" name="toggle" id="light" />
                <span>3</span>
                <input ref={violet} onClick={handleClick} className="toggle" type="radio" name="toggle" id="violet" />
            </div>



        </div>
    )
}