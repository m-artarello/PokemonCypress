
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import BaseRoutes from './routes/BaseRoutes'

function App() {
  

  return (
    <>
    <div style={{background: '#115085'}}>
      <ChakraProvider>
        <BaseRoutes  />
      </ChakraProvider>
      </div>
    </>
  )
}

export default App
