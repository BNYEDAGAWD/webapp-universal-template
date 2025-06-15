// Universal Web App Template - Google Apps Script Backend
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  const action = e.parameter.action;
  const data = JSON.parse(e.parameter.data || '{}');
  
  try {
    switch(action) {
      case 'healthCheck':
        return ContentService
          .createTextOutput(JSON.stringify({success: true}))
          .setMimeType(ContentService.MimeType.JSON);
      default:
        return ContentService
          .createTextOutput(JSON.stringify({error: 'Unknown action'}))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
