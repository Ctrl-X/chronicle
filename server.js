import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK
let credential;
const serviceAccountPath = path.join(__dirname, 'grimoireculinaire-7234a1652c4f.json');

if (fs.existsSync(serviceAccountPath)) {
    console.log('Using service account key file: grimoireculinaire-7234a1652c4f.json');
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    credential = cert(serviceAccount);
} else {
    console.log('Using Application Default Credentials');
    credential = applicationDefault();
}

initializeApp({
    credential
});

const db = getFirestore('grimoire-culinaire');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Return 404 for missing assets instead of index.html
app.use('/assets', (req, res) => {
    res.status(404).send('Asset not found');
});

// Handle SPA routing: return index.html for all non-API requests
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port} `);
});