/**
 * Google Sheets Integration via Apps Script Web App
 *
 * Google Apps Script template (paste in Extensions → Apps Script):
 *
 * // Handle form submissions
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Requests");
 *   var data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([data.timestamp, data.name, data.phone, data.service, data.message]);
 *   return ContentService.createTextOutput("OK");
 * }
 *
 * // Handle tracking lookups
 * function doGet(e) {
 *   var action = e.parameter.action;
 *   if (action === "track") {
 *     var id = e.parameter.id;
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tracking");
 *     var data = sheet.getDataRange().getValues();
 *     for (var i = 1; i < data.length; i++) {
 *       if (data[i][0].toString() === id) {
 *         return ContentService.createTextOutput(JSON.stringify({
 *           id: data[i][0],
 *           status: data[i][1],
 *           message: data[i][2]
 *         })).setMimeType(ContentService.MimeType.JSON);
 *       }
 *     }
 *     return ContentService.createTextOutput(JSON.stringify({ status: "not-found" }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 *   return ContentService.createTextOutput("OK");
 * }
 *
 * SHEETS SETUP:
 * - Sheet 1 named "Requests": Columns: Timestamp, Name, Phone, Service, Message
 * - Sheet 2 named "Tracking": Columns: TrackingID, Status, Message
 *   (Status values: pending, in-progress, completed)
 */

export async function submitToGoogleSheets(data) {
  const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;
  if (!SHEETS_URL || SHEETS_URL === 'your_google_apps_script_web_app_url') return true;
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
