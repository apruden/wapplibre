import { useNavigate, useParams } from 'react-router-dom';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import client from '../utils/client';

export default function EntityEdit() {
  const { name, id } = useParams();
  const navigate = useNavigate();

  console.log('Editing entity:', name, 'with ID:', id);

  // Load schema from backend via JSON-RPC
  const [schema, setSchema] = useState({ model: {}, ui: {} });
  useEffect(() => {
    let active = true;

    client
      .request('getEntitySchema', { name })
      .then((res) => {
        if (active && res) setSchema(res);
      })
      .catch((err) => {
        console.error('Failed to load schema:', err);
      });

    return () => {
      active = false;
    };
  }, [name]);

  console.log('Received schema:', schema);

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
    <Grid container justifyContent="center">
      <Form
        schema={schema.model}
        uiSchema={schema.ui}
        validator={validator}
        formData={formData}
        onSubmit={handleSubmit}
        onError={handleError}
        className="edit-entity-form"
      />
    </Grid>
  );
}
