import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div>
      <Container fluid>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand>Charter</Navbar.Brand>
          </Container>
        </Navbar>

        {/* Dashboard */}
        Hello World
      </Container>
    </div>
  );
}

export default App;
