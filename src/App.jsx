import React from 'react'
import Display from './components/Display'
import Header from './components/Header'

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
        <Display />
      to jest tekst
      </main>
    </ThemeSelectorContext.Provider>
  )
}

export default App
