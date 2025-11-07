# Chat Messages Template

A modern, responsive chat messages interface built with Bootstrap 5, Bootstrap Icons, and professionally organized custom CSS. Features a clean design with sidebar navigation, member list, and real-time messaging interface. All content uses Lorem Ipsum text for template demonstration purposes.

<img width="1723" height="919" alt="teams-chat-free-template" src="https://github.com/user-attachments/assets/288d4af2-7419-4ffe-a750-86a63c110780" />

## 🚀 Features

- **Modern Chat Interface**: Clean and intuitive design for seamless messaging
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Bootstrap 5 Integration**: Built with the latest Bootstrap framework for consistency and reliability
- **Bootstrap Icons**: Comprehensive icon set for all UI elements
- **Organized CSS Architecture**: Professionally structured CSS with 12 logical sections and quick reference guide
- **Lorem Ipsum Content**: Template-ready with placeholder text for easy customization
- **Custom CSS with FTL Prefix**: All custom styles use the "ftl" prefix to avoid conflicts
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Multi-section Sidebar**: Icons sidebar with activity, chats, calendar, and groups sections
- **Member Management**: Members sidebar with online status indicators and unread message badges
- **Real-time Messaging**: Message bubbles with timestamps and typing indicators
- **Accessible Design**: WCAG-compliant color contrast and keyboard navigation support
- **Polurus Branding**: Integrated with Polurus API images for consistent visual identity

## 🎨 Design

### Brand Colors
- **Primary Color**: `#13334C` - A professional dark blue used throughout the interface
- **No Gradients**: Clean, flat design without gradient effects for modern aesthetics
- **Consistent Styling**: All custom CSS uses the "ftl" prefix for maintainability
- **Template Ready**: Uses Lorem Ipsum text and Polurus placeholder images

### CSS Architecture
The stylesheet is professionally organized into 12 logical sections:
1. **CSS Variables** - Color scheme and design tokens
2. **Base Styles** - HTML/body foundations
3. **Left Sidebar** - Navigation icons
4. **Center Sidebar** - Members list and search
5. **Main Chat** - Chat window and header
6. **Messages** - Message bubbles and content
7. **Typing Indicator** - Animated typing status
8. **Chat Input** - Message input area
9. **Animations** - Keyframe effects
10. **Scrollbar** - Custom scrollbar styling
11. **Responsive** - Mobile/tablet breakpoints
12. **Utilities** - Helper classes

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│ Icons Sidebar │ Members Sidebar │     Chat Window       │
│              │                │                       │
│   Activity   │   Search Bar   │     Chat Header       │
│   Chats      │   Member List  │     Messages Area     │
│   Calendar   │   - Online     │     Message Input     │
│   Groups     │   - Away       │                       │
│   Settings   │   - Offline    │                       │
└─────────────────────────────────────────────────────────┘
```

## 📁 File Structure

```
bootstrap/teams-chat/
├── index.html          # Main HTML file with complete chat interface
├── styles.css          # Professionally organized CSS with 12 sections
├── scripts.js          # JavaScript functionality with Lorem Ipsum responses
└── README.md           # Project documentation (this file)
```

### File Details
- **index.html**: Complete chat interface with Polurus branding and Lorem Ipsum content
- **styles.css**: 500+ lines of organized CSS with quick reference guide and alphabetical properties
- **scripts.js**: Interactive functionality with Lorem Ipsum message responses and chat switching
- **README.md**: Comprehensive documentation with setup and customization guides

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Custom styling with CSS variables and modern features
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **Bootstrap 5.3.0**: UI framework for responsive layout and components
- **Bootstrap Icons 1.11.0**: Icon library for consistent iconography
- **Polurus API Images**: Consistent branding with `https://api.polurus.com/images/polurus.png`

## 🚦 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required - all resources are loaded via CDN

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! The website is ready to use

### Local Development
```bash
# Navigate to the project directory
cd bootstrap/teams-chat

# Open with a local server (recommended)
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have it installed)
npx http-server

# Then open http://localhost:8000 in your browser
```

### Template Customization
1. **Replace Lorem Ipsum**: Update all message content in both `index.html` and `scripts.js`
2. **Update Images**: Replace Polurus API images with your own branding
3. **Modify Colors**: Update CSS variables in the `:root` section
4. **Add Real Data**: Replace sample chat data with API integration

## 💡 Features Overview

### Icons Sidebar
- **Activity**: Notifications and activity feed
- **Chats**: Main messaging interface (default active)
- **Calendar**: Schedule and events
- **Groups**: Group conversations and channels
- **Settings**: User preferences and configuration

### Members Sidebar
- **Search Functionality**: Filter conversations by name or content
- **Online Status Indicators**: 
  - 🟢 Green: Online
  - 🟡 Yellow: Away
  - ⚫ Gray: Offline
- **Unread Message Badges**: Visual indicators for new messages
- **Contact Information**: Names, last messages, and timestamps

