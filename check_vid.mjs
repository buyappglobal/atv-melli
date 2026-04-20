import https from 'https';
https.get('https://www.youtube.com/results?search_query=cfmoto+cforce+commercial', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const ids = data.match(/watch\?v=([a-zA-Z0-9_-]{11})/g);
    console.log(ids ? [...new Set(ids)].slice(0,5) : 'no ids');
  });
});
