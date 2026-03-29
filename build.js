const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify: htmlMinify } = require('html-minifier-terser');

const env = nunjucks.configure(path.join(__dirname, 'src'), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true
});

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

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

const EVENTBRITE_PUBLIC_TOKEN = 'K7TOD7V5RVEJDGZGICXM';

const eventPages = [
  {
    src: 'pages/event.njk',
    out: 'event/bella-mcnab.html',
    data: {
      pageId: 'event',
      title: "TEST EVENT - Ceilidh with Bella McNab's Dance Band",
      outputName: 'event/bella-mcnab.html',
      eventData: {
        eventbriteId: '1986172285773',
        publicToken: EVENTBRITE_PUBLIC_TOKEN,
        isTest: true,
        title: "Ceilidh with Bella McNab's Dance Band",
        subtitle: 'SCOTS MUSIC GRP CEILIDH 2026',
        band: "Bella McNab's Dance Band",
        dateFormatted: 'Saturday 25 April 2026',
        timeFormatted: 'Doors 7pm, dancing 7:30\u201311pm',
        startUTC: '2026-04-25T18:30:00Z',
        heroImage: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=80',
        description: 'Book tickets for our ceilidh with Bella McNab\'s Dance Band at St Bride\'s Centre, Edinburgh.',
        descriptionHtml: '<p>SCOTS MUSIC GRP CEILIDH 2026</p><p>Doors open at 7pm. Ceilidh starts at 7.30pm & finishes at 11pm.</p><p>Tickets purchased ONLINE in advance are £12 full / £8 concession and will be on the door for collection. Save money by buying in advance! Tickets on the night are £15 full / £10 concession (cash/card).</p><p>Concession rate applies to students, pensioners, people receiving benefits, jobseekers/unemployed, unwaged (e.g. carer, stay at home parent) and children aged 5 to 16. Children under 5 are free but ticketed so please purchase a free child ticket.</p>'
      }
    }
  },
  {
    src: 'pages/event.njk',
    out: 'event/jimi-shandrix.html',
    data: {
      pageId: 'event',
      title: 'TEST EVENT - Ceilidh with Sensational Jimi Shandrix Experience',
      outputName: 'event/jimi-shandrix.html',
      eventData: {
        eventbriteId: '1986172319875',
        publicToken: EVENTBRITE_PUBLIC_TOKEN,
        isTest: true,
        title: 'Ceilidh with Sensational Jimi Shandrix Experience',
        subtitle: 'SCOTS MUSIC GRP CEILIDH 2026',
        band: 'Sensational Jimi Shandrix Experience',
        dateFormatted: 'Saturday 30 May 2026',
        timeFormatted: 'Doors 7pm, dancing 7:30\u201311pm',
        startUTC: '2026-05-30T18:30:00Z',
        heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
        description: 'Book tickets for our ceilidh with the Sensational Jimi Shandrix Experience at St Bride\'s Centre, Edinburgh.',
        descriptionHtml: '<p>SCOTS MUSIC GRP CEILIDH 2026</p><p>Doors open at 7pm. Ceilidh starts at 7.30pm & ends at 11pm.</p><p>Tickets purchased online in advance are £12 full / £8 concession and will be on the door for collection. Save money by buying in advance! Full-price tickets on the night are £15 full / £10 concessions (cash/card).</p><p>Concession rate applies to students, pensioners, people receiving benefits, jobseekers/unemployed, unwaged (e.g. carer, stay at home parent) and children aged 5 to 16. Children under 5 are free but ticketed so please purchase a free child ticket.</p>'
      }
    }
  }
];

const pages = [
  { src: 'pages/index.njk', out: 'index.html', data: { pageId: 'home', title: 'Traditional Music Classes & Ceilidhs in Edinburgh' } },
  { src: 'pages/classes.njk', out: 'classes.html', data: { pageId: 'classes', title: 'Classes' } },
  { src: 'pages/ceilidhs.njk', out: 'ceilidhs.html', data: { pageId: 'ceilidhs', title: 'Ceilidhs' } },
  { src: 'pages/info.njk', out: 'info.html', data: { pageId: 'info', title: 'Info & Help' } },
  { src: 'pages/community.njk', out: 'community.html', data: { pageId: 'community', title: 'Community' } },
  { src: 'pages/shop.njk', out: 'shop.html', data: { pageId: 'shop', title: 'Shop' } },
  { src: 'pages/news.njk', out: 'news.html', data: { pageId: 'news', title: 'News' } },
  { src: 'pages/about.njk', out: 'about.html', data: { pageId: 'about', title: 'About Us' } },
  { src: 'pages/donate.njk', out: 'donate.html', data: { pageId: 'donate', title: 'Donate & Gift Aid' } },
  ...eventPages,
];

(async () => {
  for (const page of pages) {
    try {
      const html = nunjucks.render(page.src, { site, ...page.data });
      const minified = await htmlMinify(html, {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        sortClassName: true,
        sortAttributes: true,
      });
      const outPath = path.join(distDir, page.out);
      const outDir = path.dirname(outPath);
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outPath, minified, 'utf-8');
      console.log(`  Built: ${page.out}`);
    } catch (err) {
      console.error(`  ERROR building ${page.out}:`, err.message);
    }
  }

  const cssPath = path.join(__dirname, 'src', 'style.css');
  if (fs.existsSync(cssPath)) {
    const cssSource = fs.readFileSync(cssPath, 'utf-8');
    const result = new CleanCSS({ level: 2 }).minify(cssSource);
    fs.writeFileSync(path.join(distDir, 'style.css'), result.styles, 'utf-8');
    console.log(`  Built: style.css (${Math.round((1 - result.styles.length / cssSource.length) * 100)}% smaller)`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${site.url}/${p.out}</loc><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');
  console.log('  Built: sitemap.xml');

  console.log('\nBuild complete!');
})();
