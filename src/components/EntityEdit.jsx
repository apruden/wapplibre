import { useNavigate } from 'react-router-dom';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { Row, Col, Card } from 'react-bootstrap';

export default function EntityEdit() {
  const navigate = useNavigate();

  // Define the JSON Schema for user entity
  const schema = {
    type: 'object',
    required: ['username', 'email'],
    properties: {
      username: {
        type: 'string',
        title: 'Username',
        minLength: 3,
        maxLength: 30
      },
      email: {
        type: 'string',
        title: 'Email',
        format: 'email'
      },
      firstName: {
        type: 'string',
        title: 'First Name'
      },
      lastName: {
        type: 'string',
        title: 'Last Name'
      },
      phone: {
        type: 'string',
        title: 'Phone Number',
        pattern: '^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$'
      },
      birthDate: {
        type: 'string',
        title: 'Birth Date',
        format: 'date'
      },
      address: {
        type: 'object',
        title: 'Address',
        properties: {
          street: {
            type: 'string',
            title: 'Street'
          },
          city: {
            type: 'string',
            title: 'City'
          },
          state: {
            type: 'string',
            title: 'State'
          },
          zipCode: {
            type: 'string',
            title: 'ZIP Code',
            pattern: '^[0-9]{5}(?:-[0-9]{4})?$'
          }
        }
      }
    }
  };

  // Define UI Schema for custom layout and widgets
  const uiSchema = {
    'ui:order': ['username', 'email', 'firstName', 'lastName', 'phone', 'birthDate', 'address'],
    username: {
      'ui:placeholder': 'Enter username'
    },
    email: {
      'ui:placeholder': 'Enter email address'
    },
    phone: {
      'ui:placeholder': '(123) 456-7890'
    },
    address: {
      'ui:order': ['street', 'city', 'state', 'zipCode']
    }
  };

  // Sample initial form data
  const formData = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  };

  const handleSubmit = ({ formData }) => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    // For now, we'll just log it and show a success message
    alert('User data saved successfully!');
    navigate('/chat'); // Navigate back to chat or wherever appropriate
  };

  const handleError = (errors) => {
    console.log('Form validation errors:', errors);
  };

  return (
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header as="h4" className="bg-primary text-white">
              Edit User Profile
            </Card.Header>
            <Card.Body>
              <Form
                schema={schema}
                uiSchema={uiSchema}
                validator={validator}
                formData={formData}
                onSubmit={handleSubmit}
                onError={handleError}
                className="edit-entity-form"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
}
