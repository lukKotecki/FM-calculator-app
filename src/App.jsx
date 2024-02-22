import React from 'react'
import Display from './components/Display'
import Header from './components/Header'
import Button from './components/Button'
import Keyboard from './components/Keyboard'

export const ThemeSelectorContext = React.createContext({
  themeName:'dark'
})

function App() {
  
  const [theme, setTheme ] = React.useState('dark')
  const switchTheme = (newTheme) => setTheme(newTheme)


  console.log(theme)

  return (
    <ThemeSelectorContext.Provider value={{themeName:'dark', setTheme}}>
      <main className='main-container'>
        <Header />

        <Display result={theme}/>
        <Keyboard>
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
