import { getCliClient } from 'sanity/cli';
import fs from 'fs';
import path from 'path';

const client = getCliClient();
const downloadsDir = path.join(process.cwd(), '../downloads');

const generateKey = () => Math.random().toString(36).substring(2, 10);

function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const categoryMap = {
    'Forms': { id: 'forms', title: 'Forms', description: 'Application forms, certificates, and other downloadable formats.' },
    'Mandatory_Disclosure': { id: 'mandatory-disclosure', title: 'Mandatory Disclosure', description: 'Mandatory disclosure documents required by statutory bodies.' },
    'Orders_Notices': { id: 'orders-notices', title: 'Orders and Notices', description: 'Official orders, university affiliation notices, and regulations.' },
    'Statutory_Documents': { id: 'statutory-documents', title: 'Statutory Documents', description: 'AICTE approvals and other statutory certificates.' }
};

async function run() {
    console.log("Starting Downloads Migration...");

    for (const [folderName, catInfo] of Object.entries(categoryMap)) {
        const folderPath = path.join(downloadsDir, folderName);
        if (!fs.existsSync(folderPath)) {
            console.log(`Folder ${folderName} not found at ${folderPath}, skipping.`);
            continue;
        }

        const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.pdf'));
        if (files.length === 0) continue;

        console.log(`\nProcessing ${folderName} (${files.length} files)...`);
        
        const items = [];
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            const sizeStr = formatSize(stats.size);
            
            console.log(`Uploading ${file} (${sizeStr})...`);
            
            const fileAsset = await client.assets.upload('file', fs.createReadStream(filePath), {
                filename: file
            });
            
            // Create a clean readable title from the filename
            const title = file
                .replace('.pdf', '')
                .replace(/_/g, ' ')
                .replace(/-/g, ' ')
                .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space before capital letters

            items.push({
                _key: generateKey(),
                title: title,
                file: {
                    _type: 'file',
                    asset: {
                        _type: "reference",
                        _ref: fileAsset._id
                    }
                },
                size: sizeStr,
                date: new Date().toISOString().split('T')[0] // current date YYYY-MM-DD
            });
        }
        
        let existingCat = await client.fetch(`*[_type == "downloadCategory" && id == $id][0]`, { id: catInfo.id });
        
        if (existingCat) {
            console.log(`Updating category: ${catInfo.title}`);
            await client.patch(existingCat._id).set({ items }).commit();
        } else {
            console.log(`Creating category: ${catInfo.title}`);
            await client.create({
                _type: 'downloadCategory',
                id: catInfo.id,
                title: catInfo.title,
                description: catInfo.description,
                items: items
            });
        }
    }
    
    console.log("\n✅ Downloads Migration complete!");
}

run().catch(console.error);
