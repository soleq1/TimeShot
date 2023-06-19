import { useState,lazy } from 'react'
import './App.css'
import { Login } from './components/Login'
import {Route,Routes} from 'react-router-dom'
import { Header } from './components/Header'
// import { Cart } from './components/Cart'
import Cart from './components/Cart'
import { LogInWrapper } from './components/LogInWrapper'
import { HomePageStore } from './components/landingPage'
import { Products } from './components/Products'
import { Footer } from './components/Footer'
import { AdminPanel } from './components/AdminPanel'
import { ProductPages } from './components/ProductPages'
function App() {



  return (
  <>

      <Header />
    <Routes>
      <Route path='/checkout' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<HomePageStore />} />
      <Route path='/Products' element={<Products />} />
      <Route path='/item/:id' element={<ProductPages />} />
      <Route path='/Admin' element={<AdminPanel />} />
    </Routes>
    
  </>
  )
}

export default App
