# Personal Blog Website

A modern, responsive single-page application (SPA) blog with client-side routing, dark/light theme support, and individual URLs for each blog post. Built for deployment on GitHub Pages.

## Features

- **Client-Side Routing**: SPA with clean URLs using JavaScript Router and History API
- **Individual Blog URLs**: Each blog post has its own unique URL (e.g., `/blog/hello-world`)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes with persistent preference
- **Markdown Blog System**: Write blogs in Markdown format and they'll be automatically rendered
- **Three Main Sections**:
  - **About** (`/`) - Professional background and experience
  - **Blog** (`/blog`) - Technical articles and thoughts
  - **Prototyping** (`/prototyping`) - Showcase of projects and prototypes

## Project Structure

```
blog/
├── index.html          # Main SPA HTML file
├── .htaccess          # Apache rewrite rules for routing
├── css/
│   └── style.css      # Styling and theme variables
├── js/
│   ├── router.js      # Client-side routing implementation
│   ├── views.js       # View templates for each page
│   └── theme.js       # Theme toggle functionality
├── blogs/
│   └── hello-world.md # Example blog post in Markdown
└── README.md          # This file
```

## How Routing Works

This is a **Single Page Application (SPA)** that uses:

1. **JavaScript Router** (`js/router.js`): Handles client-side navigation
2. **History API**: Manages browser history and URL changes
3. **Dynamic Views** (`js/views.js`): Templates rendered based on current route
4. **`.htaccess`**: Redirects all requests to `index.html` for proper SPA routing on Apache servers

### Routes

- `/` - About page (home)
- `/blog` - Blog list page
- `/blog/:slug` - Individual blog post (e.g., `/blog/hello-world`)
- `/prototyping` - Prototyping page

## Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to GitHub and create a new repository
2. Name it `<your-username>.github.io` for a user site, or any name for a project site
3. Make it public

### Step 2: Push Your Code

```bash
# Initialize git repository (if not already initialized)
cd /Users/nishant/Desktop/coincode/nishant/blog
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Personal blog SPA with routing"

# Add remote repository (replace with your GitHub repository URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **main** branch
5. Select **/ (root)** as the folder
6. Click **Save**

Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

**Note**: GitHub Pages uses Jekyll by default. Since this is a client-side SPA, the `.htaccess` file will be used by Apache servers. For GitHub Pages, routing will work with the JavaScript router's pushState, but direct URL access might need a 404.html fallback (see Advanced section below).

### GitHub Pages SPA Configuration (Optional)

To make direct URL access work on GitHub Pages, create a `404.html`:

```bash
cp index.html 404.html
```

This ensures that when someone directly visits `/blog/hello-world`, GitHub Pages will serve the 404.html (which is identical to index.html), and the JavaScript router will handle the routing.

## Adding New Blog Posts

### Step 1: Create a Markdown File

Create a new `.md` file in the `blogs/` directory:

```bash
touch blogs/my-new-post.md
```

### Step 2: Write Your Blog Post

Write your content in Markdown format. Example:

```markdown
# My Awesome Blog Post

This is my new blog post about something interesting.

## Section 1

Content here...

## Code Example

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## Conclusion

Final thoughts...
```

### Step 3: Update the Blog Posts Configuration

Edit `js/router.js` and add your new post to the `blogPosts` array:

```javascript
const blogPosts = [
    {
        title: "My New Post",
        slug: "my-new-post",  // This will be the URL: /blog/my-new-post
        date: "December 10, 2025",
        file: "my-new-post.md",
        excerpt: "A brief description of what this post is about",
        tags: ["Tag1", "Tag2", "Tag3"]
    },
    {
        title: "Hello World!",
        slug: "hello-world",
        date: "December 9, 2025",
        file: "hello-world.md",
        excerpt: "Welcome to my personal blog!",
        tags: ["Introduction", "Personal", "Tech"]
    }
];
```

**Important**: The `slug` field determines the URL path for the blog post.

### Step 4: Commit and Push

```bash
git add .
git commit -m "Add new blog post: My New Post"
git push
```

Your new blog post will be live in a few minutes at `/blog/my-new-post`!

## Local Development

### Using Python (Recommended)

```bash
cd /Users/nishant/Desktop/coincode/nishant/blog
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Using Node.js

```bash
npx http-server -p 8000
```

### Using PHP

```bash
php -S localhost:8000
```

### Testing Routes Locally

- Home/About: `http://localhost:8000/`
- Blog List: `http://localhost:8000/blog`
- Blog Post: `http://localhost:8000/blog/hello-world`
- Prototyping: `http://localhost:8000/prototyping`

**Note**: When using the Python server locally, direct URL access (typing URL in address bar) might show a 404. This is normal - just navigate using the links within the app. On production with proper server configuration (Apache with .htaccess or GitHub Pages with 404.html), direct URLs will work.

## Customization

### Changing Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --accent-primary: #0066cc;  /* Change primary color */
    --accent-hover: #0052a3;    /* Change hover color */
    /* ... other variables */
}
```

### Modifying Content

- **About Section**: Edit `AboutView()` in `js/views.js`
- **Prototyping Section**: Edit `PrototypingView()` in `js/views.js`
- **Navigation**: Modify the navbar in `index.html`

### Adding New Routes

Edit `js/router.js` and add new routes to the `routes` array:

```javascript
const routes = [
    // ... existing routes
    {
        path: '/contact',
        view: async () => ContactView()
    }
];
```

Then create the corresponding view in `js/views.js`.

## Technologies Used

- **HTML5**: Structure
- **CSS3**: Styling with CSS Variables for theming
- **JavaScript ES6+**: Modules, async/await, History API
- **Marked.js**: Markdown parsing library
- **Client-Side Router**: Custom router implementation

## How It Works

### Single Page Application (SPA)

Instead of loading separate HTML files for each page, this blog:

1. Loads a single `index.html` file
2. Uses JavaScript to intercept navigation clicks
3. Updates the URL using the History API
4. Dynamically renders the appropriate view based on the URL
5. Maintains theme preference across "page" changes

### Benefits

- **Faster Navigation**: No full page reloads
- **Smooth Transitions**: Better user experience
- **State Persistence**: Theme and other settings maintained
- **Clean URLs**: Each blog post has its own shareable URL
- **SEO Friendly**: With proper server configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires JavaScript enabled and support for ES6 modules.

## Troubleshooting

### Direct URLs not working locally

This is normal with Python's simple HTTP server. Navigate using the app's links, or use Apache/nginx for testing.

### 404 on GitHub Pages for blog posts

Make sure you've created `404.html` as a copy of `index.html`:

```bash
cp index.html 404.html
git add 404.html
git commit -m "Add 404.html for SPA routing"
git push
```

### Theme not persisting

The theme is stored in localStorage. Make sure your browser allows localStorage.

## License

Feel free to use this template for your own personal blog!

## Contact

- **Email**: hpknishant@gmail.com
- **GitHub**: [@nish1998](https://github.com/nish1998)
- **LinkedIn**: [nishantthakuriitkgp](https://linkedin.com/in/nishantthakuriitkgp)
