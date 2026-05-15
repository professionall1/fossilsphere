# Professionall

A modern legal services platform for Indian clients — drafting, filing & legal help made simple.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

### Frontend (.env file in root)

```
VITE_GOOGLE_SHEETS_URL_HOME=your_home_sheet_apps_script_url
VITE_GOOGLE_SHEETS_URL_PRICING=your_pricing_sheet_apps_script_url
VITE_WHATSAPP_NUMBER=919876543210
```

### Vercel Environment Variables (add in Vercel Dashboard > Settings > Environment Variables)

```
BREVO_SMTP_LOGIN=ab5d67001@smtp-brevo.com
BREVO_SMTP_KEY=your_brevo_smtp_key
NOTIFY_EMAIL=professionall.india@gmail.com
```

## Google Sheets Setup

### Sheet 1: Home Leads

1. Create a Google Sheet with a tab named "Leads"
2. Add columns: Timestamp, Phone, Service, Message
3. Go to Extensions → Apps Script
4. Paste:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.timestamp, data.phone, data.service, data.message]);
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Deploy → New deployment → Web App → Anyone can access
6. Copy URL into `.env` as `VITE_GOOGLE_SHEETS_URL_HOME`

### Sheet 2: Pricing Requests

1. Create a separate Google Sheet with two tabs:
   - "Requests" → Columns: Timestamp, Phone, Document, Service, Pages, Estimate, Status, TrackingID
   - "Tracking" → Columns: TrackingID, Status, Message, Date, Service
2. Go to Extensions → Apps Script
3. Paste:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Requests");
  var data = JSON.parse(e.postData.contents);
  var id = "PRO-" + (sheet.getLastRow());
  sheet.appendRow([data.timestamp, data.phone, data.document, data.service, data.pages, data.estimate, "In Progress", id]);

  var trackSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tracking");
  trackSheet.appendRow([id, "drafting", "Your request is being worked on", data.timestamp, data.service || "Drafting"]);

  return ContentService.createTextOutput(JSON.stringify({ success: true, trackingId: id }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var action = e.parameter.action;
  if (action === "track") {
    var id = e.parameter.id.trim();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tracking");
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().trim() === id) {
        return ContentService.createTextOutput(JSON.stringify({
          id: data[i][0],
          status: data[i][1],
          message: data[i][2],
          date: data[i][3],
          service: data[i][4] || "Drafting"
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "not-found" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy → New deployment → Web App → Anyone can access
5. Copy URL into `.env` as `VITE_GOOGLE_SHEETS_URL_PRICING`

### Updating Tracking Status

To update a user's status, go to the "Tracking" tab in Sheet 2 and change the Status column value to one of:
- `drafting` — Drafting in progress
- `filing` — Filing in progress
- `numbering` — Numbering in progress
- `completed` — All done

## Tech Stack

- Vite + React 19
- Tailwind CSS v4
- Framer Motion
- React Router DOM v7
- React Hot Toast
- Lucide React
- Nodemailer (Vercel serverless)
- Brevo SMTP (email notifications)

## Deploy to Vercel

```bash
vercel deploy --prod
```

Make sure to add the environment variables (BREVO_SMTP_LOGIN, BREVO_SMTP_KEY, NOTIFY_EMAIL) in Vercel Dashboard → Settings → Environment Variables.
