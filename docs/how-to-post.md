# How to add posts and events

## A blog post (scripture, lesson, announcement)
Open `src/data/blog.json` and add an entry inside `items` (separate entries with a comma):

    {
      "slug": "short-name-no-spaces",
      "title": "Post title",
      "date": "2026-10-18",
      "category": "Scripture",
      "author": "Name",
      "scripture": "John 3:16",
      "scriptureText": "Type the verse here.",
      "summary": "One or two lines shown on the Blog page.",
      "body": [
        "First paragraph.",
        "A paragraph with a [clickable link](https://www.bible.com) inside it."
      ],
      "links": [ { "label": "Read the full chapter", "url": "https://www.bible.com" } ],
      "youtubeUrl": "https://youtu.be/VIDEO_ID",
      "image": "/images/blog/photo.jpg"
    }

Only `slug`, `title` and `date` are required. Leave out any field you do not need.
Photos go in `public/images/blog/`.

## An event (for example a youth conference)
Open `src/data/events.json` and add an entry inside `items`:

    {
      "title": "Youth Conference",
      "date": "2026-12-05",
      "time": "9:00 AM",
      "location": "PCEA Nthambo Church",
      "description": "Theme, speakers, who may attend.",
      "image": "/images/events/youth-conference.jpg"
    }

The Events page shows only events whose date has not passed. You can also write a Blog post (category "Announcement") with the same details and a poster photo.

## Publishing
After saving, run `git add -A`, `git commit -m "content: new post"`, `git push`. If the site is connected to Netlify, Vercel or Cloudflare Pages it updates by itself.