import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { faker } from '@faker-js/faker';

// --- Data Generation ---

const generateUsers = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatarUrl: faker.image.avatar(),
  }));
};

const generateMessages = (users, count)  => {
  const messages = [];
  for (let i = 0; i < count; i++) {
    const sender = users[i % users.length]; // Alternate senders
    messages.push({
      id: faker.string.uuid(),
      userId: sender.id,
      text: faker.lorem.sentence({ min: 5, max: 20 }),
      timestamp: faker.date.recent({ days: 1 }),
    });
  }
  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

const users = generateUsers(5);
const initialMessages = generateMessages(users, 20);
const currentUser = users[0]; // Assume the first user is the current user

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChatUser, setSelectedChatUser] = useState(users[1] || null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960); // md breakpoint is 960px
  const [showUserListMobile, setShowUserListMobile] = useState(isMobile ? true : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setShowUserListMobile(false); // Always show chat on desktop
    } else {
      setShowUserListMobile(true); // Always show user list on mobile initially
    }
  }, [isMobile]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChatUser) {
      const message = {
        id: faker.string.uuid(),
        userId: currentUser.id,
        text: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  const getUserById = (id) => users.find((user) => user.id === id);

  const handleUserClick = (user) => {
    setSelectedChatUser(user);
    if (isMobile) {
      setShowUserListMobile(false);
    }
  };

  const handleBackButtonClick = () => {
    setShowUserListMobile(true);
    setSelectedChatUser(null);
  };

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#f0f2f5' 
      }}>
      <Box
        sx={{
          width: isMobile ? '100vw' : '20vw',
          flexGrow: 1,
          display: isMobile && !showUserListMobile ? 'none' : 'flex',
          flexDirection: 'column',
          overflowX: 'scroll',
          backgroundColor: '#ff00ff',
        }}
      >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#212121', fontSize: '1.1rem' }}>
            Contacts
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                alignItems="flex-start"
                onClick={() => handleUserClick(user)}
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedChatUser?.id === user.id ? '#e0e0e0' : 'transparent',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  paddingLeft: '8px',
                  paddingRight: '8px',
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component="span" variant="subtitle1" sx={{ fontWeight: 500, fontSize: '1rem', color: '#212121' }}>
                      {user.name}
                    </Typography>
                  }
                  secondary={
                    <Typography component="span" variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
                      {faker.lorem.words(3)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
      </Box>  
      <Box
        sx={{
          width: isMobile ? '100vw' : '60vw',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
          <Paper elevation={1} sx={{
            mt: 12,
            position: 'fixed',
            top: 0,
            width: '60vw', 
            backgroundColor: '#ffff00', 
            borderBottom: '1px solid #e0e0e0',
            display: 'flex', 
            alignItems: 'center',
            borderRadius: '8px 8px 0 0'
            }}>
            {isMobile && (
              <IconButton onClick={handleBackButtonClick} sx={{ mr: 1 }}>
                <KeyboardBackspaceIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212121', fontSize: '1.1rem' }}>
              {selectedChatUser ? selectedChatUser.name : 'Select a chat'}
            </Typography>
          </Paper>

          <Box sx={{ 
            flexGrow: 1, 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column',
            width: '60vw',
            gap: 2,
            }}>
            {selectedChatUser ? (
              messages
                .filter(
                  (message) =>
                    (message.userId === currentUser.id && message.userId === selectedChatUser.id) ||
                    (message.userId === currentUser.id && getUserById(message.userId)?.id === currentUser.id && getUserById(message.userId)?.id === selectedChatUser.id) ||
                    (message.userId === selectedChatUser.id && getUserById(message.userId)?.id === selectedChatUser.id && getUserById(message.userId)?.id === currentUser.id) ||
                    (message.userId === currentUser.id && selectedChatUser.id === message.userId) ||
                    (message.userId === selectedChatUser.id && currentUser.id === message.userId)
                )
                .map((message) => {
                  const sender = getUserById(message.userId);
                  const isCurrentUser = message.userId === currentUser.id;
                  return (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {!isCurrentUser && sender && (
                        <Avatar alt={sender.name} src={sender.avatarUrl} sx={{ mr: 1, width: 40, height: 40 }} />
                      )}
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          maxWidth: '70%',
                          borderRadius: '20px',
                          backgroundColor: isCurrentUser ? '#e3f2fd' : '#ffffff',
                          borderColor: isCurrentUser ? '#90caf9' : '#e0e0e0',
                          boxShadow: isCurrentUser ? '0px 2px 4px rgba(0,0,0,0.05)' : 'none',
                        }}
                      >
                        <Typography variant="body2" sx={{ color: '#212121', fontSize: '0.875rem' }}>
                          {message.text}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, textAlign: isCurrentUser ? 'right' : 'left', color: '#757575', fontSize: '0.75rem' }}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </Paper>
                      {isCurrentUser && sender && (
                        <Avatar alt={sender.name} src={sender.avatarUrl} sx={{ ml: 1, width: 40, height: 40 }} />
                      )}
                    </Box>
                  );
                })
            ) : (
              <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: '#757575', fontSize: '1.1rem' }}>
                Select a contact to start chatting
              </Typography>
            )}
          </Box>

          <Paper elevation={3} sx={{ 
            pt: 2,
            pb: 2,
            width: '60vw',
            position: 'fixed',
            bottom: 0,
            backgroundColor: '#00ffff', 
            borderTop: '1px solid #e0e0e0', 
            borderRadius: '0 0 8px 8px',
             }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                size="small"
                disabled={!selectedChatUser}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '25px',
                    paddingRight: 0,
                    backgroundColor: '#f5f5f5',
                    '&:hover fieldset': {
                      borderColor: '#bdbdbd',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& fieldset': { border: 'none' },
                }}
              />
              <IconButton color="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || !selectedChatUser}
                sx={{ color: '#1976d2' }}>
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
      </Box>
    </Box>
  );
}