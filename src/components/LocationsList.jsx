import { useState } from 'react';
import { Map, NavigationControl, Marker, Popup } from '@vis.gl/react-maplibre';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';

export default function LocationsList() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Sample location data - in a real app, this would come from your API
  const locations = [
    {
      id: 1,
      name: "Main Office",
      coordinates: [-122.4194, 37.7749], // San Francisco
      address: "123 Market St, San Francisco, CA",
      type: "office"
    },
    {
      id: 2,
      name: "Downtown Branch",
      coordinates: [-122.4078, 37.7832], // SF Financial District
      address: "456 Montgomery St, San Francisco, CA",
      type: "branch"
    },
    {
      id: 3,
      name: "Tech Hub",
      coordinates: [-122.3977, 37.7896], // SF SOMA
      address: "789 Howard St, San Francisco, CA",
      type: "office"
    }
  ];

  // Map configuration
  const initialViewState = {
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 12
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
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 g-0">
        <Col md={4} lg={3} className="h-100 border-end">
          <Card className="h-100 border-0 rounded-0">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Locations</h4>
            </Card.Header>
            <ListGroup variant="flush" className="overflow-auto" style={{ maxHeight: 'calc(100% - 56px)' }}>
              {locations.map(location => (
                <ListGroup.Item
                  key={location.id}
                  action
                  active={selectedLocation?.id === location.id}
                  onClick={() => setSelectedLocation(location)}
                  className="border-start-0 border-end-0"
                >
                  <div className="d-flex align-items-start gap-2">
                    <div 
                      style={{ 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        backgroundColor: getMarkerColor(location.type),
                        marginTop: '6px'
                      }} 
                    />
                    <div>
                      <h5 className="mb-1">{location.name}</h5>
                      <p className="mb-1 text-muted small">{location.address}</p>
                      <Badge bg="secondary">{location.type}</Badge>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        
        <Col md={8} lg={9} className="h-100 p-0">
          <Map
            initialViewState={initialViewState}
            style={{ width: '100%', height: '100%' }}
            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=euWhRAhzgWGOexN5Fzkd"
          >
            <NavigationControl position="top-right" />
          
          {locations.map(location => (
            <Marker
              key={location.id}
              longitude={location.coordinates[0]}
              latitude={location.coordinates[1]}
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedLocation(location);
              }}
            >
              <div
                style={{ 
                  width: '20px',
                  height: '20px',
                  backgroundColor: getMarkerColor(location.type),
                  borderRadius: '50%',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
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
              closeButton={true}
              closeOnClick={false}
            >
              <h5>{selectedLocation.name}</h5>
              <p>{selectedLocation.address}</p>
              <Badge bg="secondary">{selectedLocation.type}</Badge>
            </Popup>
          )}
        </Map>
        </Col>
      </Row>
    </Container>
  );
}
