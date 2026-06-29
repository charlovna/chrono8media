# Chrono8 Media: Content Editing Guide

This guide is for the team. It explains how to add or change the **Testimonials**
and the **Work Showcase** on the website, with no coding required.

You only ever fill in fields in a dashboard. You cannot break the page layout: the
design adjusts automatically to whatever you add.

---

## Before you start

1. Go to **https://chrono8media.com/admin** in your browser.
2. Log in with your TinaCloud account. (If you do not have one yet, ask the site
   owner to invite your email to the TinaCloud project.)
3. On the left you will see two things you can edit:
   - **Testimonials** (the scrolling client quotes)
   - **Work Showcase** (the grid of photos, GIFs, and videos)

After you save any change, the live website takes about **1 to 2 minutes** to update.
Refresh the site after a couple of minutes to see your change.

---

## Adding a Testimonial

1. Click **Testimonials** in the left sidebar.
2. Click into the entry that opens (there is one list of all testimonials).
3. Scroll to the bottom of the list and click **Add Another**.
4. Fill in the fields:
   - **Brand / Client Name** - the company or client name shown on the card
     (for example, `RYZE Performance`).
   - **Person Full Name** - who gave the quote (for example, `Geoffrey Hurth`).
   - **Person Title** - their role (for example, `Founder, RYZE Performance`).
   - **Testimonial Quote** - the actual words. Do **not** add quotation marks;
     the design adds those for you.
   - **Brand Logo** (optional) - upload a logo if you have one.
5. Click **Save** (top right).

To **edit** a testimonial: open Testimonials, click the entry in the list, change
the fields, Save.

To **remove** a testimonial: open Testimonials, find the entry, click the trash /
delete icon next to it, Save.

The scrolling row adjusts to any number of testimonials automatically.

---

## Adding Work (photo, GIF, or video)

1. Click **Work Showcase** in the left sidebar.
2. Click into the entry that opens.
3. Scroll to the bottom and click **Add Another**.
4. Fill in the fields:
   - **Photo, GIF, or Video file** - click to upload your file. When the media
     manager opens, go into the **showcase** folder, then upload. Supported file
     types: `JPG`, `PNG`, `WEBP`, `GIF`, `MP4`, `WEBM`.
   - **Description (for accessibility)** - a short plain description of what is
     shown, for example `Instagram reel for RYZE launch`. This is required and is
     read aloud by screen readers.
   - **Tile size** - choose how big the tile appears on desktop:
     - `normal` = square
     - `wide` = double width
     - `tall` = double height
     Mixing sizes makes the grid look more interesting. If you leave it blank it
     defaults to normal.
5. Click **Save**.

To **edit** or **remove** a tile: open Work Showcase, click the tile in the list,
change it or delete it, then Save.

---

## Media reference: formats, sizes, and tile sizes

### Formats

| Type | Works | Does NOT work |
|---|---|---|
| Photos | JPG, PNG, WEBP, AVIF | HEIC, HEIF, RAW |
| Videos | MP4, WEBM, MOV | Any other format |
| Animations | GIF | (use MP4 instead - smaller file) |

**iPhone users:** iPhones save photos as HEIC by default, which the site cannot display. Before uploading, open the photo in the Photos app, tap Share, then "Save to Files" - it converts to JPG automatically.

### File size limits

| | Limit |
|---|---|
| Photos | Under 1.5 MB |
| Videos | Under 8 MB |
| Hard maximum (upload will fail above this) | 10 MB |

To compress a photo before uploading: [squoosh.app](https://squoosh.app) (free, no account needed).
To compress a video before uploading: [clideo.com/compress-video](https://clideo.com/compress-video) (free, browser-based).

### How videos behave on the site

Videos autoplay silently and loop on repeat. There is no play button and no sound - ever.

- Keep them **5 to 15 seconds** long. Longer loops look the same and just slow the page down.
- Do not rely on audio. Any voiceover or music is not heard by visitors.
- Reels exported from Instagram or a phone are often `.mov` files. These work but are large. Converting to `.mp4` first saves significant space.

### Choosing a tile size

Pick the size that matches the natural shape of your media.

| Tile size | Shape | Best for |
|---|---|---|
| `normal` | Square | Product graphics, square posts |
| `wide` | Widescreen (landscape) | Landscape reels, banner graphics |
| `tall` | Portrait (vertical) | Instagram stories, vertical reels, portrait photos |

If the shape does not match the tile, the site crops the edges and keeps the center. It still looks fine, but choosing the right size avoids cropping.

### Pre-upload checklist

- [ ] File is JPG, PNG, WEBP, MP4, WEBM, MOV, or GIF
- [ ] File is under 1.5 MB (photos) or under 8 MB (videos)
- [ ] iPhone photos are converted from HEIC to JPG
- [ ] File has a clear name before uploading (e.g. `ryze-reel-jan.mp4`, not `IMG_4923.MOV`)
- [ ] When the media manager opens, navigate into the `showcase` folder before uploading

---

## What you do NOT need to worry about

- You cannot delete or break the Testimonials file or the Work Showcase file
  themselves. You only add, edit, and remove items inside them.
- You do not need to touch code, layout, spacing, or colors. The design handles all
  of that and adjusts to whatever you add.
- If something looks off after saving, wait the full 1 to 2 minutes for the rebuild,
  then refresh. If it still looks wrong, contact the site owner.
