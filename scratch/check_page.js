const http = require('http');

http.get('http://localhost:3000/?t=1.5', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Contains hero?:', data.includes('id="hero"'));
    console.log('Contains Digital?:', data.includes('Digital'));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
