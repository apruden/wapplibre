import { useState } from 'react';
import { Map, NavigationControl, Marker, Popup } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Box,
  Button,
  Chip,
  Typography,
  Tab,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LocationsList() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Sample location data - in a real app, this would come from your API
  const locations = [
    {
      id: 1,
      name: 'Main Office',
      coordinates: [-122.4194, 37.7749], // San Francisco
      address: '123 Market St, San Francisco, CA',
      type: 'office',
      imageUrl: 'https://placeholder.pics/svg/300',
    },
    {
      id: 2,
      name: 'Downtown Branch',
      coordinates: [-122.4078, 37.7832], // SF Financial District
      address: '456 Montgomery St, San Francisco, CA',
      type: 'branch',
      imageUrl: 'https://placeholder.pics/svg/300',
    },
    {
      id: 3,
      name: 'Tech Hub',
      coordinates: [-122.3977, 37.7896], // SF SOMA
      address: '789 Howard St, San Francisco, CA',
      type: 'office',
      imageUrl: 'https://placeholder.pics/svg/300',
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
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Item One" value="1" />
          <Tab label="Item Two" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <Box sx={{ width: '80vw', height: '80vh' }}>
          <Grid container spacing={1} columns={{ xs: 12, md: 3 }}>
            {locations.map((location) => (
              <Grid item key={location.id} xs={12} md={4}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={location.imageUrl}
                    alt={location.name}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                      {location.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {location.name} - {location.address}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                    <Button size="small" color="secondary">
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Box>
      </TabPanel>
      <TabPanel value="2">
        <Map
          style={{ width: '80vw', height: '80vh', zIndex: 0 }}
          initialViewState={initialViewState}
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
                  width: 12,
                  height: 12,
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
      </TabPanel>
    </TabContext>
  );
}
