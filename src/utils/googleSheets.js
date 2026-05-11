/**
 * Google Sheets Integration via Apps Script Web App
 *
 * SETUP:
 * 1. Create a Google Sheet with 2 tabs:
 *    - "Requests" → Columns: Timestamp, Phone, Service, Message, Status
 *    - "Tracking" → Columns: TrackingID, Status, Message, Date
 *
 * 2. Go to Extensions → Apps Script and paste this:
 *
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Requests");
 *   var data = JSON.parse(e.postData.contents);
 *   var id = "PRO-" + (sheet.getLastRow());
 *   sheet.appendRow([data.timestamp, data.phone, data.service, data.message, "Pending", id]);
 *
 *   // Also add to Tracking sheet
 *   var trackSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tracking");
 *   trackSheet.appendRow([id, "pending", "Your request has been received", data.timestamp]);
 *
 *   return ContentService.createTextOutput(JSON.stringify({ success: true, trackingId: id }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 *
 * function doGet(e) {
 *   var action = e.parameter.action;
 *   if (action === "track") {
 *     var id = e.parameter.id.trim();
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tracking");
 *     var data = sheet.getDataRange().getValues();
 *     for (var i = 1; i < data.length; i++) {
 *       if (data[i][0].toString().trim() === id) {
 *         return ContentService.createTextOutput(JSON.stringify({
 *           id: data[i][0],
 *           status: data[i][1],
 *           message: data[i][2],
 *           date: data[i][3]
 *         })).setMimeType(ContentService.MimeType.JSON);
 *       }
 *     }
 *     return ContentService.createTextOutput(JSON.stringify({ status: "not-found" }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 *   return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 *
 * 3. Deploy → New Deployment → Web App → Anyone can access
 * 4. Copy URL into .env as VITE_GOOGLE_SHEETS_URL
 */

export async function submitToGoogleSheets(data) {
  const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;
  if (!SHEETS_URL || SHEETS_URL === 'your_google_apps_script_web_app_url') {
    console.warn("Google Sheets URL not configured. Set VITE_GOOGLE_SHEETS_URL in .env");
    return { success: false, message: "Sheets not configured" };
  }
  try {
    const res = await fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: new Date().toISOString(), ...data })
    });
    return { success: true };
  } catch (err) {
    console.error("Sheets error:", err);
    return { success: false, message: err.message };
  }
}

export async function trackRequest(trackingId) {
  const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;
  if (!SHEETS_URL || SHEETS_URL === 'your_google_apps_script_web_app_url') {
    // Demo fallback
    const id = trackingId.replace(/\D/g, '');
    if (id === '101') return { status: 'in-progress', message: 'Your document is being drafted. Expected delivery within 24 hours.' };
    if (id === '102') return { status: 'completed', message: 'Your document has been delivered.' };
    return { status: 'not-found', message: 'Tracking ID not found. Please check and try again.' };
  }
  try {
    const res = await fetch(`${SHEETS_URL}?action=track&id=${encodeURIComponent(trackingId.trim())}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Track error:", err);
    return { status: 'error', message: 'Unable to fetch status. Please try again later.' };
  }
}
