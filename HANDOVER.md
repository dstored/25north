# 25 North — overnight handover (7 Nov 2026)

## What is live

- **Site:** https://dstored.github.io/25north/ (GitHub Pages, free, repo `dstored/25north`)
- **Lead capture:** the membership form relays to **dannysdubai@gmail.com** via FormSubmit.co
  (free, no account). The "Talk to us about a mandate" button is a direct mailto to the same address.
- **Cost so far: £0.**

## Already in your inbox

Two emails are waiting at dannysdubai@gmail.com (check spam too):

1. **A Google Drive share: "25 North — captured leads (7 Nov 2026)"** — the first captured
   leads (both labelled test submissions from the live-site pipeline check), plus how leads
   flow from here.
2. **The FormSubmit activation email** (sender: FormSubmit). This is the one thing to act on:
   click **Activate Form**. After that, every form submission lands in your inbox
   automatically as "25 North lead: <name>".

Until you click it, the site still loses nothing: a visitor who submits gets their own mail
app opened, pre-filled to dannysdubai@gmail.com, framed as step two of joining. Their email
delivers the lead directly.

Optional but recommended afterwards: FormSubmit's activation page shows a random alias
endpoint (looks like `formsubmit.co/ajax/abc123...`). Swap it into `FORM_ENDPOINT` in
`assets/app.js` and push, so your email address isn't visible in the page source.

## Getting the first real leads at zero cost

The site converts; it needs eyeballs. Zero-cost channels, in order of expected yield:

1. **Your LinkedIn post** (draft below). Founder voice outperforms any ad.
2. **DM 10 senior UK operators you already know** with the calculator link. The
   £180k → £72,814 delta is the hook; the honesty is the differentiator.
3. **WhatsApp groups / Slack communities** you're in (fintech, founders): one line +
   the maths link, not a sales pitch.
4. **Comment on UK tax/budget discourse** on LinkedIn with the calculator link where relevant.

### LinkedIn post draft (edit to taste, it's your voice that sells it)

> I've been watching senior UK operators talk themselves out of ambition for two years.
>
> So I built something. 25 North is a private network for senior UK operators who are
> curious about building in the Gulf. Not a recruiter. No CV blasts.
>
> It starts with honesty. On £180k in London you keep £107,186. In Dubai you keep
> £180,000. That's the headline, and the site also tells you what the brochures won't:
> school fees, August, the politics, and who shouldn't come.
>
> If you've ever wondered whether the people building interesting things have moved,
> have a look. Membership is free and private.
>
> https://dstored.github.io/25north/

## What happens when a lead arrives

Email lands at dannysdubai@gmail.com with name, email, role, LinkedIn, and where they are
on the move ("Curious" / "Seriously considering" / "Ready" / "Already in the UAE").
Reply personally within 24h; "Ready" ones get a call booked same week.

## Still open (not blocking)

- **Domain:** site runs on github.io. Buying 25north.co or similar (~£10/yr) breaks the
  zero-cost rule, so it waits for you. GitHub Pages supports custom domains free.
- **Relocation story:** the third content slot waits for a real interviewee. Never fake one.
- **Demand side:** the 21-company target list and outreach kit are in the positioning doc
  (claude.ai/artifact/JTR3v92sg9UDvtndpQUrAj). First two calls: Ziina and Fuze, both have
  live senior vacancies.

## Repo notes

- Stack: static HTML/CSS/JS, no build step. Deploy = `git push` (Pages serves `main`).
- Local preview: `python3 -m http.server 8425`
- Rename: "25 North" appears in `index.html`, the three files in `notes/`, `assets/app.js`
  and `README.md`. Case-sensitive find-and-replace is the whole rebrand.
