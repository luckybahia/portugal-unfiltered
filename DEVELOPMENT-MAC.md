# Portugal Unfiltered V2 — Mac workflow

## 1. Test the website locally

1. Download `portugal-unfiltered-v2.zip` from ChatGPT.
2. Double-click the ZIP to extract `portugal-unfiltered-v2` into Downloads.
3. In the old Terminal window running the web server, press **Control + C**.
4. In Terminal run:

```bash
cd ~/Downloads/portugal-unfiltered-v2
python3 -m http.server 8000
```

5. Open `http://localhost:8000/planner.html` on your Mac.

If port 8000 is busy, use `python3 -m http.server 8001` and open `http://localhost:8001/planner.html` instead.

## 2. Run basic website checks

Open another Terminal tab (Command + T):

```bash
cd ~/Downloads/portugal-unfiltered-v2
python3 scripts/check_site.py
```

This checks that all linked pages and local CSS/JS files exist. It does not validate external websites or simulate a customer transaction.

## 3. Save work with Git

```bash
cd ~/Downloads/portugal-unfiltered-v2
git init
git add .
git commit -m "Portugal Unfiltered v2 - interactive move planner"
```

The commit may ask you to set a Git name and email once. Git saves change history locally; it does not publish the website automatically.

## 4. Edit files

- `index.html` — homepage
- `planner.html` — new interactive planner page
- `resources.html` — free guides
- `assets/style.css` — appearance
- `assets/main.js` — navigation, region explorer, contact form demo
- `assets/planner.js` — lifestyle self-check and local checklist

The enquiry form and payments are deliberately in demo mode until business systems are connected. Localhost is **only visible on your Mac**, not to customers.

## 5. Later: Go live

Create a private repository (avoid committing secrets), connect a static hosting provider, point a domain, and configure a secure form/booking solution. Never put Stripe/PayPal secret keys into browser JavaScript. The brand's domain, registered business details, legal wording and live checkout remain to be completed.
