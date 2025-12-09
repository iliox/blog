// View templates for each page

export const AboutView = () => {
    return `
        <section id="about" class="section">
            <h1 class="section-title">About Me</h1>
            <div class="about-content">
                <div class="about-intro">
                    <p class="lead">
                        Hi! I'm Nishant Thakur, a Senior Machine Learning Engineer at Coinbase with a passion for building
                        intelligent AI systems that solve real-world problems.
                    </p>
                </div>

                <div class="about-details">
                    <h2>Background</h2>
                    <p>
                        I graduated from the Indian Institute of Technology, Kharagpur with a BTech+MTech degree, majoring in
                        Biotechnology with a minor in Mathematics and Computing. My specialization in Optimization Theory and
                        Applications has been instrumental in my journey into machine learning and AI.
                    </p>

                    <h2>Professional Experience</h2>
                    <p>
                        Currently at Coinbase, I lead the development of Agentic AI solutions that automate customer interactions
                        through sophisticated CX workflows. I work with cutting-edge technologies like LangGraph, ADK, and MCP to
                        build autonomous AI agents that integrate LLMs, customer data, and business logic into unified, intelligent systems.
                    </p>

                    <h2>Technical Skills</h2>
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h4>Programming</h4>
                            <p>Python, R, Go, C/C++, JavaScript (React, NodeJS), MySQL</p>
                        </div>
                        <div class="skill-category">
                            <h4>ML/AI</h4>
                            <p>Google ADK, LangGraph, Langfuse, MCP, scikit-learn, PyTorch, Pandas, NumPy, Plotly, Streamlit, Airflow</p>
                        </div>
                        <div class="skill-category">
                            <h4>AI Tools</h4>
                            <p>Cursor, Claude-code, Warp, Gemini, LibreChat, n8n</p>
                        </div>
                    </div>

                    <h2>Previous Experience</h2>
                    <p>
                        Before Coinbase, I worked at Agara AI as a Machine Learning Scientist and Intern, where I built no-code
                        conversation design platforms, FAQ models, and entity classification systems using BERT and multi-task learning.
                        I also interned at Accenture AI, developing analytics solutions to mine app reviews and extract insights using
                        topic modeling.
                    </p>

                    <div class="contact-info">
                        <h3>Get in Touch</h3>
                        <p>
                            <a href="mailto:hpknishant@gmail.com">📧 hpknishant@gmail.com</a><br>
                            <a href="https://github.com/nish1998" target="_blank">🐙 GitHub: nish1998</a><br>
                            <a href="https://linkedin.com/in/nishantthakuriitkgp" target="_blank">💼 LinkedIn: nishantthakuriitkgp</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    `;
};

