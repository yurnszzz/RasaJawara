/**
 * Rasa Jawara — Configuration Template
 * =====================================
 * Copy this file to `config.js` and fill in your actual values.
 * 
 * ⚠️ NEVER commit `config.js` to Git — it contains sensitive data.
 * 
 * Setup:
 *   1. Copy:  config.example.js → config.js
 *   2. Fill in your Google Apps Script URL
 *   3. Fill in your contact & payment details
 */

const CONFIG = {
  // Google Apps Script API endpoint for product data
  API_URL: "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE",

  // WhatsApp contact number (format: country code + number, no +)
  WA_PHONE: "628XXXXXXXXXX",

  // Store information
  STORE_NAME: "RASA JAWARA SOUVENIR",
  STORE_ADDRESS: "Jl. Cendana 8 South No.21 Blok C5\nWest Jurang Manggu, Pondok Aren\nSouth Tangerang City, Banten 15223",
  STORE_PHONE: "0857-XXXX-XXXX",

  // Bank transfer details
  BANK_ACCOUNTS: [
    { bank: "BCA", number: "XXXXXXXXXX", owner: "Nama Pemilik" },
    { bank: "BNI", number: "XXXXXXXXXX", owner: "Nama Pemilik" },
  ],

  // Google Maps embed URL (get from Google Maps → Share → Embed)
  MAPS_EMBED_URL: "YOUR_GOOGLE_MAPS_EMBED_URL_HERE",
  MAPS_LINK: "https://maps.google.com/?q=YOUR_LOCATION",

  // Google Maps coordinates
  MAPS_LAT: -6.2586843,
  MAPS_LNG: 106.7190464,
};
