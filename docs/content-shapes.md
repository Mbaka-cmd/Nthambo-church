# Content shapes (what to put in src/data/*.json)

Leave a value as null (or a list empty) when it is not confirmed. The site hides or labels it.

site.json
- services: [{ "name": "Sunday Service", "day": "Sunday", "time": "9:00 AM", "notes": null }]
- activities: [{ "name": "Bible Study", "day": "Wednesday", "time": "6:00 PM", "venue": null }]
- contact.whatsapp / contact.phone: local (07..) or international (+254..) both work
- social.*, contact.mapUrl: full links starting with https://
- about.*: plain text; a blank line starts a new paragraph

ministries.json items: { "name": "", "description": null, "leader": null, "meets": null }
leaders.json items:    { "name": "", "title": "", "photo": null }  (photo e.g. "/images/leaders/name.jpg")
events.json items:     { "title": "", "date": "YYYY-MM-DD", "time": null, "location": null, "description": null }
  - events without a valid date are NOT shown; past events are hidden at build time
sermons.json items:    { "title": "", "speaker": null, "date": "YYYY-MM-DD", "scripture": null, "videoUrl": null, "audioUrl": null }
gallery.json items:    { "src": "/images/gallery/file.jpg", "alt": "", "caption": null }