export const BlogListView = (blogPosts) => {
    if (blogPosts.length === 0) {
        return `
            <section id="blog" class="section">
                <h1 class="section-title">Blog</h1>
                <p class="text-secondary">No blog posts yet. Check back soon!</p>
            </section>
        `;
    }

    const blogCards = blogPosts.map(post => `
        <div class="blog-card" onclick="window.router.navigate('/blog/${post.slug}')">
            <h2>${post.title}</h2>
            <p class="blog-date">${post.date}</p>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');

    return `
        <section id="blog" class="section">
            <h1 class="section-title">Blog</h1>
            <div id="blog-list" class="blog-list">
                ${blogCards}
            </div>
        </section>
    `;
};

export const BlogPostView = (post, content) => {
    return `
        <section id="blog" class="section">
            <div class="blog-full">
                <button onclick="window.router.navigate('/blog')" style="margin-bottom: 2rem; padding: 0.5rem 1rem; background: var(--accent-primary); color: white; border: none; border-radius: 4px; cursor: pointer;">← Back to Blog List</button>
                <h1>${post.title}</h1>
                <p class="blog-date">${post.date}</p>
                <div class="blog-tags" style="margin-bottom: 2rem;">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="blog-content active">
                    ${content}
                </div>
            </div>
        </section>
    `;
};

export const PrototypingView = () => {
    return `
        <section id="prototyping" class="section">
            <h1 class="section-title">Prototyping</h1>
            <div class="prototyping-content">
                <p class="lead">
                    This section showcases my prototypes, experiments, and side projects where I explore new technologies
                    and ideas.
                </p>

                <div class="prototype-grid">
                    <div class="prototype-card">
                        <h3>ClickArt - Smart Shopping App</h3>
                        <p class="prototype-date">Microsoft Code.Fun.Do Hackathon (2018)</p>
                        <p>
                            Built with React Native, this app revolutionizes online shopping by allowing users to take images
                            of objects they want to buy and instantly search for them on Amazon using Google's image detection API.
                        </p>
                        <div class="prototype-tags">
                            <span class="tag">React Native</span>
                            <span class="tag">Computer Vision</span>
                            <span class="tag">API Integration</span>
                        </div>
                    </div>

                    <div class="prototype-card">
                        <h3>Crypto Stories</h3>
                        <p class="prototype-date">Coinbase Hackathon</p>
                        <p>
                            A feature integrated into the Coinbase app that delivers real-time trending crypto news to users,
                            keeping them informed about the latest developments in the cryptocurrency world.
                        </p>
                        <div class="prototype-tags">
                            <span class="tag">Mobile App</span>
                            <span class="tag">Real-time Data</span>
                            <span class="tag">News Aggregation</span>
                        </div>
                    </div>

                    <div class="prototype-card">
                        <h3>Spring Fest Platform</h3>
                        <p class="prototype-date">IIT Kharagpur (2019)</p>
                        <p>
                            Led development of the main API and website for Spring Fest 2019, serving 50,000+ users with
                            event management, registration, and real-time updates.
                        </p>
                        <div class="prototype-tags">
                            <span class="tag">Full Stack</span>
                            <span class="tag">High Traffic</span>
                            <span class="tag">Event Management</span>
                        </div>
                    </div>

                    <div class="prototype-card">
                        <h3>Agent Assist - LLM-powered Chatbot</h3>
                        <p class="prototype-date">Coinbase (2021-Present)</p>
                        <p>
                            Developed a proactive LLM-powered chatbot within the CX Agents UI that enabled customer support agents
                            to resolve queries in real time, driving over $2M+ USD in impact.
                        </p>
                        <div class="prototype-tags">
                            <span class="tag">LLM</span>
                            <span class="tag">Customer Support</span>
                            <span class="tag">AI Agents</span>
                        </div>
                    </div>

                    <div class="prototype-card">
                        <h3>Knowledge Service for RAG</h3>
                        <p class="prototype-date">Coinbase (2021-Present)</p>
                        <p>
                            Designed and implemented a Knowledge Service for RAG (Retrieval-Augmented Generation) retrieval,
                            streamlining the consolidation of diverse data sources into unified knowledge bases.
                        </p>
                        <div class="prototype-tags">
                            <span class="tag">RAG</span>
                            <span class="tag">Vector Search</span>
                            <span class="tag">Knowledge Management</span>
                        </div>
                    </div>

                    <div class="prototype-card">
                        <h3>Agentic AI Solution</h3>
                        <p class="prototype-date">Coinbase (2021-Present)</p>
                        <p>
                            Led development of an Agentic AI solution to automate customer interactions through CX workflows,
                            integrating LLMs, customer data, and business logic. Utilized LangGraph and ADK to build autonomous AI agents.
                        </p>
                        <div class="prototype-tags">
                            <span class="tag">LangGraph</span>
                            <span class="tag">AI Agents</span>
                            <span class="tag">Automation</span>
                        </div>
                    </div>
                </div>

                <div class="prototype-note">
                    <p>More prototypes and projects coming soon! Check back regularly or follow me on <a href="https://github.com/nish1998" target="_blank">GitHub</a> to see what I'm building.</p>
                </div>
            </div>
        </section>
    `;
};

export const NotFoundView = () => {
    return `
        <section class="section">
            <h1 class="section-title">404 - Page Not Found</h1>
            <p class="lead">Sorry, the page you're looking for doesn't exist.</p>
            <p>
                <button onclick="window.router.navigate('/')" style="margin-top: 2rem; padding: 0.75rem 1.5rem; background: var(--accent-primary); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
                    Go to Home
                </button>
            </p>
        </section>
    `;
};
