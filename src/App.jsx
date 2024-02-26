import React from 'react'
import Display from './components/Display'
import Header from './components/Header'
import Button from './components/Button'
import Keyboard from './components/Keyboard'
import {themeColors} from './components/themeColors'

export const ThemeSelectorContext = React.createContext({
  themeName:'dark'
})

function App() {
  const [theme, setTheme ] = React.useState('dark')
  const [input, setInput ] = React.useState([])
  const [previousInput, setPreviousInput] = React.useState(null)
  const [concated, setConcated] = React.useState([])
  
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

  // const switchTheme = (newTheme) => setTheme(newTheme)
  // console.clear()
  // console.log(input)
  // console.log('ostatnio ',previousInput)

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
          calculateResult()
          break;
        default:
          setCharToInput(value)
      }
      // setPreviousInput(value)
    }
  }

  
  function multiplyAndDivide(concatedNumbers){
    const arr = [...concatedNumbers]
    const array = []
    let previousNumber = Number(arr[0])
    let currentCalculationResult = 0
    for (let i =0, j=0; i< arr.length; i++){
      if(arr[i] === 'x'){
        arr[i+1] = arr[i-1]* arr[i+1]
        arr[i-1]= null
        arr[i]=null
      }
      if(arr[i] === '/'){
        arr[i+1] = arr[i-1]/ arr[i+1]
        arr[i-1]= null
        arr[i]=null
      }
    }
    arr.forEach(el=> el && array.push(el))
    
    for (let i =0; i< array.length; i++){
      if(array[i] === '+'){
        array[i+1] = Number(array[i-1]) + Number(array[i+1])
        array[i-1]= null
        array[i]=null
      }
      if(array[i] === '-'){
        array[i+1] = array[i-1]- array[i+1]
        array[i-1]= null
        array[i]=null
      }
    }


    setInput(array[array.length-1].toString())

    console.log(input)
    console.log(arr)
    console.log(array)
    console.log(array[array.length-1])
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

  function calculateResult(){
    let result = 0;
    const inputNumbers =[]
    
    
    multiplyAndDivide(concatNumbers())
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
    //add + or * or /
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


    //TODO trzeba dodac mozliwosc dodania minusa i kropki
    // if(isNaN(value) && isNaN(input[input.length-1])){
    //   setInput(input.map((el,i)=> input.length-1 === i? value : el ))
    // }else{
    //   !input[0] ? setInput(value) : setInput(prev=> [...prev, value])
    // }
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
