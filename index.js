const fs = require('fs');
const { exec } = require('child_process');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const MIN_DELAY = 500;
const MAX_DELAY = 1500;

const urls = fs.readFileSync('urls.txt', 'utf-8')
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean);

const offlineDir = 'offline_listings';
if (!fs.existsSync(offlineDir)) {
  fs.mkdirSync(offlineDir);
}

(async () => {
  let count = 0;
  const total = urls.length;

  for (const url of urls) {
    count++;
    console.log(`📥 [${count}/${total}] Downloading full page with media: ${url}`);

    const cmd = `wget --convert-links --adjust-extension --page-requisites --no-parent --span-hosts --timeout=20 --tries=2 --user-agent="Mozilla/5.0" --directory-prefix=${offlineDir} "${url}"`;

    await new Promise((resolve) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Error downloading ${url}:`, error.message);
        } else {
          console.log(`✅ [${count}/${total}] Downloaded successfully.`);
        }
        resolve();
      });
    });

    const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
    console.log(`⏱️ Waiting ${delay}ms...\n`);
    await sleep(delay);
  }

  console.log(`🎉 Done! Downloaded ${count} of ${total} pages for offline use.`);
})();
