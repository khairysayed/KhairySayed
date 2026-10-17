# Dr. Khairy Sayed — Personal Academic Website

A modern, high-performance, and responsive academic website tailored for international visibility, visiting researcher invitations, research collaborations, and grant applications.

---

## 🌟 Key Features

1. **Zero-Build Architecture**: Runs entirely on static HTML5, Tailwind CSS, and lightweight vanilla JavaScript. No complex build tools or software installations required.
2. **Easy Content Management**: All content is separated into human-readable JSON files in the `/data` folder:
   - `data/profile.json`: Biography, degrees, honors, contact info, and profile links.
   - `data/publications.json`: Complete searchable database of 198 peer-reviewed publications with DOIs.
   - `data/projects.json`: Research projects, grants, and international partnerships.
   - `data/teaching.json`: Academic courses and curricula.
3. **198 Verified Publications**: Extracted directly from official ORCID record (`0000-0001-8871-5358`) with live search, filtering by type/year, and direct DOI access.
4. **International Academic Distinction**: Highlights your Fulbright Research Scholar appointment at City College of New York (CCNY) and 10+ years of SCADA operational power engineering background.
5. **Interactive UI**:
   - Dark Mode / Light Mode with persistent toggle.
   - One-click CV Download button (`assets/cv/Dr_Khairy_Sayed_CV.pdf`).
   - Verified profile badges (Google Scholar, Scopus, ORCID, Web of Science, IEEE).
   - Academic collaboration and visiting inquiry modal/form.

---

## 📂 Directory Structure

```text
khairy-academic-website/
├── index.html                     # Main academic homepage portal
├── README.md                      # Maintenance & deployment guide
├── assets/
│   ├── css/
│   │   └── style.css              # Custom typography, animations & grid design
│   ├── js/
│   │   ├── main.js                # Theme toggle, mobile menu, navigation
│   │   └── publications.js        # Search, filter, DOI copy, pagination
│   ├── img/
│   │   ├── profile-placeholder.svg# Default vector academic avatar
│   │   └── profile.jpg            # (Drop your portrait photo here)
│   └── cv/
│       ├── Dr_Khairy_Sayed_CV.pdf # Your downloadable CV document
│       └── README.md              # Instructions for updating CV
└── data/
    ├── profile.json               # Profile info, bio, academic profiles, awards
    ├── publications.json          # 198 verified publications with DOIs
    ├── projects.json              # Funded research projects & placeholders
    └── teaching.json              # Teaching courses & placeholders
```

---

## 📝 How to Update Information (No Coding Required)

### 1. Add Your Profile Picture
1. Save your portrait photo as `profile.jpg` (recommended size: 600x600 pixels).
2. Copy it into the folder `assets/img/`.
3. In `index.html` (line 197), replace `assets/img/profile-placeholder.svg` with `assets/img/profile.jpg`.

### 2. Update Your CV Document
1. Save your up-to-date CV as a PDF file named `Dr_Khairy_Sayed_CV.pdf`.
2. Replace the file inside `assets/cv/Dr_Khairy_Sayed_CV.pdf`.
3. The download buttons throughout the site will immediately serve your new PDF.

### 3. Add or Modify Publications
Open `data/publications.json` in any text editor or on GitHub. Each paper has this clean format:
```json
{
  "id": "pub-new",
  "title": "Your New Paper Title",
  "year": "2026",
  "journal": "IEEE Transactions on Power Systems",
  "type": "journal-article",
  "typeDisplay": "Journal Article",
  "doi": "10.1109/TPWRS.xxxx.xxxx",
  "doiUrl": "https://doi.org/10.1109/TPWRS.xxxx.xxxx",
  "authors": "Dr. Khairy Sayed et al."
}
```

### 4. Update Projects or Grants
Open `data/projects.json` to add grant funding numbers, research milestones, or new industry collaborations.

---

## 🚀 Free Hosting on GitHub Pages (When You Are Ready to Publish)

1. Create a free account on [GitHub.com](https://github.com) (if you don't already have one).
2. Create a new repository named `khairy-sayed.github.io` (or `academic-website`).
3. Upload all the files from this directory to the repository.
4. Go to repository **Settings** &rarr; **Pages**.
5. Under **Branch**, select `main` (or `gh-pages`) and folder `/ (root)`. Click **Save**.
6. Your website will be live worldwide in seconds at:
   `https://<your-username>.github.io`
   *(You can also connect a custom domain like `drkhairysayed.com` for free anytime).*

---

## 💻 Running the Local Preview

A local development server is currently running at:
**[http://localhost:8080](http://localhost:8080)**

To run it again at any time, open PowerShell in this directory and execute:
```powershell
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your web browser.
