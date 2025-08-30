import { useNavigate } from 'react-router-dom';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import { Container, Box, Card, CardContent, Typography, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
    navigate('/chat');
  };

  return (
    <Container maxWidth="sm">
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default">
        <Card elevation={3} sx={{ width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome to WappLibre
            </Typography>
            <Box display="flex" justifyContent="center">
              <FacebookLogin
                appId="your-app-id"
                autoLoad
                fields="name,email,picture"
                onFail={(error) => console.error('Login failed:', error)}
                onFailure={(error) => console.error('Login failed:', error)}
                onSuccess={handleLoginSuccess}
                callback={(response) => console.log(response)}
                render={({ onClick }) => (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onClick}
                    startIcon={<FacebookIcon />}
                    fullWidth
                  >
                    Login with Facebook
                  </Button>
                )}
              />
<GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log('Google credential:', credentialResponse)
                      handleLoginSuccess(credentialResponse)
                    }}
                    onError={() => {
                      console.error('Google Login Failed')
                    }}
                    useOneTap
                  />

                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log('Google credential:', credentialResponse)
                      handleLoginSuccess(credentialResponse)
                    }}
                    onError={() => {
                      console.error('Google Login Failed')
                    }}
                    useOneTap
                  />

            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
