const SITE_CONFIG = {
    githubUser: 'Joel300',
    githubAllowlist: ['Joey_portfolio'],
    githubMaxRepos: 6,
    githubCacheKey: 'joel_github_repos_v1',
    githubCacheTtlMs: 60 * 60 * 1000
};

const FEATURED_PROJECTS = [
    {
        title: 'Personal Portfolio',
        problem: 'Recruiters needed one place to see finance credentials and development work.',
        role: 'Design, frontend development, and deployment',
        stack: ['HTML', 'CSS', 'JavaScript'],
        outcome: 'Live portfolio with GitHub integration, contact form, and mobile-first UI.',
        image: 'images/project_1.png',
        imageAlt: 'Portfolio website interface preview',
        repoUrl: 'https://github.com/Joel300/Joey_portfolio',
        liveUrl: 'https://joel300.github.io/Joey_portfolio/'
    },
    {
        title: 'Finance Operations Toolkit',
        problem: 'Manual reconciliation and reporting slowed month-end close.',
        role: 'Finance operations and process improvement',
        stack: ['SAP ERP', 'Excel', 'Financial Reporting'],
        outcome: 'Supported 45% reduction in debtors and stronger month-end reporting accuracy.',
        image: 'images/project_2.png',
        imageAlt: 'Finance analytics dashboard concept',
        repoUrl: 'https://github.com/Joel300',
        liveUrl: null
    },
    {
        title: 'Frontend Applications (Codetrain)',
        problem: 'Needed production-ready interfaces to complement accounting experience.',
        role: 'Student developer building UI components and apps',
        stack: ['JavaScript', 'React', 'HTML', 'CSS'],
        outcome: 'Built responsive apps with component-based architecture after Codetrain certification.',
        image: 'images/project_3.png',
        imageAlt: 'Creative web application interface preview',
        repoUrl: 'https://github.com/Joel300',
        liveUrl: null
    }
];

const GITHUB_FALLBACK_REPOS = [
    {
        name: 'Joey_portfolio',
        description: 'Personal portfolio showcasing finance and software development experience.',
        language: 'JavaScript',
        stargazers_count: 0,
        updated_at: new Date().toISOString(),
        html_url: 'https://github.com/Joel300/Joey_portfolio',
        owner: { login: 'Joel300' },
        fork: false
    }
];
