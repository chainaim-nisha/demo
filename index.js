const http = require('http');
const { URL } = require('url');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const base = `http://${req.headers.host || 'localhost'}`;
  const url = new URL(req.url, base);
  const pathname = url.pathname;

  // GET /echo?text=...  -> verifiable echo (proves the agent called THIS server)
  if (req.method === 'GET' && pathname === '/echo') {
    const text = url.searchParams.get('text') || '';
    const body = {
      youSent: text,
      serverTime: new Date().toISOString(),
      nonce: crypto.randomBytes(6).toString('hex'),
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body) + '\n');
    return;
  }

  // GET / -> health check
  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'demo', try: '/echo?text=hello' }) + '\n');
    return;
  }

  // Anything else -> explicit 404 (so a wrong path is obvious, not silently "Hello World")
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not_found', path: pathname }) + '\n');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
