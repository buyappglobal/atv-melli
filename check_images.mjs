import https from 'https';

const urls = [
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cde6aa3c21fac2782fb3_CFORCE_1000MV.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce0ac5e27c5fc6fb8871_CFORCE_1000T.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cdf6f255d29df1d6c910_CFORCE_1000OV.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cea962a0c0a68d0697e0_CFORCE_850T.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/67d8813294a60d904a2ed9cf_CFORCE_625%20TOURING_OVERLAND_Granite%20Ridge_Left45.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce84c227e2fd7ede9e5c_CFORCE_625T.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce3ea44aa607e214b432_CFORCE_625.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce1a0d8b5ef424f36c49_CFORCE_520L.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943ce2809b40338817a4658_CFORCE_520S.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/680a6d43d929130486136f62_Z10_Lava%20Orange_Left45_portada_11zon.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/680a6d544f20721583e44f2c_Z10-4_Lava%20Orange_Left45_portada_11zon.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/67d882ec3b2d6e588fa0debf_ZFORCE_950%20SPORT_Tundra%20Grey_Left%2045.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/684c352f207aa54c1698bbd0_ZFORCE%20950%20SPORT-4_Magma%20Red_Left%2045_2_11zon.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf3ae626eb901b6e6c19_UFORCE_U10XL-PRO.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6942e3857a13d2179be85fd3_UFORCE_U6-EV.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf23c5525165624900c7_UFORCE_U10-PRO.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf6e1662e561ba65d8d1_UFORCE_1000.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf9a1ca899011de870fa_UFORCE_1000XL.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cf4dbd42a969b82bf04c_UFORCE_800XL.webp',
  'https://cdn.prod.website-files.com/65809d660930f56d7ec25c7d/6943cfb2e626eb901b6eb18e_UFORCE_600.webp'
];

urls.forEach(url => {
  https.get(url, (res) => {
    if (res.statusCode !== 200) console.log(`FAILED: ${url} - ${res.statusCode}`);
  }).on('error', (e) => console.log(`ERROR: ${url} - ${e.message}`));
});
