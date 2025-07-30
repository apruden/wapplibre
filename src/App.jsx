import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Login from './components/Login'
import Chat from './components/Chat'
import EntityEdit from './components/EntityEdit'
import EntitiesList from './components/EntitiesList'
import LocationsList from './components/LocationsList'
import CodeMirrorPage from './components/CodeMirrorPage'
import WorkflowEditor from './components/WorkflowEditor'
import EntitiesSummary from './components/EntitiesSummary'

function App() {
  const location = useLocation();
  const showNavbar = !location.pathname.includes('/login');
  return (
    <>
      {showNavbar && (
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="/chat">WappLibre</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/chat" active={location.pathname === '/chat'}>
                  Chat
                </Nav.Link>
                <Nav.Link as={Link} to="/entities" active={location.pathname === '/entities'}>
                  Entities
                </Nav.Link>
                <Nav.Link as={Link} to="/locations" active={location.pathname === '/locations'}>
                  Locations
                </Nav.Link>
                <Nav.Link as={Link} to="/codemirror" active={location.pathname === '/codemirror'}>
                  CodeMirror
                </Nav.Link>
                <Nav.Link as={Link} to="/workflow" active={location.pathname === '/workflow'}>
                  Workflow
                </Nav.Link>
                <Nav.Link as={Link} to="/entities-summary" active={location.pathname === '/entities-summary'}>
                  Entities Summary
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      
      <Container fluid>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/entities" element={<EntitiesList />} />
          <Route path="/locations" element={<LocationsList />} />
          <Route path="/edit-entity" element={<EntityEdit />} />
          <Route path="/edit-entity/:id" element={<EntityEdit />} />
          <Route path="/codemirror" element={<CodeMirrorPage />} />
          <Route path="/workflow" element={<WorkflowEditor />} />
          <Route path="/entities-summary" element={<EntitiesSummary />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
