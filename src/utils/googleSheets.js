/**
 * Google Sheets Integration via Apps Script Web App
 *
 * Google Apps Script template (paste in Extensions → Apps Script):
 *
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([data.timestamp, data.name, data.phone, data.service, data.message]);
 *   return ContentService.createTextOutput("OK");
 * }
 */

export async function submitToGoogleSheets(data) {
  const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;
  try {
    await fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: new Date().toISOString(), ...data })
    });
    return true;
  } catch (err) {
    console.error("Sheets error:", err);
    return false;
  }
}
