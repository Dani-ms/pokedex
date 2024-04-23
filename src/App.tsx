import {  HashRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { ManyPage } from './many/page'
import { OnePage } from './many/one/page';


function App() {
 

 
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path='/' element={<ManyPage />} />
        <Route path='/:name' element={<OnePage/>} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
