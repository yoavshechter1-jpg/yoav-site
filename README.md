# Dr. Yoav Shechter — Website

**Stack:** Node.js + Express · Static HTML/CSS/JS frontend · Deployed on Render

---

## Project Structure

```
yoav-site/
├── server.js          # Express server — serves static files + handles contact form
├── package.json
├── render.yaml        # Render deployment config
├── .env.example       # Copy to .env for local dev
└── public/
    ├── index.html     # Full single-page site
    ├── style.css      # All styles
    └── main.js        # Scroll reveal, mobile nav, form submission
```

---

## Local Development

### 1. Install dependencies
```bash
cd yoav-site
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your Gmail credentials (see below)
```

### 3. Start the dev server
```bash
npm run dev   # uses nodemon (auto-restarts on changes)
# or
npm start     # plain node
```

Open [http://localhost:3000](http://localhost:3000)

---

## Email Setup (Gmail App Password)

The contact form sends emails via Gmail using nodemailer. You need a **Gmail App Password** (not your regular password).

**Steps:**
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Enable **2-Step Verification** (required)
3. Go to **Security → App Passwords**
4. Create a new App Password → select "Mail" → your device
5. Copy the 16-character password into `.env` as `EMAIL_APP_PASS`

Your `.env` should look like:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASS=abcd efgh ijkl mnop
EMAIL_TO=yoav.shechter1@gmail.com
```

---

## Before You Launch — Two Placeholders to Update

Open `public/index.html` and search for `TODO`:

1. **WhatsApp link** (line ~245):
   ```html
   <a href="https://wa.me/972XXXXXXXXX" ...>
   ```
   Replace `972XXXXXXXXX` with your actual WhatsApp number (country code + number, no spaces or dashes).
   Example: `https://wa.me/972501234567`

2. **Calendly link** (line ~255):
   ```html
   <a href="https://calendly.com/yoav-shechter" ...>
   ```
   Replace with your actual Calendly URL.

---

## Deploying to Render

### 1. Push to GitHub
Create a new GitHub repository and push all files:
```bash
git init
git add .
git commit -m "Initial site"
git remote add origin https://github.com/YOUR_USERNAME/yoav-site.git
git push -u origin main
```

> ⚠️ Add a `.gitignore` file to avoid committing secrets:
> ```
> node_modules/
> .env
> ```

### 2. Create a Web Service on Render
1. Go to [render.com](https://render.com) → **New → Web Service**
2. Connect your GitHub repository
3. Render will auto-detect the `render.yaml` config
4. Set the following **Environment Variables** in the Render dashboard:
   - `EMAIL_USER` → your Gmail address
   - `EMAIL_APP_PASS` → your 16-character Gmail App Password

### 3. Connect your custom domain
1. In Render → your service → **Custom Domains**
2. Add `dr-yoav-shechter.com` and `www.dr-yoav-shechter.com`
3. Render will give you DNS records
4. Go to your CheapName DNS settings and add the records Render provides
5. Wait up to 24 hours for DNS propagation

---

## Adding Your Photo

Currently the site uses an "YS" avatar initials placeholder. To add a real headshot:

1. Add your photo as `public/photo.jpg` (recommend: 400×400px, square crop)
2. In `public/style.css`, find `.about-avatar` and replace it with:
   ```css
   .about-avatar {
     background-image: url('/photo.jpg');
     background-size: cover;
     background-position: center;
     font-size: 0; /* hides the text */
   }
   ```

---

## Site Sections

| Section | Anchor | Description |
|---|---|---|
| Hero | `#home` | Full-screen intro with headline + stats |
| About | `#about` | Bio, credentials, regional focus |
| Government Affairs | `#services` | 6 service cards |
| AI & Digital | `#ai-digital` | AI agents + policy websites (new) |
| Experience | `#experience` | Merck, Pugatch, Centre Asia, Hebrew U, Pharma Israel |
| Forum | *(no anchor)* | Advanced Policy Forum in Israel |
| Global Reach | *(strip)* | Primary markets |
| Contact | `#contact` | Form + WhatsApp + Calendly + Email |

---

## Tech Notes

- The contact form POSTs JSON to `/api/contact` on the Express server
- All other routes serve `public/index.html` (single-page app pattern)
- `render.yaml` sets `healthCheckPath: /health` — Render uses this to verify the app is running
- Node version: `>=18.0.0` (set in `package.json` engines)
