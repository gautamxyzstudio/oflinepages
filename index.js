const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// Delay range
const MIN_DELAY = 500;
const MAX_DELAY = 1500;

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Read URLs from file
const urlsPath = path.resolve(__dirname, 'urls.txt');
const urls = fs.readFileSync(urlsPath, 'utf-8')
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean);

// Use ENV variable or fallback to local folder
const offlineDir = process.env.OFFLINE_DIR || path.resolve(__dirname, 'offline_listings');

// Ensure directory exists
if (!fs.existsSync(offlineDir)) {
  fs.mkdirSync(offlineDir, { recursive: true });
}

(async () => {
  let count = 0;
  const total = urls.length;

  for (const url of urls) {
    count++;
    console.log(`📥 [${count}/${total}] Downloading full page with media: ${url}`);

    const cmd = `wget --convert-links --adjust-extension --page-requisites --no-parent --span-hosts --timeout=20 --tries=2 --user-agent="Mozilla/5.0" --directory-prefix="${offlineDir}" "${url}"`;

    await new Promise((resolve) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Error downloading ${url}: ${error.message}`);
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

  console.log(`🎉 Done! Downloaded ${count} of ${total} pages to: ${offlineDir}`);
})();
