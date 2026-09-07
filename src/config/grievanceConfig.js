/**
 * Configuration for the Grievance Google Form integration.
 * 
 * Instructions:
 * 1. Create a Google Form with fields:
 *    - Name
 *    - Email
 *    - Phone
 *    - Department
 *    - Semester
 *    - Subject
 *    - Grievance
 * 2. Get the form action URL (e.g., https://docs.google.com/forms/d/e/[FORM_ID]/formResponse)
 * 3. Inspect the form inputs or use "Get pre-filled link" to get the entry IDs (e.g. entry.123456789)
 * 4. Update the values below or set them in your .env file.
 */

export const GRIEVANCE_GOOGLE_FORM_CONFIG = {
    // Google Form formResponse endpoint
    formActionUrl: process.env.REACT_APP_GRIEVANCE_GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSdts3We1JRcb85cjgp-G3PGYhI-G24Fvi6zeWBfkZFRQ862cg/formResponse',

    // Google Form viewform link
    formViewUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdts3We1JRcb85cjgp-G3PGYhI-G24Fvi6zeWBfkZFRQ862cg/viewform',

    // Google Form entry IDs matched from user's pre-filled form
    entryIds: {
        name: process.env.REACT_APP_GRIEVANCE_ENTRY_NAME || 'entry.1323593007',
        email: process.env.REACT_APP_GRIEVANCE_ENTRY_EMAIL || 'entry.468222521',
        phone: process.env.REACT_APP_GRIEVANCE_ENTRY_PHONE || 'entry.386596743',
        department: process.env.REACT_APP_GRIEVANCE_ENTRY_DEPARTMENT || 'entry.1121413607',
        semester: process.env.REACT_APP_GRIEVANCE_ENTRY_SEMESTER || 'entry.510864045',
        subject: process.env.REACT_APP_GRIEVANCE_ENTRY_SUBJECT || 'entry.1051020162',
        grievance: process.env.REACT_APP_GRIEVANCE_ENTRY_GRIEVANCE || 'entry.2068056049',
    },

     
};

export default GRIEVANCE_GOOGLE_FORM_CONFIG;
