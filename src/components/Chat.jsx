import { useState } from 'react';
import { ChatList } from 'react-chat-elements';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'react-chat-elements/dist/main.css';

// Add minimal custom styles for the chat list
const style = document.createElement('style');
style.textContent = `
  .chat-list {
    height: calc(100vh - 56px);
    overflow-y: auto;
  }
  .chat-list .rce-container-clist {
    height: 100%;
  }
`;
document.head.appendChild(style);

export default function Chat() {
  // Sample chat data
  const [chatList] = useState([
    {
      id: 1,
      avatar: 'https://avatars.githubusercontent.com/u/1',
      alt: 'User1',
      title: 'John Doe',
      subtitle: 'Hey, how are you?',
      date: new Date(),
      unread: 2,
    },
    {
      id: 2,
      avatar: 'https://avatars.githubusercontent.com/u/2',
      alt: 'User2',
      title: 'Jane Smith',
      subtitle: 'Are we meeting today?',
      date: new Date(Date.now() - 3600000), // 1 hour ago
      unread: 0,
    },
    {
      id: 3,
      avatar: 'https://avatars.githubusercontent.com/u/3',
      alt: 'User3',
      title: 'Mike Johnson',
      subtitle: 'The project is ready for review',
      date: new Date(Date.now() - 86400000), // 1 day ago
      unread: 1,
    }
  ]);

  const handleChatClick = (chat) => {
    console.log('Chat clicked:', chat);
    // Handle chat selection here
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 g-0">
        <Col md={4} lg={3} className="h-100 border-end">
          <Card className="h-100 border-0 rounded-0">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Chats</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <ChatList
                className="chat-list"
                dataSource={chatList}
                onClick={handleChatClick}
              />
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8} lg={9} className="h-100 d-flex align-items-center justify-content-center bg-light">
          <Card className="text-center border-0 bg-transparent">
            <Card.Body>
              <h3 className="text-muted">Select a chat to start messaging</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
