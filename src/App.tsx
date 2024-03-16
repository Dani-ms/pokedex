import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { ManyPage } from './many/page'


function App() {
 

 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ManyPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
