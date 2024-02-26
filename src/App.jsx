import React from 'react'
import Display from './components/Display'
import Header from './components/Header'
import Button from './components/Button'
import Keyboard from './components/Keyboard'
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
  
function removeLastInput(){
  if(input.length){
    setInput(input.filter((el,i)=> input.length-1 !==i && el ))
  }
}
function replaceLastInput(value){
  if(input.length){
    setInput(input.map((el,i)=> input.length-1 !== i ? el: value ))
  }
}

  function handleClick(e){
    const value = e.target.value
    if(e.target.value){
      switch(value){
        case 'RESET':
          setInput([])
          break;
        case 'DEL':
          removeLastInput()
          break;
        case '=':
          calculateResult(concatNumbers())
          break;
        default:
          setCharToInput(value)
      }
    }
  }
  
  function calculateResult(concatedNumbers){
    const firstArray = [...concatedNumbers]
    const secondArray = []
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
      if(previousInput===value || !previousInput || 
        previousInput ==='.'||
        isNaN(input[0] && isNaN(input[1])) ||
        isNaN(previousInput) && isNaN(input[input.length-2]) && input.length>=2 ||
        input.length===1 && previousInput === '-' )
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
        <Keyboard onClick={handleClick}>
          <Button>7</Button>
          <Button>8</Button>
          <Button>9</Button>
          <Button className='del'>DEL</Button>
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>
          <Button>+</Button>
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>-</Button>
          <Button>.</Button>
          <Button>0</Button>
          <Button>/</Button>
          <Button>x</Button>
          <Button className='reset'>RESET</Button>
          <Button className='equal'>=</Button>
        </Keyboard>
      </main>
    </ThemeSelectorContext.Provider>
  )
}

export default App
