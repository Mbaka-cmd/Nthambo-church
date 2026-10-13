# Content guide (src/data/*.json)

Leave a value as null (or a list empty) when it is not confirmed. The site hides or labels it.
Image paths look like "/images/leaders/rev-name.jpg" (file placed in public/images/leaders/).
Use simple filenames: lowercase, no spaces. Max ~300 KB per photo (resize before adding).

## site.json
- hero.image, theme.poster, contact.image, logo: one image path each
- theme: { year, title, verse, reference, poster, gallery: [{ "src": "/images/theme/x.jpg", "alt": "" }] }
- about: { intro, history, vision, mission, images: [{ "src": "/images/about/x.jpg", "alt": "" }] }  (blank line = new paragraph; first 2 images used)
- contact.whatsapp / phone: local (07..) or international (+254..) both work
- social.*, contact.mapUrl, live.url, give.url: full links starting with https://
- live.url: link to the church YouTube live page or channel
- give: { label, url, message, instructions }  (instructions = plain text, e.g. how to give; only what the church confirms)
- services:   [{ "name": "", "day": "", "time": "", "notes": null, "image": null }]
- activities: [{ "name": "", "day": "", "time": "", "venue": null }]

## Other files (each is { "items": [ ... ] })
- ministries.json: { "name": "", "description": null, "leader": null, "meets": null, "image": null }
- leaders.json:    { "name": "", "title": "", "image": null }
- events.json:     { "title": "", "date": "YYYY-MM-DD", "time": null, "location": null, "description": null, "image": null }
                   (no valid date = not shown; past events hidden at build time)
- sermons.json:    { "title": "", "speaker": null, "date": "YYYY-MM-DD", "scripture": null, "youtubeUrl": null, "audioUrl": null, "image": null }
                   youtubeUrl: any normal YouTube link (watch?v=, youtu.be/, /live/, /shorts/). image is used only when there is no YouTube link.
- gallery.json:    { "src": "/images/gallery/x.jpg", "alt": "", "caption": null }

## Forms
Contact and prayer forms open WhatsApp or email with the message prepared. They appear only when
contact.whatsapp or contact.email is set. Nothing is stored on the website.