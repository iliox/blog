#!/usr/bin/env python3
"""
Simple HTTP server for SPA (Single Page Application) development.
Routes all non-file requests to index.html for client-side routing.
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse

PORT = 8000

class SPAHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP request handler for Single Page Applications"""

    def do_GET(self):
        """Handle GET requests with SPA routing support"""
        # Parse the URL
        url_parts = urlparse(self.path)
        request_path = url_parts.path

        # Remove leading slash for file path checking
        file_path = request_path.lstrip('/')

        # If empty path, default to index.html
        if not file_path:
            file_path = 'index.html'

        # Check if the requested path is a file that exists
        if os.path.isfile(file_path):
            # Serve the file normally
            return http.server.SimpleHTTPRequestHandler.do_GET(self)

        # Check if it's a directory with an index.html
        if os.path.isdir(file_path):
            index_path = os.path.join(file_path, 'index.html')
            if os.path.isfile(index_path):
                return http.server.SimpleHTTPRequestHandler.do_GET(self)

        # For all other paths (SPA routes), serve index.html
        self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def end_headers(self):
        """Add CORS headers for local development"""
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run_server():
    """Start the SPA development server"""
    with socketserver.TCPServer(("", PORT), SPAHTTPRequestHandler) as httpd:
        print("=" * 60)
        print(f"🚀 SPA Development Server Running")
        print("=" * 60)
        print(f"📍 Server: http://localhost:{PORT}")
        print(f"📁 Directory: {os.getcwd()}")
        print()
        print("Available routes:")
        print(f"  • http://localhost:{PORT}/")
        print(f"  • http://localhost:{PORT}/blog")
        print(f"  • http://localhost:{PORT}/blog/hello-world")
        print(f"  • http://localhost:{PORT}/prototyping")
        print()
        print("Press Ctrl+C to stop the server")
        print("=" * 60)

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped")
            return

if __name__ == '__main__':
    run_server()
