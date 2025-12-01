/**
 * Script to validate all URLs in the knowledge bank
 * Run with: node scripts/validate-knowledge-bank-links.js
 */

import https from 'https';
import http from 'http';
import { URL } from 'url';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to knowledge bank
const knowledgeBankPath = resolve(__dirname, '../client/src/data/knowledge-bank.ts');

// Read and parse the knowledge bank file
const content = fs.readFileSync(knowledgeBankPath, 'utf-8');

// Extract all URLs from the knowledge bank
const urlRegex = /url:\s*["']([^"']+)["']/g;
const urls = [];
let match;

while ((match = urlRegex.exec(content)) !== null) {
  urls.push({
    url: match[1],
    line: content.substring(0, match.index).split('\n').length
  });
}

console.log(`Found ${urls.length} URLs to validate\n`);

// Test a URL
function testUrl(urlString) {
  return new Promise((resolve) => {
    try {
      const url = new URL(urlString);
      const client = url.protocol === 'https:' ? https : http;
      
      const options = {
        method: 'HEAD',
        hostname: url.hostname,
        path: url.pathname + url.search,
        timeout: 5000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; KnowledgeBankValidator/1.0)'
        }
      };

      const req = client.request(options, (res) => {
        resolve({
          status: res.statusCode,
          valid: res.statusCode >= 200 && res.statusCode < 400,
          redirect: res.statusCode >= 300 && res.statusCode < 400
        });
      });

      req.on('error', (err) => {
        resolve({
          status: 'ERROR',
          valid: false,
          error: err.message
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          status: 'TIMEOUT',
          valid: false,
          error: 'Request timeout'
        });
      });

      req.end();
    } catch (err) {
      resolve({
        status: 'INVALID',
        valid: false,
        error: err.message
      });
    }
  });
}

// Test all URLs
async function validateAll() {
  const results = {
    valid: [],
    invalid: [],
    redirects: [],
    errors: []
  };

  console.log('Testing URLs...\n');

  for (let i = 0; i < urls.length; i++) {
    const { url, line } = urls[i];
    process.stdout.write(`[${i + 1}/${urls.length}] Testing: ${url.substring(0, 60)}... `);
    
    const result = await testUrl(url);
    
    if (result.valid) {
      console.log(`✓ Valid (${result.status})`);
      results.valid.push({ url, line, status: result.status });
    } else if (result.redirect) {
      console.log(`→ Redirect (${result.status})`);
      results.redirects.push({ url, line, status: result.status });
    } else {
      console.log(`✗ Invalid (${result.status || result.error})`);
      results.invalid.push({ url, line, status: result.status, error: result.error });
    }

    // Small delay to avoid overwhelming servers
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total URLs: ${urls.length}`);
  console.log(`✓ Valid: ${results.valid.length}`);
  console.log(`→ Redirects: ${results.redirects.length}`);
  console.log(`✗ Invalid: ${results.invalid.length}`);
  console.log('');

  if (results.invalid.length > 0) {
    console.log('INVALID URLs:');
    console.log('-'.repeat(70));
    results.invalid.forEach(({ url, line, status, error }) => {
      console.log(`Line ${line}: ${url}`);
      console.log(`  Status: ${status || 'N/A'}, Error: ${error || 'N/A'}\n`);
    });
  }

  if (results.redirects.length > 0) {
    console.log('REDIRECTS (may need updating):');
    console.log('-'.repeat(70));
    results.redirects.forEach(({ url, line, status }) => {
      console.log(`Line ${line}: ${url} (${status})\n`);
    });
  }

  // Exit with error code if invalid URLs found
  if (results.invalid.length > 0) {
    process.exit(1);
  }
}

validateAll().catch(console.error);

