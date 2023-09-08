import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store.js'
import {Provider} from 'react-redux'
import App from './App.jsx'
import './index.css'
import {  ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={store}>
    <BrowserRouter>
     <ChakraProvider>
    <App />
    </ChakraProvider>
    </BrowserRouter>
    </Provider>
  ,
)