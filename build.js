const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

const env = nunjucks.configure(path.join(__dirname, 'src'), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true
});

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// Site-wide data
const site = {
  name: 'Scots Music Group',
  tagline: 'Keeping Scots Music Alive',
  url: 'https://www.scotsmusic.org',
  email: 'admin@scotsmusic.org',
  phone: '0131 447 9548',
  address: {
    line1: 'Eric Liddell Community',
    line2: '15 Morningside Road',
    city: 'Edinburgh',
    postcode: 'EH10 4DP'
  },
  hours: 'Tuesday & Thursday, 10am\u20135pm',
  charity: 'SC032702',
  company: 'SC265190',
  social: {
    facebook: 'https://www.facebook.com/ScotsMusicGroup',
    twitter: 'https://twitter.com/scotsmusicgroup',
    youtube: 'https://www.youtube.com/user/scotsmusicgroup',
    instagram: 'https://www.instagram.com/smgceilidhsedinburgh/'
  },
  nav: [
    { label: 'Classes', href: '/classes.html', id: 'classes' },
    { label: 'Ceilidhs', href: '/ceilidhs.html', id: 'ceilidhs' },
    { label: 'Info', href: '/info.html', id: 'info' },
    { label: 'Community', href: '/community.html', id: 'community' },
    { label: 'Shop', href: '/shop.html', id: 'shop' },
    { label: 'News', href: '/news.html', id: 'news' }
  ]
};

// Pages to build
const pages = [
  { src: 'pages/index.njk', out: 'index.html', data: { pageId: 'home', title: 'Traditional Music Classes & Ceilidhs in Edinburgh' } },
  { src: 'pages/classes.njk', out: 'classes.html', data: { pageId: 'classes', title: 'Classes' } },
  { src: 'pages/ceilidhs.njk', out: 'ceilidhs.html', data: { pageId: 'ceilidhs', title: 'Ceilidhs' } },
  { src: 'pages/info.njk', out: 'info.html', data: { pageId: 'info', title: 'Info & Help' } },
  { src: 'pages/community.njk', out: 'community.html', data: { pageId: 'community', title: 'Community' } },
  { src: 'pages/shop.njk', out: 'shop.html', data: { pageId: 'shop', title: 'Shop' } },
  { src: 'pages/news.njk', out: 'news.html', data: { pageId: 'news', title: 'News' } },
  { src: 'pages/donate.njk', out: 'donate.html', data: { pageId: 'donate', title: 'Donate & Gift Aid' } },
];

pages.forEach(page => {
  try {
    const html = nunjucks.render(page.src, { site, ...page.data });
    fs.writeFileSync(path.join(distDir, page.out), html, 'utf-8');
    console.log(`  Built: ${page.out}`);
  } catch (err) {
    console.error(`  ERROR building ${page.out}:`, err.message);
  }
});

// Copy CSS
const cssPath = path.join(__dirname, 'src', 'style.css');
if (fs.existsSync(cssPath)) {
  fs.copyFileSync(cssPath, path.join(distDir, 'style.css'));
  console.log('  Copied: style.css');
}

console.log('\nBuild complete!');
