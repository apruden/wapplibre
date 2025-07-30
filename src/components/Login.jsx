import { useNavigate } from 'react-router-dom';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
    navigate('/chat');
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Welcome to WappLibre</h2>
              <div className="d-flex justify-content-center">
                <FacebookLogin
                  appId="your-app-id"
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={response => console.log(response)}
                  onFailure={error => console.error('Login failed:', error)}
                  onSuccess={handleLoginSuccess}
                  cssClass="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                  textButton="Login with Facebook"
                  icon="fa-facebook"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
