import { useState } from 'react'
import { Container, Card, CardContent, CardActions, Button, Grid, Stack, Typography } from '@mui/material'

export default function EntitiesView() {
  const [submittingId, setSubmittingId] = useState(null)

  // Sample entities; replace with API data if available
  const entities = [
    { id: 'ent-1', name: 'Customer Onboarding', description: 'Workflow to register and verify new customers.' },
    { id: 'ent-2', name: 'Invoice Processing', description: 'Automated invoice ingestion and approval.' },
    { id: 'ent-3', name: 'Ticket Resolver', description: 'Support ticket triage and resolution flow.' },
  ]

  const handleSubmit = async (entity) => {
    try {
      setSubmittingId(entity.id)
      // TODO: call backend; for now just simulate
      await new Promise((res) => setTimeout(res, 800))
      // eslint-disable-next-line no-console
      console.log('Submitted entity:', entity)
    } finally {
      setSubmittingId(null)
    }
  }

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Stack>
        {entities.map((e) => (
          <Card key={e.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" gutterBottom>
                {e.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {e.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(e)}
                disabled={submittingId === e.id}
                fullWidth
              >
                {submittingId === e.id ? 'Submitting…' : 'Submit'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

    </Container>
  )
}
