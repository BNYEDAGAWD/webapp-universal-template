// Universal Web App Template - Google Apps Script Backend for WSL Development

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
  const action = e.parameter.action;
  const data = JSON.parse(e.parameter.data || '{}');
  
  // Log request for debugging
  console.log('📝 Apps Script Request:', action, data);
  
  try {
    switch(action) {
      case 'callGemini':
        return ContentService
          .createTextOutput(JSON.stringify(callGemini(data.prompt, data.context)))
          .setMimeType(ContentService.MimeType.JSON);
          
      case 'healthCheck':
        return ContentService
          .createTextOutput(JSON.stringify(healthCheck()))
          .setMimeType(ContentService.MimeType.JSON);
          
      case 'workspaceAction':
        return ContentService
          .createTextOutput(JSON.stringify(handleWorkspaceAction(data)))
          .setMimeType(ContentService.MimeType.JSON);
          
      default:
        return ContentService
          .createTextOutput(JSON.stringify({ error: 'Unknown action: ' + action }))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    console.error('📝 Apps Script Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function callGemini(prompt, context = {}) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  
  if (!apiKey) {
    return { 
      error: 'Gemini API key not configured. Add GEMINI_API_KEY to Script Properties.',
      setup: 'Go to Project Settings > Script Properties > Add Property'
    };
  }
  
  try {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;
    
    // Enhanced prompt with context
    const enhancedPrompt = `Context: ${JSON.stringify(context)}
    
User Request: ${prompt}

Please provide a helpful response considering the context provided.`;
    
    const payload = {
      contents: [{
        parts: [{
          text: enhancedPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify(payload)
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    if (result.candidates && result.candidates[0]) {
      return {
        success: true,
        response: result.candidates[0].content.parts[0].text,
        timestamp: new Date().toISOString(),
        usage: result.usageMetadata || {}
      };
    } else {
      return { 
        error: 'No response generated',
        details: result 
      };
    }
    
  } catch (error) {
    console.error('🤖 Gemini API Error:', error);
    return { 
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

function healthCheck() {
  try {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    
    return {
      success: true,
      timestamp: new Date().toISOString(),
      services: {
        appsScript: true,
        geminiConfigured: !!apiKey,
        workspace: {
          sheets: true,
          drive: true,
          gmail: true
        }
      },
      version: '1.0.0'
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

function handleWorkspaceAction(data) {
  try {
    const action = data.action;
    
    switch(action) {
      case 'createSheet':
        return createSpreadsheet(data.name, data.data);
        
      case 'sendEmail':
        return sendEmail(data.to, data.subject, data.body);
        
      case 'saveToDrive':
        return saveToDrive(data.fileName, data.content);
        
      default:
        return { error: 'Unknown workspace action: ' + action };
    }
  } catch (error) {
    return { error: error.toString() };
  }
}

// Google Workspace helper functions
function createSpreadsheet(name, data) {
  try {
    const sheet = SpreadsheetApp.create(name);
    
    if (data && Array.isArray(data)) {
      const range = sheet.getActiveSheet().getRange(1, 1, data.length, data[0].length);
      range.setValues(data);
    }
    
    return {
      success: true,
      spreadsheetId: sheet.getId(),
      url: sheet.getUrl()
    };
  } catch (error) {
    return { error: error.toString() };
  }
}

function sendEmail(to, subject, body) {
  try {
    GmailApp.sendEmail(to, subject, body);
    return { 
      success: true, 
      message: 'Email sent successfully' 
    };
  } catch (error) {
    return { error: error.toString() };
  }
}

function saveToDrive(fileName, content) {
  try {
    const blob = Utilities.newBlob(content, 'text/plain', fileName);
    const file = DriveApp.createFile(blob);
    
    return {
      success: true,
      fileId: file.getId(),
      url: file.getUrl()
    };
  } catch (error) {
    return { error: error.toString() };
  }
}
