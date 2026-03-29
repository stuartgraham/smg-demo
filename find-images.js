/**
 * Scottish Traditional Music Charity - Stock Image Finder
 * 
 * Uses Unsplash API to search for relevant free-to-use images.
 * 
 * SETUP: Get a free API key at https://unsplash.com/developers
 *        Then set it below or as env variable UNSPLASH_ACCESS_KEY
 * 
 * Run: node find-images.js
 */

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'YOUR_KEY_HERE';

const SEARCHES = [
  { category: 'Ceilidh / Traditional Dancing', query: 'scottish ceilidh dancing', use: 'Hero banner / events page' },
  { category: 'Ceilidh / Traditional Dancing', query: 'folk dance group', use: 'Events page' },
  { category: 'Fiddle / Violin (Folk)', query: 'violin folk music', use: 'About instruments' },
  { category: 'Fiddle / Violin (Folk)', query: 'fiddle player', use: 'About instruments' },
  { category: 'Group Music Session', query: 'folk music session', use: 'Sessions page' },
  { category: 'Group Music Session', query: 'musicians jamming acoustic', use: 'Sessions page' },
  { category: 'Acoustic Guitar (Folk)', query: 'acoustic guitar folk playing', use: 'About instruments' },
  { category: 'Accordion', query: 'accordion folk music', use: 'About instruments' },
  { category: 'Accordion', query: 'accordion player', use: 'About instruments' },
  { category: 'Music Class / Lesson', query: 'music class adults learning', use: 'Education page' },
  { category: 'Music Class / Lesson', query: 'group music lesson', use: 'Education page' },
  { category: 'Edinburgh / Scottish Landscape', query: 'edinburgh scotland', use: 'Hero banner / about page' },
  { category: 'Edinburgh / Scottish Landscape', query: 'scottish highlands landscape', use: 'Background imagery' },
  { category: 'People Enjoying Music', query: 'people enjoying live music concert', use: 'Testimonials / community' },
  { category: 'People Enjoying Music', query: 'crowd clapping concert', use: 'Community page' },
  { category: 'Sheet Music / Old Books', query: 'sheet music vintage', use: 'Resources page' },
  { category: 'Sheet Music / Old Books', query: 'old music books', use: 'Resources page' },
  { category: 'Pub Session / Informal', query: 'pub live music acoustic', use: 'Sessions page' },
  { category: 'Pub Session / Informal', query: 'musicians pub session', use: 'Sessions page' },
  { category: 'Celtic / Scottish Music', query: 'celtic music instruments', use: 'General' },
];

async function searchUnsplash(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`;
  const res = await fetch(url, {
    headers: { 'Authorization': `Client-ID ${ACCESS_KEY}` }
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  return res.json();
}

function formatPhoto(photo) {
  return {
    url: `${photo.urls.raw}&w=1200&q=80`,
    thumb: `${photo.urls.raw}&w=400&q=80`,
    page: photo.links.html,
    photographer: photo.user.name,
    photographerUrl: `https://unsplash.com/@${photo.user.username}`,
    description: photo.alt_description || photo.description || 'N/A',
    width: photo.width,
    height: photo.height,
  };
}

async function main() {
  if (ACCESS_KEY === 'YOUR_KEY_HERE') {
    console.log('='.repeat(70));
    console.log('SETUP REQUIRED');
    console.log('='.repeat(70));
    console.log('1. Go to https://unsplash.com/developers and create a free app');
    console.log('2. Copy your Access Key');
    console.log('3. Run again with:');
    console.log('   set UNSPLASH_ACCESS_KEY=your_key_here && node find-images.js');
    console.log('');
    console.log('Alternatively, visit these Unsplash search pages directly:');
    console.log('');
    for (const s of SEARCHES.slice(0, 10)) {
      console.log(`  ${s.category}:`);
      console.log(`    https://unsplash.com/s/photos/${encodeURIComponent(s.query)}`);
    }
    console.log('');
    console.log('Also try Pexels (https://www.pexels.com/search/) and Pixabay (https://pixabay.com/images/search/)');
    return;
  }

  console.log('# Scottish Traditional Music Charity - Image Search Results\n');
  const seen = new Set();
  const allResults = [];

  for (const search of SEARCHES) {
    console.log(`Searching: "${search.query}"...`);
    try {
      const data = await searchUnsplash(search.query);
      const photos = data.results.filter(p => !seen.has(p.id)).slice(0, 2);
      for (const photo of photos) {
        seen.add(photo.id);
        allResults.push({ ...formatPhoto(photo), category: search.category, use: search.use });
      }
      await new Promise(r => setTimeout(r, 1100)); // Rate limit
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('# RESULTS\n');

  let currentCat = '';
  for (const r of allResults) {
    if (r.category !== currentCat) {
      currentCat = r.category;
      console.log(`\n## ${currentCat}\n`);
    }
    console.log(`**${r.description}**`);
    console.log(`  Use: ${r.use}`);
    console.log(`  URL: ${r.url}`);
    console.log(`  Thumb: ${r.thumb}`);
    console.log(`  Photo page: ${r.page}`);
    console.log(`  Photographer: ${r.photographer} (${r.photographerUrl})`);
    console.log(`  Size: ${r.width}x${r.height}`);
    console.log('');
  }

  console.log(`\nTotal unique images found: ${allResults.length}`);
  console.log('\nNote: All images are free under the Unsplash License.');
  console.log('Credit photographers where possible (good practice for charities).');
}

main().catch(console.error);
