import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { ManyPage } from './many/page'
import { OnePage } from './many/one/page';


function App() {
 

 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ManyPage />} />
        <Route path='/:name' element={<OnePage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
