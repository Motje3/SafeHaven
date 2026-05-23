import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_FILE = join(__dirname, 'state.json');
const PORT = Number(process.env.PORT) || 3001;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

if (!existsSync(dirname(STATE_FILE))) mkdirSync(dirname(STATE_FILE), { recursive: true });
if (!existsSync(STATE_FILE)) writeFileSync(STATE_FILE, JSON.stringify({ emergency: null }, null, 2));

function readState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return { emergency: null };
  }
}

function writeState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.url !== '/api/emergency') {
    res.writeHead(404, corsHeaders);
    res.end();
    return;
  }

  if (req.method === 'GET') {
    res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(readState()));
    return;
  }

  if (req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        writeState(parsed);
        res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsed));
      } catch {
        res.writeHead(400, corsHeaders);
        res.end();
      }
    });
    return;
  }

  res.writeHead(405, corsHeaders);
  res.end();
}).listen(PORT, '0.0.0.0', () => {
  console.log(`[sync] Listening on http://0.0.0.0:${PORT}`);
  console.log(`[sync] State file: ${STATE_FILE}`);
});
