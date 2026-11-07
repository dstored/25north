# 25 North — candidate-side landing site

Static site for the UK→UAE talent bridge: the candidate-facing page that does the
convincing (honest comp numbers, straight answers, private network sign-up) and a
short demand-side strip for companies.

**25 North is a working name.** It is destination-anchored (25°N is the latitude of
Dubai and Abu Dhabi), so it survives supply-side expansion beyond the UK.

## Stack

No build step, no dependencies. Three files:

- `index.html` — the page
- `assets/styles.css` — design tokens at the top of the file
- `assets/app.js` — comp calculator (real 2025/26 UK income tax + NI bands) and join form

## Deploy

Any static host. Netlify/Vercel: point at this folder, done. Or
`python3 -m http.server` to preview locally.

## Before launch — the TODO list

1. **Wire the form.** Set `FORM_ENDPOINT` in `assets/app.js` to a Formspree/Tally/
   Airtable endpoint. Until then, submissions fall back to a pre-filled email
   (they are not silently dropped, and the site does not fake a success message).
2. **Set the real contact email.** Replace `hello@25north.example` in `assets/app.js`
   (`CONTACT_EMAIL`) and in the `mailto:` link in `index.html` (For companies section).
3. **Domain.** Check/register a 25 North domain variant (25n.co, join25north.com, …).
4. **Tax figures.** The calculator uses 2025/26 England/NI employee bands
   (personal allowance £12,570 with >£100k taper; 20/40/45%; NI 8%/2%). Re-check
   each April, and after any Budget.
5. **Analytics** (optional): add a privacy-respecting snippet (Plausible/Fathom).

## Renaming

The brand appears only as the literal strings `25 North` / `25&nbsp;North` /
`25north` in `index.html`, `assets/app.js` (`CONTACT_EMAIL`, `source` field) and
this README, plus the latitude flourishes (`25.2048° N`). A case-sensitive
find-and-replace across the three files is the whole rebrand; delete the
latitude rule in the hero if the new name isn't latitude-themed.

## Related material

- Economics model (interactive): https://claude.ai/artifact/8EVWRNYcWDzxhx6GxQ5sTu
- Positioning doc (offers, messaging, 90-day plan): https://claude.ai/artifact/JTR3v92sg9UDvtndpQUrAj
