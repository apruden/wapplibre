import { useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

export default function EntitiesSummary() {
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
    <Container fluid className="py-4">
      <Row className="mb-3">
        <Col>
          <h2 className="mb-0">Entities Summary</h2>
          <div className="text-muted">Overview of entities with quick actions</div>
        </Col>
      </Row>

      <Row className="g-3 g-md-4">
        {entities.map((e) => (
          <Col key={e.id} xs={12} md={6} lg={4}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2">{e.name}</Card.Title>
                <Card.Text className="flex-grow-1 text-muted">{e.description}</Card.Text>
                <div className="d-grid">
                  <Button
                    variant="primary"
                    onClick={() => handleSubmit(e)}
                    disabled={submittingId === e.id}
                  >
                    {submittingId === e.id ? 'Submitting…' : 'Submit'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
