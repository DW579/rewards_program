import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import Dashboard from './components/dashboard';

function App() {
  return (
    <div>
      <Container fluid>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand>Charter</Navbar.Brand>
          </Container>
        </Navbar>

        <Dashboard></Dashboard>

      </Container>
    </div>
  );
}

export default App;
