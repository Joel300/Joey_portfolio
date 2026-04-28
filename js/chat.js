/**
 * AI Chatbot Logic for Joel's Portfolio
 * Grounded in Joel's professional resume.
 */

const JOEL_RESUME_CONTEXT = `
Name: Joel Dabankah Owusu
Based in: Accra, Ghana
Summary: Detail-oriented Finance & Accounting professional + Software Developer. 10+ years in Finance (SAP ERP) and modern Dev skills (ReactJS, JavaScript, HTML, CSS).

Experience:
- Swissport Ghana Limited (2018-Present): Finance Officer. SAP ERP expert. Reduced debtors by 45%. Managed accounts payable/receivable.
- Ibis Styles Hotel (2016-2017): Accounts Officer. Bank reconciliation and tax certificate retrieval.
- Bayport Financial Services (2016): Customer Service & Operations.
- University of Ghana (2011-2016): Accounts Assistant.

Education:
- Software Development Certificate: Codetrain Ghana (2022)
- BSc Accounting: University of Professional Studies Accra (2014)
- Diploma Accounting: University of Ghana (2011)

Skills:
- Finance: SAP ERP, Financial Reporting, Tax Returns, Account Reconciliation.
- Tech: HTML, CSS, JavaScript, ReactJS, AI Integration, Prompt Engineering.
`;

const CHAT_RESPONSES = [
    { keywords: ['sap', 'erp', 'finance'], response: "Joel is an expert in SAP ERP. At Swissport, he used it daily to manage accounts and generate financial reports, successfully reducing debtors by 45%!" },
    { keywords: ['react', 'javascript', 'frontend', 'dev', 'code'], response: "Joel is proficient in ReactJS, JavaScript, HTML, and CSS. He earned his Software Development certificate from Codetrain Ghana in 2022." },
    { keywords: ['education', 'study', 'university', 'degree'], response: "Joel holds a BSc in Accounting from UPSA and a Software Development certificate from Codetrain. He also has a Diploma from the University of Ghana." },
    { keywords: ['contact', 'email', 'phone', 'reach'], response: "You can reach Joel at Joelws300@gmail.com or via the contact form on this website. He's also based in Accra, Ghana." },
    { keywords: ['experience', 'work', 'history', 'swissport'], response: "Joel has over 10 years of experience. His longest tenure is at Swissport Ghana as a Finance Officer (2018-Present), but he also worked at Ibis Styles and Bayport." },
    { keywords: ['hi', 'hello', 'hey'], response: "Hello! I'm Joel's AI assistant. I can tell you all about his work in Finance, SAP, or his newer skills in Software Development and AI!" }
];

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatWindow = document.getElementById('chat-window');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-input-area');
    const chatInput = document.getElementById('chat-input');

    // 1. Toggle Chat Visibility
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    // 2. Handle Message Sending
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Simulate AI Thinking
        showTypingIndicator();
        
        setTimeout(() => {
            const response = generateAIResponse(message);
            removeTypingIndicator();
            addMessage(response, 'ai');
        }, 1000);
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerText = text;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.classList.add('message', 'ai');
        indicator.innerText = '...';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    /**
     * GENERATE AI RESPONSE (Simulation Mode)
     * In a real app, this would call an API like OpenAI.
     */
    function generateAIResponse(input) {
        const lowercaseInput = input.toLowerCase();
        
        // Find best keyword match
        for (const item of CHAT_RESPONSES) {
            if (item.keywords.some(key => lowercaseInput.includes(key))) {
                return item.response;
            }
        }

        // Default response grounded in context
        return "That's a great question! Joel's background is a mix of Finance (specializing in SAP) and Software Development. Are you interested in his work at Swissport or his technical skills like React and AI?";
    }
});
