**Version 5:** Updated package prices to €79, €149 and €259. The calm color palette and features from V4 remain. See [START-HERE.txt](START-HERE.txt) for simple Mac instructions.

# Portugal Unfiltered — Website Version 5

**Status:** An editable, responsive, multi-page website **prototype**. All pages and menus are implemented. The contact form works in demo mode, with copy and downloadable-enquiry actions. No forms are transmitted, and no payment or scheduling service is connected.

## What's included

- `index.html` — homepage, packages, regional explorer, FAQs and founder introduction
- `services/clarity-call.html` — €79 Portugal Clarity Call
- `services/area-reality-check.html` — €149 Area & Home Reality Check
- `services/move-roadmap.html` — €259 Personal Move Roadmap
- `resources.html` — four introductory guides and links to official sources
- `about.html` — founder story and positioning
- `contact.html` — enquiry form with package preselection
- `privacy.html` — pre-launch privacy notice **draft**
- `terms.html` — pre-launch terms/disclaimers **draft**
- `assets/style.css` — design, responsive styles
- `assets/main.js` — mobile menu, interactive region explorer, demo enquiry flow, integration settings
- `assets/favicon.svg` — website icon

## How to preview

1. Unzip the site folder.
2. Open `index.html` in a web browser.
3. Use the navigation, click the region tabs, and test the contact form. The contact form will make a copy/download of a draft enquiry, **not submit it**.
4. For an optional local web server: from this folder run `python -m http.server 8000`, then visit `http://localhost:8000`.

## What to do before a real launch

**1. Confirm the business identity.** Verify that your intended trade name and domain are available and suitable. *Portugal Unfiltered* is a working brand name; neither a domain nor a trademark has been purchased or cleared as part of this prototype. Insert your actual legal business name, business contact and required business identifiers throughout the site and legal pages.

**2. Connect a functioning business contact form.** You can use an appropriate hosted form provider such as Formspree. Create your own account, set its secure HTTPS form endpoint in `assets/main.js` at `CONFIG.formEndpoint`, and test submissions. The live provider may require you to configure validation, spam protection, and notification emails. Update the privacy notice with the relevant service provider and processing details *before* accepting enquiries.

**3. Connect bookings and checkout.** Create a booking calendar (for example, Calendly) and a legitimate payment provider account (for example, Stripe Payment Links). `assets/main.js` includes placeholders `CONFIG.bookingUrl` and `CONFIG.paymentLinks`. **There are no connected booking or payment actions in this prototype:** add and verify their buttons, customer flow, policies and associated disclosures before going live. Do not accept payment until your scope, cancellation, refund, tax and consumer requirements have been checked.

**4. Review legal and professional boundaries.** Obtain appropriate advice on business registration, invoicing, tax and consumer law, GDPR/privacy and data retention; replace the pre-launch legal drafts. This website deliberately does not claim to provide legal, tax or immigration representation. Real-estate mediation in Portugal is licensed by IMPIC; don't offer brokerage, negotiation or transaction intermediation without appropriate authorization.

**5. Edit the service package scope, prices and founder bio.** These are proposed founding-stage offerings and prices. Verify which services you actually intend and are permitted to deliver. Replace any wording that does not precisely describe your experience or business model.

**6. Publish.** You can host this static site on a service such as Netlify, Cloudflare Pages or GitHub Pages. Publish the folder that contains `index.html`, then attach a domain you own. Set up HTTPS, email, contact testing, analytics only with appropriate privacy controls, and a final mobile review.

## What's already tested

- All ten HTML pages have exactly one page heading and a title.
- Local navigation links resolve to files in this project.
- Mobile menu toggles; no sideways mobile overflow at 390 px width.
- Regional tabs update the regional descriptions.
- Contact form validates inputs and displays an explicit **not sent** notice in demo mode.

## Suggested next improvements

Add authentic founder photographs, verified first-party case studies with consent, more guides, a free downloadable moving checklist, a comparison tool based on sourced costs, booking and payment integrations, and optional languages if you can review all translations.

---

### Source checks used for the site's safety boundaries (3 November 2026)

- Portuguese property mediation licensing (IMPIC): https://www.gov.pt/servicos/mediacao-imobiliaria-licenca-para-o-exercicio-da-atividade
- AIMA official English portal: https://aima.gov.pt/en
- gov.pt residence/visa guide: https://www.gov.pt/guias/migrantes-vistos-e-autorizacoes-para-entrar-e-viver-em-portugal
- Portuguese data protection authority: https://www.cnpd.pt/

This file is a build and setup guide, not legal advice.


### V3 update (4 November 2026)

Added Braga, Guimarães, Coimbra, Aveiro and Viseu to the homepage explorer. The lifestyle questionnaire has eight questions, including household, income source, transport, housing budget, biggest concern, and timing. Results now compare four places to research and give tailored questions to verify. The checklist uses the same localStorage key as V2. See `START-HERE.txt` for an easy Mac walkthrough.

### V4 update (4 November 2026)

Added `assets/theme-v4.css`, loaded after the base styles across every page, to switch to a calm ivory/sage/evergreen palette. The light homepage hero and quieter cards are the main changes; no content, questionnaire logic, or checkout functionality has been changed.

### V5 update (4 November 2026)

Updated the three package prices consistently across the homepage, individual service pages, and contact page. No payment collection or booking systems have been connected.
