# Sanity Studio for College Website

This directory contains the Sanity CMS configuration and schema definitions for the College Website.

## Managing Schemas

All content types are defined in the `schemas/` directory.

### Key Content Types
- **announcement.js**: Manage scrolling news/notices.
- **teacher.js / principal.js / committee.js**: Manage faculty, staff, and administration profiles.
- **organization.js / department.js**: Manage clubs, technical societies, and department details.
- **pageContent.js**: Manage dynamic content for standard pages.
- **siteSettings.js**: Global settings like maintenance mode.

## Adding or Modifying a Schema
1. Create or edit a file in the `schemas/` folder.
2. Ensure it exports an object defining the `name`, `title`, `type` (usually `'document'`), and `fields`.
3. Import the new schema into `schemas/index.js` and add it to the `schemaTypes` array.

## Running Locally
```bash
npm install
npm run dev
```
Access the studio at `http://localhost:3333`.

## Deployment
To deploy your studio to the web:
```bash
npx sanity deploy
```
