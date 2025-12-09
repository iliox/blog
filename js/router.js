import { AboutView, BlogListView, BlogPostView, PrototypingView, NotFoundView } from './views.js';

// Blog posts configuration
const blogPosts = [
    {
        title: "Hello World!",
        slug: "hello-world",
        date: "December 9, 2025",
        file: "hello-world.md",
        excerpt: "Welcome to my personal blog! This is my first post where I introduce myself and share what you can expect from this space.",
        tags: ["Introduction", "Personal", "Tech"]
    }
    // Add more blog posts here as you create them
    // Example:
    // {
    //     title: "My Second Post",
    //     slug: "my-second-post",
    //     date: "December 10, 2025",
    //     file: "my-second-post.md",
    //     excerpt: "A brief description of the second post",
    //     tags: ["Technology", "AI"]
    // }
];

class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;

        // Bind methods
        this.navigate = this.navigate.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);

        // Initialize router
        this.init();
    }

    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', this.handlePopState);

        // Handle link clicks
        document.addEventListener('click', this.handleLinkClick);

        // Expose router globally for inline onclick handlers
        window.router = this;

        // Load initial route
        this.loadRoute();
    }

    handleLinkClick(e) {
        // Check if clicked element has data-link attribute
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            const path = link.getAttribute('href');
            this.navigate(path);
        }
    }

    handlePopState() {
        this.loadRoute();
    }

    navigate(path) {
        // Push new state to history
        window.history.pushState(null, null, path);
        this.loadRoute();
    }

    async loadRoute() {
        const path = window.location.pathname;

        // Update active nav link
        this.updateActiveNav(path);

        // Update page title
        this.updateTitle(path);

        // Find matching route
        let routeMatch = null;
        let params = {};

        for (const route of this.routes) {
            const match = this.matchRoute(route.path, path);
            if (match) {
                routeMatch = route;
                params = match.params;
                break;
            }
        }

        // Load view
        const app = document.getElementById('app');

        if (routeMatch) {
            const html = await routeMatch.view(params);
            app.innerHTML = html;
            this.currentRoute = path;

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            app.innerHTML = NotFoundView();
        }
    }

    matchRoute(routePath, urlPath) {
        // Convert route path to regex pattern
        const paramNames = [];
        const regexPath = routePath
            .replace(/\//g, '\\/')
            .replace(/:(\w+)/g, (match, paramName) => {
                paramNames.push(paramName);
                return '([^\\/]+)';
            });

        const regex = new RegExp(`^${regexPath}$`);
        const match = urlPath.match(regex);

        if (match) {
            const params = {};
            paramNames.forEach((name, index) => {
                params[name] = match[index + 1];
            });
            return { params };
        }

        return null;
    }

    updateActiveNav(path) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-menu a[data-link]').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current nav link
        let activeLink = null;
        if (path === '/') {
            activeLink = document.querySelector('.nav-menu a[href="/"]');
        } else if (path.startsWith('/blog')) {
            activeLink = document.querySelector('.nav-menu a[href="/blog"]');
        } else if (path.startsWith('/prototyping')) {
            activeLink = document.querySelector('.nav-menu a[href="/prototyping"]');
        }

        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateTitle(path) {
        let title = 'Nishant Thakur';

        if (path === '/') {
            title = 'About - Nishant Thakur';
        } else if (path === '/blog') {
            title = 'Blog - Nishant Thakur';
        } else if (path.startsWith('/blog/')) {
            const slug = path.replace('/blog/', '');
            const post = blogPosts.find(p => p.slug === slug);
            if (post) {
                title = `${post.title} - Nishant Thakur`;
            }
        } else if (path === '/prototyping') {
            title = 'Prototyping - Nishant Thakur';
        }

        document.title = title;
    }
}

// Route definitions
const routes = [
    {
        path: '/',
        view: async () => AboutView()
    },
    {
        path: '/blog',
        view: async () => BlogListView(blogPosts)
    },
    {
        path: '/blog/:slug',
        view: async (params) => {
            const post = blogPosts.find(p => p.slug === params.slug);
            if (!post) {
                return NotFoundView();
            }

            try {
                const response = await fetch(`/blogs/${post.file}`);
                if (!response.ok) {
                    throw new Error('Blog post not found');
                }

                const markdown = await response.text();
                const html = marked.parse(markdown);

                return BlogPostView(post, html);
            } catch (error) {
                console.error('Error loading blog post:', error);
                return `
                    <section class="section">
                        <h1 class="section-title">Error</h1>
                        <p class="lead">Failed to load blog post. Please try again.</p>
                        <button onclick="window.router.navigate('/blog')" style="margin-top: 2rem; padding: 0.75rem 1.5rem; background: var(--accent-primary); color: white; border: none; border-radius: 4px; cursor: pointer;">
                            Back to Blog
                        </button>
                    </section>
                `;
            }
        }
    },
    {
        path: '/prototyping',
        view: async () => PrototypingView()
    }
];

// Initialize router
const router = new Router(routes);

// Export for potential external use
export default router;
