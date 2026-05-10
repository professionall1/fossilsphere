# Professionall

A modern legal services platform for Indian clients — drafting, filing & legal help made simple.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root:

```
VITE_GOOGLE_SHEETS_URL=your_google_apps_script_web_app_url
VITE_WHATSAPP_NUMBER=919876543210
```

## Google Sheets Setup

1. Create a Google Sheet with columns: Timestamp, Name, Phone, Service, Message
2. Go to Extensions → Apps Script
3. Paste the following function:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.timestamp, data.name, data.phone, data.service, data.message]);
  return ContentService.createTextOutput("OK");
}
```

4. Deploy → New deployment → Web App → Anyone can access
5. Copy the URL into your `.env` file as `VITE_GOOGLE_SHEETS_URL`

## Tech Stack

- Vite + React 18
- Tailwind CSS v4
- Framer Motion
- React Router DOM v6
- React Hot Toast
- Lucide React

## Deploy

**Vercel:**
```bash
vercel deploy
```

**Netlify:**
```bash
netlify deploy --prod
```