### Chat Window
- **Real-time Messages**: Sent and received message bubbles
- **Typing Indicators**: Animated dots showing when someone is typing
- **Message Timestamps**: Time display for each message
- **Chat Actions**: Voice call, video call, and more options
- **File Attachment**: Support for file uploads (placeholder functionality)
- **Emoji Support**: Emoji picker integration (basic implementation)

## 🎯 Interactive Features

### JavaScript Functionality
- **Dynamic Chat Switching**: Click on different contacts to switch conversations
- **Message Sending**: Type and send messages with Enter key or send button
- **Responsive Navigation**: Mobile-friendly sidebar toggle
- **Lorem Ipsum Responses**: Automatic Lorem Ipsum responses for demonstration
- **Typing Detection**: Shows when user is typing
- **Scroll Management**: Auto-scroll to bottom on new messages
- **Template Data**: Pre-loaded with Lorem Ipsum conversations for easy testing

### Responsive Behavior
- **Desktop**: Full three-column layout
- **Tablet**: Collapsible sidebar with overlay
- **Mobile**: Stack layout with hamburger menu

## 🎨 Customization

### Color Scheme
The design uses CSS custom properties (variables) for easy color customization:

```css
:root {
    --ftl-primary-color: #13334C;    /* Main brand color */
    --ftl-light-bg: #f8f9fa;         /* Light background */
    --ftl-white: #ffffff;            /* Pure white */
    --ftl-text-dark: #2c3e50;       /* Dark text */
    --ftl-text-muted: #6c757d;      /* Muted text */
    --ftl-border-color: #e9ecef;    /* Border color */
}
```

### FTL CSS Classes
All custom CSS classes use the "ftl" prefix for namespace safety:
- `.ftl-sidebar-icons` - Left navigation bar
- `.ftl-sidebar-members` - Center members list
- `.ftl-member-item` - Individual member cards
- `.ftl-chat-window` - Main chat container
- `.ftl-message-bubble` - Message styling
- `.ftl-typing-indicator` - Animated typing dots
- And 50+ more organized classes...

### CSS Quick Reference
The CSS file includes a comprehensive quick reference section with:
- 📋 Table of contents with 12 sections
- 🎨 Complete color scheme reference
- 📱 Responsive breakpoint guide
- 🔍 Quick find patterns for components
- ⚡ Main component overview
- 🛠️ Utility class reference

### Adding New Features
1. **New Message Types**: Extend the `createMessageElement()` function in `scripts.js`
2. **Additional Sidebar Sections**: Add new navigation items in the icons sidebar
3. **Custom Themes**: Modify CSS variables for different color schemes
4. **Enhanced Interactions**: Extend the `FTLChatApp` class with new methods

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Configuration

### Template Data Structure
The application includes Lorem Ipsum chat data for demonstration. Replace with your real data:

```javascript
// In scripts.js - Current template structure
this.chatData = {
    elon: {
        name: 'Elon Musk',
        avatar: 'https://api.polurus.com/images/polurus.png',
        status: 'Active now',
        messages: [
            {
                type: 'received',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                time: '2:30 PM',
                sender: 'Elon Musk'
            }
            // More Lorem Ipsum messages...
        ]
    }
    // More template contacts...
};
```

### Response Templates
Automatic responses use Lorem Ipsum phrases:
```javascript
const responses = [
    "Lorem ipsum dolor sit amet.",
    "Consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt.",
    // 8 total Lorem Ipsum responses...
];
```

### API Integration Points
- User authentication
- Message sending/receiving
- Contact management
- File upload handling
- Real-time notifications (WebSocket)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Subrahmanyam Poluru**
- 🌐 Website: [https://polurus.com](https://polurus.com)
- 📧 Email: [mail.spoluru@gmail.com](mailto:mail.spoluru@gmail.com)
- 🎨 Designed and Developed by Subrahmanyam Poluru

Created as part of the FTL (Free Template Library) collection.

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) for the excellent CSS framework
- [Bootstrap Icons](https://icons.getbootstrap.com/) for the comprehensive icon set
- [Polurus API](https://api.polurus.com/) for consistent branding images
- Lorem Ipsum generators for template content
- Modern web standards and accessibility guidelines
- CSS architecture best practices for maintainable code

## 🐛 Known Issues

- All content uses Lorem Ipsum placeholder text
- Images are sourced from Polurus API for consistency
- Typing indicators are currently demonstration-only
- File upload is placeholder functionality
- Real-time messaging requires backend integration
- Mobile menu could be enhanced with swipe gestures


## 📝 Template Usage Notes

**This is a complete frontend template ready for customization:**

### ✅ What's Included:
- Professional CSS architecture with quick reference
- Lorem Ipsum content for easy replacement
- Polurus branding integration
- Responsive design for all devices
- Interactive JavaScript functionality
- Clean, maintainable code structure

### 🔄 What to Replace:
- Replace Lorem Ipsum text with real content
- Update Polurus images with your branding
- Integrate with your backend API
- Customize colors and styling as needed

### 🚀 Perfect For:
- Chat application prototypes
- Messaging interface development
- UI/UX design references
- Frontend development learning
- Template customization projects

**Note**: This is a frontend template designed for demonstration and development purposes. For production use, you'll need to integrate with a backend service for real messaging functionality.
