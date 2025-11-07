// FTL Chat Messages - JavaScript Functionality

class FTLChatApp {
    constructor() {
        this.currentChat = 'elon';
        this.isTyping = false;
        this.typingTimer = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeChatData();
        this.showTypingIndicator();
    }

    bindEvents() {
        // Navigation events
        this.bindNavigationEvents();
        
        // Member selection events
        this.bindMemberSelectionEvents();
        
        // Message input events
        this.bindMessageInputEvents();
        
        // Chat actions events
        this.bindChatActionsEvents();
    }

    bindNavigationEvents() {
        const navLinks = document.querySelectorAll('.ftl-nav-link[data-section]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link);
            });
        });
    }

    handleNavigation(clickedLink) {
        // Remove active class from all nav links
        document.querySelectorAll('.ftl-nav-link[data-section]').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // Here you can add logic to switch between different sections
        const section = clickedLink.dataset.section;
        console.log(`Switched to section: ${section}`);
    }

    bindMemberSelectionEvents() {
        const memberItems = document.querySelectorAll('.ftl-member-item[data-chat]');
        memberItems.forEach(item => {
            item.addEventListener('click', () => {
                this.selectChat(item.dataset.chat, item);
            });
        });
    }

    selectChat(chatId, memberElement) {
        // Remove active class from all member items
        document.querySelectorAll('.ftl-member-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to selected member
        memberElement.classList.add('active');
        
        // Remove unread badge
        const unreadBadge = memberElement.querySelector('.ftl-unread-badge');
        if (unreadBadge) {
            unreadBadge.remove();
        }
        
        // Update current chat
        this.currentChat = chatId;
        
        // Load chat data
        this.loadChatData(chatId);
        
        console.log(`Switched to chat: ${chatId}`);
    }

    loadChatData(chatId) {
        const chatData = this.getChatData(chatId);
        if (chatData) {
            this.updateChatHeader(chatData);
            this.loadMessages(chatData.messages);
        }
    }

    updateChatHeader(chatData) {
        const chatAvatar = document.querySelector('.ftl-chat-header .ftl-avatar');
        const chatUserName = document.querySelector('.ftl-chat-user-name');
        const chatUserStatus = document.querySelector('.ftl-chat-user-status');
        
        if (chatAvatar) chatAvatar.src = chatData.avatar;
        if (chatUserName) chatUserName.textContent = chatData.name;
        if (chatUserStatus) chatUserStatus.textContent = chatData.status;
    }

    loadMessages(messages) {
        const messagesContainer = document.querySelector('.ftl-chat-messages');
        
        // Clear existing messages except typing indicator
        const typingIndicator = messagesContainer.querySelector('.ftl-typing-indicator');
        messagesContainer.innerHTML = '';
        
        // Add messages
        messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });
        
        // Re-add typing indicator
        if (typingIndicator) {
            messagesContainer.appendChild(typingIndicator);
        }
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ftl-message ftl-message-${message.type}`;
        
        let messageHTML = '';
        
        if (message.type === 'received') {
            messageHTML = `
                <div class="ftl-message-avatar">
                    <img src="${message.avatar}" alt="${message.sender}" class="ftl-avatar">
                </div>
            `;
        }
        
        messageHTML += `
            <div class="ftl-message-content">
                <div class="ftl-message-bubble">
                    ${message.text}
                </div>
                <div class="ftl-message-time">${message.time}</div>
            </div>
        `;
        
        messageDiv.innerHTML = messageHTML;
        return messageDiv;
    }

    bindMessageInputEvents() {
        const messageInput = document.querySelector('.ftl-message-input');
        const sendButton = document.querySelector('.ftl-btn-primary');
        
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            messageInput.addEventListener('input', () => {
                this.handleTyping();
            });
        }
        
        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });
        }
    }

    sendMessage() {
        const messageInput = document.querySelector('.ftl-message-input');
        const messageText = messageInput.value.trim();
        
        if (messageText === '') return;
        
        // Create and add message
        const message = {
            type: 'sent',
            text: messageText,
            time: this.getCurrentTime(),
            sender: 'You'
        };
        
        this.addMessage(message);
        
        // Clear input
        messageInput.value = '';
        
        // Simulate response after a delay
        setTimeout(() => {
            this.simulateResponse();
        }, 1000 + Math.random() * 2000);
    }

    addMessage(message) {
        const messagesContainer = document.querySelector('.ftl-chat-messages');
        const typingIndicator = messagesContainer.querySelector('.ftl-typing-indicator');
        
        const messageElement = this.createMessageElement(message);
        
        if (typingIndicator) {
            messagesContainer.insertBefore(messageElement, typingIndicator);
        } else {
            messagesContainer.appendChild(messageElement);
        }
        
        this.scrollToBottom();
    }

    simulateResponse() {
        const responses = [
            "Lorem ipsum dolor sit amet.",
            "Consectetur adipiscing elit.",
            "Sed do eiusmod tempor incididunt.",
            "Ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam.",
            "Quis nostrud exercitation ullamco.",
            "Duis aute irure dolor in reprehenderit.",
            "Excepteur sint occaecat cupidatat."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const currentChatData = this.getChatData(this.currentChat);
        
        const message = {
            type: 'received',
            text: randomResponse,
            time: this.getCurrentTime(),
            sender: currentChatData.name,
            avatar: currentChatData.avatar
        };
        
        this.addMessage(message);
    }

    handleTyping() {
        // Clear existing timer
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        
        // Show typing indicator (in a real app, this would notify other users)
        this.typingTimer = setTimeout(() => {
            // Hide typing indicator after user stops typing
        }, 2000);
    }

    showTypingIndicator() {
        // The typing indicator is already in the HTML
        // In a real app, this would be controlled by WebSocket events
        setTimeout(() => {
            const typingIndicator = document.querySelector('.ftl-typing-indicator');
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
        }, 5000);
    }

    bindChatActionsEvents() {
        const voiceButton = document.querySelector('[title="Voice call"]');
        const videoButton = document.querySelector('[title="Video call"]');
        const moreButton = document.querySelector('[title="More options"]');
        const attachButton = document.querySelector('[title="Attach file"]');
        const emojiButton = document.querySelector('[title="Emoji"]');
        
        if (voiceButton) {
            voiceButton.addEventListener('click', () => {
                this.handleVoiceCall();
            });
        }
        
        if (videoButton) {
            videoButton.addEventListener('click', () => {
                this.handleVideoCall();
            });
        }
        
        if (moreButton) {
            moreButton.addEventListener('click', () => {
                this.showMoreOptions();
            });
        }
        
        if (attachButton) {
            attachButton.addEventListener('click', () => {
                this.handleFileAttach();
            });
        }
        
        if (emojiButton) {
            emojiButton.addEventListener('click', () => {
                this.showEmojiPicker();
            });
        }
    }

    handleVoiceCall() {
        console.log('Starting voice call...');
        alert('Voice call feature would be implemented here');
    }

    handleVideoCall() {
        console.log('Starting video call...');
        alert('Video call feature would be implemented here');
    }

    showMoreOptions() {
        console.log('Showing more options...');
        alert('More options menu would be implemented here');
    }

    handleFileAttach() {
        console.log('Opening file picker...');
        
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*,document/*';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                console.log('File selected:', file.name);
                alert(`File "${file.name}" would be uploaded and sent`);
            }
        });
        
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }

    showEmojiPicker() {
        console.log('Showing emoji picker...');
        
        const emojis = ['😀', '😊', '👍', '❤️', '😂', '🎉', '👋', '🔥'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        const messageInput = document.querySelector('.ftl-message-input');
        if (messageInput) {
            messageInput.value += randomEmoji;
            messageInput.focus();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.querySelector('.ftl-chat-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${displayHours}:${displayMinutes} ${ampm}`;
    }

    initializeChatData() {
        // This would typically come from an API
        this.chatData = {
            elon: {
                name: 'Elon Musk',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
                status: 'Active now',
                messages: [
                    {
                        type: 'received',
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        time: '2:30 PM',
                        sender: 'Elon Musk',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                    },
                    {
                        type: 'sent',
                        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                        time: '2:32 PM',
                        sender: 'You'
                    },
                    {
                        type: 'received',
                        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
                        time: '2:35 PM',
                        sender: 'Elon Musk',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                    },
                    {
                        type: 'sent',
                        text: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
                        time: '2:36 PM',
                        sender: 'You'
                    },
                    {
                        type: 'received',
                        text: "Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
                        time: '2:37 PM',
                        sender: 'Elon Musk',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                    }
                ]
            },
            tim: {
                name: 'Tim Cook',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
                status: 'Active 5 minutes ago',
                messages: [
                    {
                        type: 'received',
                        text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.",
                        time: '1:15 PM',
                        sender: 'Tim Cook',
                        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
                    },
                    {
                        type: 'sent',
                        text: "Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit voluptate velit esse.",
                        time: '1:18 PM',
                        sender: 'You'
                    }
                ]
            },
            satya: {
                name: 'Satya Nadella',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
                status: 'Active now',
                messages: [
                    {
                        type: 'received',
                        text: "Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
                        time: '12:45 PM',
                        sender: 'Satya Nadella',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
                    },
                    {
                        type: 'sent',
                        text: "Id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem.",
                        time: '12:47 PM',
                        sender: 'You'
                    }
                ]
            },
            sundar: {
                name: 'Sundar Pichai',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
                status: 'Active 2 hours ago',
                messages: [
                    {
                        type: 'received',
                        text: "Aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.",
                        time: '11:30 AM',
                        sender: 'Sundar Pichai',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                    }
                ]
            },
            jensen: {
                name: 'Jensen Huang',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
                status: 'Active now',
                messages: [
                    {
                        type: 'received',
                        text: "Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                        time: '10:15 AM',
                        sender: 'Jensen Huang',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
                    }
                ]
            },
            team: {
                name: 'Fortune 500 CEOs',
                avatar: '',
                status: '15 members online',
                messages: [
                    {
                        type: 'received',
                        text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
                        time: '3 days ago',
                        sender: 'Marc Benioff',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
                    },
                    {
                        type: 'received',
                        text: "Incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam.",
                        time: '3 days ago',
                        sender: 'Elon Musk',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                    }
                ]
            }
        };
    }

    getChatData(chatId) {
        return this.chatData[chatId] || null;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FTLChatApp();
});

// Responsive menu toggle (for mobile)
function toggleMobileMenu() {
    const membersSidebar = document.querySelector('.ftl-sidebar-members');
    if (membersSidebar) {
        membersSidebar.classList.toggle('show');
    }
}

// Add mobile menu toggle functionality if needed
if (window.innerWidth <= 768) {
    const chatHeader = document.querySelector('.ftl-chat-header');
    if (chatHeader) {
        const menuButton = document.createElement('button');
        menuButton.className = 'ftl-btn d-md-none';
        menuButton.innerHTML = '<i class="bi bi-list"></i>';
        menuButton.addEventListener('click', toggleMobileMenu);
        
        const chatActions = chatHeader.querySelector('.ftl-chat-actions');
        if (chatActions) {
            chatActions.insertBefore(menuButton, chatActions.firstChild);
        }
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const membersSidebar = document.querySelector('.ftl-sidebar-members');
        if (membersSidebar) {
            membersSidebar.classList.remove('show');
        }
    }
});