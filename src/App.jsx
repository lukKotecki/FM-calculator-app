import React from 'react'
import Display from './components/Display'
import Header from './components/Header'
import Button from './components/Button'
import Buttons from './assets/Buttons'
import {themeColors} from './components/themeColors'

export const ThemeSelectorContext = React.createContext({
  themeName:'dark'
})

// Basic idea of calculator
// Each user click is stored in 'input' array. 
// User should be able to dynamically change his input by clicking different operation or removing last sign by clicking 'DEL' button. 
// After clicking equality button 'input' array is calculated with order of operations.
// The code requires refactoring and some errors may occur due to its coarseness

function App() {
  const [theme, setTheme ] = React.useState('dark')
  const [input, setInput ] = React.useState([])
  const [previousInput, setPreviousInput] = React.useState(null)
  
  React.useEffect(()=>{
    setColorScheme(theme)
  },[theme])

  React.useEffect(()=>{
    if(input.length){
      setPreviousInput(input[input.length-1])
    }else{
      setPreviousInput(null)
    }
  },[input])
  
  function setColorScheme(colorScheme){
    for(const key in themeColors[colorScheme]){
      document.documentElement.style.setProperty(key, themeColors[colorScheme][key]);
    }
  }
  
  function removeLastInput() {
    if (!input.length) return
    setInput(input.filter((el, i) => input.length - 1 !== i && el))
  }

  function replaceLastInput(value) {
    if (!input.length) return
    setInput(input.map((el, i) => (input.length - 1 !== i ? el : value)))
  }

  function handleClick(e){
    const value = e.target.value
    if(e.target.value){
      switch(value){
        case 'RESET':
          return setInput([])
        case 'DEL':
          return removeLastInput()
        case '=':
          return calculateResult(concatNumbers())
        default:
          setCharToInput(value)
      }
    }
  }
  
  function calculateResult(concatedNumbers){
    const firstArray = [...concatedNumbers]
    // perform multiplying and dividing onto firstArray
    for (let i =0, j=0; i< firstArray.length; i++){
      if(firstArray[i] === 'x'){
        firstArray[i+1] = firstArray[i-1]* firstArray[i+1]
        firstArray[i-1]= null
        firstArray[i]=null
      }
      if(firstArray[i] === '/'){
        firstArray[i+1] = firstArray[i-1]/ firstArray[i+1]
        firstArray[i-1]= null
        firstArray[i]=null
      }
    }
    // initialize secondArray without null fields
    const secondArray = []
    firstArray.forEach(el=> el && secondArray.push(el))
    // perform adding and substracting onto secondArray
    for (let i =0; i< secondArray.length; i++){
      if(secondArray[i] === '+'){
        secondArray[i+1] = Number(secondArray[i-1]) + Number(secondArray[i+1])
        secondArray[i-1]= null
        secondArray[i]=null
      }
      if(secondArray[i] === '-'){
        secondArray[i+1] = secondArray[i-1]- secondArray[i+1]
        secondArray[i-1]= null
        secondArray[i]=null
      }
    }
    //setting up the resoult into the display also for further calculations
    setInput([secondArray[secondArray.length-1].toString()])
  }

  function concatNumbers(){
    const array =[]
    let numberOfNumbers = 0
    for(let i=0; i< input.length; i++){
      if(!isNaN(input[i]) || input[i]==='.' || input[i]==='-' && isNaN(input[i-1]) ){
        if(array[numberOfNumbers]){
          array[numberOfNumbers] = array[numberOfNumbers]+input[i]
        }else{
          array[numberOfNumbers] = input[i]
        }
      }else{
        if(i===0){
          numberOfNumbers +=1
        }else{
          numberOfNumbers +=2
        }
        array.push(input[i])
      }
    }
    return array
  }

  function wasAlreadyDot(){
    for(let i=input.length-1; i>=0; i--){
      if(input[i]==='.')
          return true;
      if(isNaN(input[i]))
        return false
    }
  }

  function setCharToInput(value){
    // add number to the end
    if(!isNaN(value)){
      !input[0] ? setInput([value]) : setInput(prev=> [...prev, value])
      return
    }
    //add minus
    if(value === '-'){
      if( previousInput==='-'){ //skip if previous was minus
        return
      }
      if(previousInput==='+' || input.length === 1 && isNaN(input[0])){ // replace plus
        replaceLastInput(value)
        return
      }
      if(previousInput==='.'){
        if(input[input.length-2]==='-'){ //remove dot
          removeLastInput()
        }else{ //replace dot
          replaceLastInput('-')
        }
        return
      }
      setInput(prev=> [...prev, value])
    }
    //add dot if wasn't earlier
    if(value === '.'){
      if(!wasAlreadyDot()){
        setInput(prev=> [...prev, value])
      }
      return
    }
    //add + or x or /
    if(value==='+' || value==='x' || value==='/'){
      const wasAlreadyThisSign = previousInput===value
      const isTheFirstSignInInput = !previousInput
      const previousIsDot = previousInput ==='.'
      const minusDotOnBegining = isNaN(input[0] && isNaN(input[1])) 
      const minusDotLastInput = isNaN(previousInput) && isNaN(input[input.length-2]) && input.length>=2
      const firstIsMinus = input.length===1 && previousInput === '-'
      if( wasAlreadyThisSign || isTheFirstSignInInput || 
        previousIsDot|| minusDotOnBegining || minusDotLastInput|| firstIsMinus )
        return
        if(isNaN(previousInput) ){
          replaceLastInput(value)
        }else{
          setInput(prev=> [...prev, value])
        }
      }
    }
    
    
  return (
    <ThemeSelectorContext.Provider value={{themeName:'dark', setTheme}}>
      <main className='main-container'>
        <Header />

        <Display result={input}/>
        <div  className='kayboard' >
        {Buttons.map((button, index) => (
            <Button className={button.class ? button.class : ''} 
                    onClick={handleClick} 
                    key={index} 
                    name={button.name}/>
          ))}
        </div>
      </main>
    </ThemeSelectorContext.Provider>
  )
}

export default App
