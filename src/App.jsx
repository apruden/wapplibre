import { Routes, Route, Navigate, useLocation, Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Container,
  Typography,
  Box,
} from '@mui/material'
import Login from './components/Login'
import Chat from './components/Chat'
import EntityEdit from './components/EntityEdit'
import EntitiesList from './components/EntitiesList'
import LocationsList from './components/LocationsList'
import CodeMirrorPage from './components/CodeMirrorPage'
import WorkflowEditor from './components/WorkflowEditor'
import EntitiesSummary from './components/EntitiesSummary'

function App() {
  const location = useLocation()
  const showNavbar = !location.pathname.includes('/login')

  const navItems = [
    { label: 'Chat', to: '/chat' },
    { label: 'Entities', to: '/entities', matches: ['/entities', '/edit-entity'] },
    { label: 'Locations', to: '/locations' },
    { label: 'CodeMirror', to: '/codemirror' },
    { label: 'Workflow', to: '/workflow' },
    { label: 'Entities Summary', to: '/entities-summary' },
  ]

  const tabValue =
    navItems.find(item =>
      (item.matches ?? [item.to]).some(prefix => location.pathname.startsWith(prefix))
    )?.to ?? false

  return (
    <>
      {showNavbar && (
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/chat"
              color="inherit"
              sx={{ textDecoration: 'none', mr: 2 }}
            >
              WappLibre
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Tabs value={tabValue} textColor="inherit" indicatorColor="secondary">
                {navItems.map(item => (
                  <Tab
                    key={item.to}
                    label={item.label}
                    value={item.to}
                    component={RouterLink}
                    to={item.to}
                  />
                ))}
              </Tabs>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      <Container maxWidth={false} sx={{ mt: showNavbar ? 2 : 0 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/entities" element={<EntitiesList />} />
          <Route path="/locations" element={<LocationsList />} />
          <Route path="/edit-entity/:name" element={<EntityEdit />} />
          <Route path="/edit-entity/:name/:id" element={<EntityEdit />} />
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
