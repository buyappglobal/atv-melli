import https from 'https';

const fetchImages = (url, prefixRegex) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const urls = data.match(/https:\/\/[^"']*\.(jpe?g|png|webp)/gi);
      console.log(`\n--- ${url} ---`);
      if (urls) {
        const uniqueUrls = [...new Set(urls)];
        const filtered = uniqueUrls.filter(u => prefixRegex.test(u));
        console.log(filtered.slice(0, 15));
      } else {
        console.log('No URLs');
      }
    });
  });
};

fetchImages('https://cf-moto.es/vehiculos-ssv', /zforce|z10/i);
fetchImages('https://cf-moto.es/vehiculos-utv', /uforce|u10|u6/i);
fetchImages('https://cf-moto.es/', /zforce|z10|uforce|u10|u6/i);

