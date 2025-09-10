import { useState } from 'react'
import { Routes, Route, Navigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Container,
  Typography,
  Box,
} from '@mui/material'
import Login from './components/Login'
import Chat from './components/Chat'
import EntityEdit from './components/EntityEdit'
import EntitiesTable from './components/EntitiesTable'
import LocationsList from './components/LocationsList'
import CodeMirrorPage from './components/CodeMirrorPage'
import WorkflowEditor from './components/WorkflowEditor'
import EntitiesView from './components/EntitiesView'
import EntityView from './components/EntityView'

const drawerWidth = 240

function App() {
  const location = useLocation()
  const showNavbar = !location.pathname.includes('/login')

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => setMobileOpen(prev => !prev)

  const navItems = [
    { label: 'Chat', to: '/chat' },
    { label: 'Entities', to: '/entities/user/table', 
      matches: ['/entities/user/table', '/entities/user/table'] },
    { label: 'Locations', to: '/locations' },
    { label: 'CodeMirror', to: '/codemirror' },
    { label: 'Workflow', to: '/workflow' },
  ]

  const isActive = (item) => (item.matches ?? [item.to]).some(prefix => location.pathname.startsWith(prefix))

  const drawer = (
    <Box sx={{ textAlign: 'left' }}>
      <Toolbar sx={{ px: 2 }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/chat"
          color="inherit"
          sx={{ textDecoration: 'none' }}
        >
          WappLibre
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItemButton
            key={item.to}
            component={RouterLink}
            to={item.to}
            selected={isActive(item)}
            onClick={isSmall ? handleDrawerToggle : undefined}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {showNavbar && (
        <>
          <AppBar
            position="fixed"
            color="primary"
            sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` } }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open navigation"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component={RouterLink}
                to="/chat"
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                WappLibre
              </Typography>
            </Toolbar>
          </AppBar>

          <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
            {/* Mobile temporary drawer */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            >
              {drawer}
            </Drawer>

            {/* Desktop permanent drawer */}
            <Drawer
              variant="permanent"
              open
              sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            >
              {drawer}
            </Drawer>
          </Box>
        </>
      )}

      <Box
        component="main"
        sx={{
          p: 3,
        }}
      >
        {showNavbar && <Toolbar />}
          <Routes>
            <Route path="/entities/:name/table" element={<EntitiesTable />} />
            <Route path="/entities/:name/view" element={<EntitiesView />} />
            <Route path="/entities/:name/new" element={<EntityEdit />} />
            <Route path="/entities/:name/:id/edit" element={<EntityEdit />} />
            <Route path="/entities/:name/:id" element={<EntityView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/locations" element={<LocationsList />} />
            <Route path="/codemirror" element={<CodeMirrorPage />} />
            <Route path="/workflow" element={<WorkflowEditor />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
      </Box>
    </Box>
  )
}

export default App
