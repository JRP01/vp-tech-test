import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Baths from './Pages/Baths';
import Toilets from './Pages/Toilets';
import Navigation from './Components/NavBar/NavBar';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navigation />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/baths' element={<Baths />} />
            <Route path='/toilets' element={<Toilets />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
