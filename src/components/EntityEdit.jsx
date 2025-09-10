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

  const formData = { };

  const handleSubmit = ({ formData }) => {

    client.request('saveEntity', { id, name, data: formData })
      .then(() => {
        navigate('/chat');
      })
      .catch((err) => {
        console.error('Failed to update entity:', err);
      });
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
