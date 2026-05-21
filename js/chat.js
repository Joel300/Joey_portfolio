const CHAT_PROMPTS = [
    { label: 'SAP experience', query: 'Tell me about Joel SAP and finance experience' },
    { label: 'React projects', query: 'What React and JavaScript projects has Joel built?' },
    { label: 'Biggest win', query: 'What is Joel biggest achievement at Swissport?' },
    { label: 'Contact Joel', query: 'How can I contact Joel?' }
];

const CHAT_RESPONSES = [
    {
        keywords: ['sap', 'erp', 'finance', 'reconcil', 'payable', 'receivable', 'tax', 'vat'],
        response: 'Joel is an SAP ERP specialist. At Swissport he managed AP/AR, month-end reporting, statutory returns, and reduced debtors by 45% in three months.'
    },
    {
        keywords: ['react', 'javascript', 'frontend', 'dev', 'code', 'html', 'css', 'github'],
        response: 'Joel builds with HTML, CSS, JavaScript, and React. He completed Software Development training at Codetrain Ghana (2022) and maintains projects on GitHub.'
    },
    {
        keywords: ['education', 'study', 'university', 'degree', 'codetrain', 'upsa', 'diploma'],
        response: 'Joel holds a BSc in Accounting (UPSA, 2014), a Diploma from the University of Ghana (2011), and a Software Development certificate from Codetrain (2022).'
    },
    {
        keywords: ['contact', 'email', 'phone', 'reach', 'hire'],
        response: 'Email Joelws300@gmail.com, call +233 20 754 4675, use the contact form on this site, or download his resume from the hero section.'
    },
    {
        keywords: ['achievement', 'win', 'result', 'swissport', 'debtor', 'dso', '45'],
        response: 'A standout result: Joel reduced Swissport debtors by 45% in three months through tighter collections, customer follow-up, and process discipline.'
    },
    {
        keywords: ['experience', 'work', 'history', 'bayport', 'ibis'],
        response: 'Joel has 10+ years of experience: Swissport (2018–present), Ibis Styles (2016–2017), Bayport Financial Services (2016), plus earlier accounting roles.'
    },
    {
        keywords: ['skill', 'strength', 'tool'],
        response: 'Core skills: SAP ERP, financial reporting, reconciliation, React, JavaScript, teamwork, and process improvement across finance and software teams.'
    },
    {
        keywords: ['hi', 'hello', 'hey', 'help'],
        response: "Hello! I answer quick questions about Joel's finance background, software projects, education, and contact details. Try a suggested prompt below."
    }
];

const getDefaultResponse = () =>
    "Joel blends finance operations (SAP ERP, reporting, collections) with frontend development (React, JavaScript). Ask about SAP, achievements, projects, education, or how to contact him.";

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatWindow = document.getElementById('chat-window');
    const chatPreview = document.getElementById('chat-preview');
    const chatMessages = document.getElementById('chat-messages');
    const chatPrompts = document.getElementById('chat-prompts');
    const chatForm = document.getElementById('chat-input-area');
    const chatInput = document.getElementById('chat-input');

    if (!chatToggle || !chatWindow || !chatForm || !chatInput) return;

    const setChatOpen = (isOpen) => {
        chatWindow.classList.toggle('hidden', !isOpen);
        chatToggle.setAttribute('aria-expanded', String(isOpen));
        if (chatPreview) chatPreview.style.display = isOpen ? 'none' : 'block';
        if (isOpen) chatInput.focus();
    };

    chatToggle.addEventListener('click', () => {
        setChatOpen(chatWindow.classList.contains('hidden'));
    });

    chatClose.addEventListener('click', () => setChatOpen(false));

    CHAT_PROMPTS.forEach((prompt) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'chat-prompt-btn';
        button.textContent = prompt.label;
        button.addEventListener('click', () => {
            setChatOpen(true);
            handleMessage(prompt.query);
        });
        chatPrompts.appendChild(button);
    });

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerText = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.classList.add('message', 'ai');
        indicator.innerText = '...';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const removeTypingIndicator = () => {
        document.getElementById('typing-indicator')?.remove();
    };

    const generateResponse = (input) => {
        const lowercaseInput = input.toLowerCase();

        for (const item of CHAT_RESPONSES) {
            if (item.keywords.some((key) => lowercaseInput.includes(key))) {
                return item.response;
            }
        }

        if (typeof JOEL_RESUME_CONTEXT === 'string') {
            const contextLine = JOEL_RESUME_CONTEXT.split('\n').find((line) => line.trim().startsWith('Summary:'));
            if (contextLine) {
                return `${contextLine.replace('Summary:', '').trim()} ${getDefaultResponse()}`;
            }
        }

        return getDefaultResponse();
    };

    const handleMessage = (message) => {
        const trimmed = message.trim();
        if (!trimmed) return;

        addMessage(trimmed, 'user');
        chatInput.value = '';
        showTypingIndicator();

        window.setTimeout(() => {
            removeTypingIndicator();
            addMessage(generateResponse(trimmed), 'ai');
        }, 700);
    };

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleMessage(chatInput.value);
    });
});

const JOEL_RESUME_CONTEXT = `
Name: Joel Dabankah Owusu
Based in: Accra, Ghana
Summary: Detail-oriented finance and accounting professional with 10+ years in SAP ERP, plus modern development skills in React, JavaScript, HTML, and CSS.

Experience:
- Swissport Ghana Limited (2018-Present): Finance Officer. SAP ERP. Reduced debtors by 45%.
- Ibis Styles Hotel (2016-2017): Accounts Officer.
- Bayport Financial Services (2016): Customer Service & Operations.

Education:
- Software Development Certificate: Codetrain Ghana (2022)
- BSc Accounting: University of Professional Studies Accra (2014)
- Diploma Accounting: University of Ghana (2011)

Skills:
- Finance: SAP ERP, Financial Reporting, Tax Returns, Account Reconciliation.
- Tech: HTML, CSS, JavaScript, ReactJS, AI Integration, Prompt Engineering.
`;
