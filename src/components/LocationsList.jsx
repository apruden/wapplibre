import { useState } from 'react';
import { Map, NavigationControl, Marker, Popup } from '@vis.gl/react-maplibre';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
  Box,
  Chip,
  Typography,
} from '@mui/material';

export default function LocationsList() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Sample location data - in a real app, this would come from your API
  const locations = [
    {
      id: 1,
      name: 'Main Office',
      coordinates: [-122.4194, 37.7749], // San Francisco
      address: '123 Market St, San Francisco, CA',
      type: 'office',
    },
    {
      id: 2,
      name: 'Downtown Branch',
      coordinates: [-122.4078, 37.7832], // SF Financial District
      address: '456 Montgomery St, San Francisco, CA',
      type: 'branch',
    },
    {
      id: 3,
      name: 'Tech Hub',
      coordinates: [-122.3977, 37.7896], // SF SOMA
      address: '789 Howard St, San Francisco, CA',
      type: 'office',
    },
  ];

  // Map configuration
  const initialViewState = {
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 10,
  };

  const getMarkerColor = (type) => {
    switch (type) {
      case 'office':
        return '#0066cc';
      case 'branch':
        return '#28a745';
      default:
        return '#dc3545';
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '320px 1fr', md: '360px 1fr' },
          width: '100%',
          height: 'calc(100vh - 64px)',
        }}
      >
        {/* Left sidebar card */}
        <Card sx={{ height: '100%', borderRadius: 0, boxShadow: 'none' }}>
          <CardHeader
            title={<Typography variant="h6">Locations</Typography>}
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
          />
          <CardContent sx={{ p: 0, height: 'calc(100% - 64px)' }}>
            <Box sx={{ height: '100%', overflow: 'auto' }}>
              <List disablePadding>
                {locations.map((location) => (
                  <ListItem key={location.id} disablePadding>
                    <ListItemButton
                      selected={selectedLocation?.id === location.id}
                      onClick={() => setSelectedLocation(location)}
                      sx={{ alignItems: 'flex-start', py: 1.5, px: 2 }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: getMarkerColor(location.type),
                          mt: '6px',
                          mr: 1.5,
                          flex: '0 0 auto',
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle1" noWrap>
                          {location.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {location.address}
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                          <Chip label={location.type} size="small" color="default" />
                        </Box>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>

        {/* Right map area filling remaining space */}
        <Box sx={{ width: '100%', height: '100%' }}>
          <Map
            initialViewState={initialViewState}
            style={{ width: '100%', height: '100%' }}
            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=euWhRAhzgWGOexN5Fzkd"
          >
            <NavigationControl position="top-right" />

            {locations.map((location) => (
              <Marker
                key={location.id}
                longitude={location.coordinates[0]}
                latitude={location.coordinates[1]}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedLocation(location);
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: getMarkerColor(location.type),
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  }}
                />
              </Marker>
            ))}

            {selectedLocation && (
              <Popup
                longitude={selectedLocation.coordinates[0]}
                latitude={selectedLocation.coordinates[1]}
                offset={[0, -10]}
                onClose={() => setSelectedLocation(null)}
                closeButton
                closeOnClick={false}
              >
                <Typography variant="subtitle1" gutterBottom>
                  {selectedLocation.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {selectedLocation.address}
                </Typography>
                <Chip label={selectedLocation.type} size="small" />
              </Popup>
            )}
          </Map>
        </Box>
      </Box>
    </Container>
  );
}
