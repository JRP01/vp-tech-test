import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../Assets/Images/image.svg';
import './NavBar.css';

function Navigation() {
  return (
    <Navbar expand='lg'>
      <Container>
        <Navbar.Brand href='/'>
          <img className='navbar-brand-img' src={Logo} alt='Logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/baths'>Baths</Nav.Link>
            <Nav.Link href='/toilets'>Toilets</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
