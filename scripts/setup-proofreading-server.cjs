#!/usr/bin/env node

/**
 * Simple HTTP server for proofreading with temporary access
 * Creates a secure, temporary environment for proofreaders
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

class ProofreadingServer {
  constructor(port = 3001) {
    this.port = port;
    this.accessTokens = new Map();
    this.sessions = new Map();
  }

  generateAccessToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  createTemporaryAccess(proofreaderName, hours = 24) {
    const token = this.generateAccessToken();
    const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);
    
    this.accessTokens.set(token, {
      name: proofreaderName,
      expiresAt,
      createdAt: new Date()
    });

    console.log(`🔑 Created temporary access for: ${proofreaderName}`);
    console.log(`   Token: ${token}`);
    console.log(`   Expires: ${expiresAt.toLocaleString()}`);
    console.log(`   URL: http://localhost:${this.port}/?token=${token}\n`);

    return token;
  }

  validateToken(token) {
    const access = this.accessTokens.get(token);
    if (!access) return false;
    if (new Date() > access.expiresAt) {
      this.accessTokens.delete(token);
      return false;
    }
    return access;
  }

  serveFile(filePath, res) {
    try {
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath);
      
      let contentType = 'text/plain';
      if (ext === '.html') contentType = 'text/html';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.json') contentType = 'application/json';
      else if (ext === '.csv') contentType = 'text/csv';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    }
  }

  createAccessPage() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CarMarket365 - Proofreading Access</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f8fafc;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 { color: #1e293b; margin-bottom: 10px; }
        .subtitle { color: #64748b; margin-bottom: 30px; }
        .access-form { margin: 30px 0; }
        input[type="text"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 16px;
            margin: 10px 0;
        }
        button {
            background: #3b82f6;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover { background: #2563eb; }
        .error { color: #dc2626; margin: 10px 0; }
        .success { color: #059669; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚗 CarMarket365 Translation Proofreading</h1>
        <p class="subtitle">Secure access for translation proofreaders</p>
        
        <div class="access-form">
            <p>Please enter your access token to continue:</p>
            <input type="text" id="token" placeholder="Enter access token..." />
            <button onclick="checkAccess()">Access Proofreading Tools</button>
            <div id="message"></div>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
            <p><strong>For proofreaders:</strong></p>
            <ul>
                <li>Contact your project manager for an access token</li>
                <li>Access is temporary and will expire automatically</li>
                <li>You'll be able to download and edit translation files safely</li>
                <li>No source code or sensitive information is accessible</li>
            </ul>
        </div>
    </div>

    <script>
        function checkAccess() {
            const token = document.getElementById('token').value.trim();
            const messageDiv = document.getElementById('message');
            
            if (!token) {
                messageDiv.innerHTML = '<div class="error">Please enter an access token</div>';
                return;
            }
            
            // Redirect to proofreading interface with token
            window.location.href = '/proofreading?token=' + encodeURIComponent(token);
        }
        
        // Check if token is in URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            document.getElementById('token').value = token;
            checkAccess();
        }
    </script>
</body>
</html>`;
  }

  handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    // Root page - access token entry
    if (pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(this.createAccessPage());
      return;
    }

    // Proofreading interface - requires token
    if (pathname === '/proofreading') {
      const token = query.token;
      const access = this.validateToken(token);
      
      if (!access) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>Access Denied</h1>
          <p>Invalid or expired token. Please contact your project manager for a new access token.</p>
          <a href="/">Back to access page</a>
        `);
        return;
      }

      // Serve the proofreading interface
      this.serveFile('proofreading-tools/index.html', res);
      return;
    }

    // File downloads - requires token
    if (pathname.startsWith('/download/')) {
      const token = query.token;
      const access = this.validateToken(token);
      
      if (!access) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Access denied');
        return;
      }

      const filename = pathname.replace('/download/', '');
      const filePath = path.join('proofreading-exports', filename);
      
      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        this.serveFile(filePath, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
      return;
    }

    // File list API - requires token  
    if (pathname === '/api/files') {
      const token = query.token;
      const access = this.validateToken(token);
      
      if (!access) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end('{"error": "Access denied"}');
        return;
      }

      try {
        const files = fs.readdirSync('proofreading-exports')
          .filter(file => file.endsWith('.csv') || file.endsWith('.json'))
          .map(file => {
            const stats = fs.statSync(path.join('proofreading-exports', file));
            return {
              name: file,
              size: stats.size,
              modified: stats.mtime
            };
          });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ files }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('{"error": "Could not list files"}');
      }
      return;
    }

    // 404 for everything else
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }

  start() {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(this.port, () => {
      console.log(`🌐 Proofreading server started on http://localhost:${this.port}`);
      console.log(`📁 Serving files from: proofreading-exports/`);
      console.log(`\n🔑 To create temporary access:`);
      console.log(`   server.createTemporaryAccess('Proofreader Name', 24); // 24 hours\n`);
    });

    return server;
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'start') {
    const port = parseInt(args[1]) || 3001;
    const server = new ProofreadingServer(port);
    const httpServer = server.start();

    // Create sample access tokens
    server.createTemporaryAccess('Demo Proofreader', 24);
    server.createTemporaryAccess('John Smith', 48);

    console.log('💡 Sample usage:');
    console.log('   Share the URL with token to proofreaders');
    console.log('   Tokens expire automatically for security');
    console.log('   Press Ctrl+C to stop the server\n');

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down proofreading server...');
      httpServer.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
      });
    });
  } else {
    console.log(`
🚗 CarMarket365 Proofreading Server

Usage: node setup-proofreading-server.cjs start [port]

Examples:
  node setup-proofreading-server.cjs start        # Start on port 3001
  node setup-proofreading-server.cjs start 8080   # Start on port 8080

Features:
  • Temporary access tokens with expiration
  • Secure file serving
  • No source code exposure
  • Automatic cleanup of expired tokens
    `);
  }
}

module.exports = ProofreadingServer;