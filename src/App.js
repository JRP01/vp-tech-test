import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Baths from './Pages/Baths';
import Toilets from './Pages/Toilets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/baths' element={<Baths/>} />
        <Route path='/toilets' element={<Toilets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
