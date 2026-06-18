# Sanity CMS Content Guidelines

This document provides a comprehensive guide on the types of content required for each section of the website via the Sanity CMS.

## General Image Guidelines

To ensure the website loads fast and looks professional, please adhere to the following rules for all uploaded images:
- **Format**: JPEG or WebP preferred for photos. PNG preferred for logos with transparent backgrounds.
- **Quality**: Ensure images are clear and not pixelated, but also compressed so they aren't massive (keep under 1MB if possible).
- **Cropping (Hotspot)**: Many image fields in Sanity have a "hotspot" feature. After uploading, click the image in Sanity to adjust the focal point (where the image should center when cropped on different screen sizes).

---

## 1. Teacher / Faculty Profile

This schema manages the faculty directory.

### Fields Required:
- **Name**: Full name with title (e.g., *Dr. John Doe*).
- **Department**: Select from the dropdown.
- **Is Head of Department?**: Toggle on if applicable.
- **Designation**: Current role (e.g., *Assistant Professor*).
- **Specialization**: Core area of expertise (e.g., *Machine Learning*).
- **Qualification**: Highest degree (e.g., *Ph.D., M.Tech*).
- **Email & Phone**: Official contact details.
- **Staff Room**: Room number/location.
- **Experience**: e.g., *10 Years*.
- **Teacher Photo**: 
  - **Required Dimensions**: Square aspect ratio (1:1), e.g., 500x500px or 800x800px.
  - *Note*: If you upload a non-square photo, use the Sanity crop tool to crop it into a square. If left blank, a placeholder avatar will be generated.
- **About**: Add paragraphs describing the teacher's background. Each item in the array is a separate paragraph.
- **Word From Teacher**: A short quote or message.
- **Publications**: List of academic papers/journals.

---

## 2. Organization / Clubs

This schema manages student clubs, technical societies (like IEEE), and campus organizations.

### Fields Required:
- **Short Name / Acronym**: e.g., *NSS*, *IEEE*.
- **Full Name**: e.g., *National Service Scheme*.
- **Founded**: Year or exact date.
- **Main Hero Image**: 
  - **Required Dimensions**: High-resolution landscape image (16:9 ratio), ideally **1920x1080px**. This will be used as the large background banner at the top of the organization's page.
- **Website URL**: External link if they have one.
- **Faculty in Charge**: Name of the guiding faculty.
- **Description**: Add paragraphs explaining the organization's purpose.
- **Statistics**: Key metrics (e.g., Label: *Active Members*, Value: *150+*).
- **Major Activities & Professional Ethics**: Bullet points of what they do.
- **Achievements**: Includes Title, Description, Date, and a supporting Image (Standard landscape, e.g., 800x600px).
- **Moment Gallery**: Images from events. Standard landscape or square images.

---

## 3. Events & News

This schema manages announcements, upcoming events, and news articles.

### Fields Required:
- **Title**: Headline of the event/news.
- **Type**: Select *Event* or *News*.
- **Display Date**: e.g., *15 OCT 2025*.
- **Event/News Image**: 
  - **Required Dimensions**: Landscape format, preferably **800x600px** or **1200x630px** (standard Open Graph size).
- **Short Description**: 1-2 sentences summarizing the news. This appears on the small cards.
- **Action Type**: Choose what happens when clicked.
  - *Open Link*: Redirects to an external URL (e.g., a Google Form).
  - *Show Content Details*: Opens a dedicated page on our website. (You will need to fill the **Event/News Details** text field).

---

## 4. Home Page Configurations

This schema manages the dynamic sections of the landing page.

### Fields Required:
- **About Us Section**: Requires a general description, vision statement, and a list of mission points.
- **Placement Section**: 
  - **Recruiters (Logos)**: Upload company logos. **Required Dimensions**: Transparent PNGs, preferably rectangular or square, padded equally (e.g., 400x200px).
  - **Placement Stats**: Label (e.g., *Highest Package*), Value (e.g., *15 LPA*), and Icon name (must match a Lucide React icon name, e.g., *briefcase*).
- **Achievements Carousel**:
  - Title & Subtitle.
  - **Image**: Landscape images, ideally **1200x800px** for consistency across the carousel.
- **Photo Gallery**: High-quality campus images. Mix of landscape and portrait is fine, as the frontend will handle masonry/grid layouts.

---

## 5. Generic Page Content

This schema is used to dynamically build standalone pages (e.g., Facilities, Library, Hostels).

### Fields Required:
- **Title**: Page title.
- **Category**: Select the relevant grouping (e.g., *Facilities*).
- **Image URL**: A direct link to a hero image, or upload via Sanity if the schema is updated to support direct image uploads. **Required Dimensions**: Landscape (1920x1080px).
- **Main Content**: Text body of the page.
- **Tabs**: Used for complex pages (like Library) to separate content into tabbed sections. Provide a Tab Name and Tab Content for each.
- **Gallery Images**: List of URLs for a photo gallery at the bottom of the page.
