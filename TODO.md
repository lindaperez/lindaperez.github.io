# Portfolio TODO — content to strengthen for hiring managers

These are the items I could **not** auto-generate from your GitHub READMEs.
Filling them in will meaningfully raise the bar for Bay Area / big-company reviewers.

Where to edit: `PROJECT_OVERRIDES` in `script.js` (descriptions, tags, and a
`links: { demo: "..." }` field per project).

---

## 1. Live demo URLs (highest impact)
A clickable, working demo is the single strongest signal. Add a `demo` link to
the project override and it shows automatically.

- [ ] **QueryMinds** — is the GCP App Engine deployment publicly reachable? If so,
      add the URL. (README references a "Demo" section — paste the live link.)
- [ ] **RAG Housing Resource Finder** — runs locally/containerized. If you can host
      it (Hugging Face Spaces / Cloud Run / a short Loom video walkthrough), add the link.
- [x] **Bikesharing** — live Tableau dashboard already wired in. ✅

## 2. Metrics to add / confirm (numbers sell)
- [ ] **Credit Risk** — I used "≈66% accuracy, 17K+ records" from the README.
      Confirm the *best* model's headline metric (e.g. BalancedRandomForest
      balanced-accuracy / recall) and I'll feature it.
- [ ] **Heart Disease Prediction** — README is one line. Add: dataset, model,
      and a headline metric (accuracy / ROC-AUC / recall).
- [ ] **Exercise Rep Counting (CV)** — add a counting-accuracy or MAE figure if available.
- [ ] **Cryptocurrency Clustering** — # of cryptocurrencies analyzed and # of clusters found.

## 3. Repos missing a README (reviewers WILL click through)
- [ ] **Ano_Det_SpaceCraft_ESA** — no README at all. Add one: problem, ESA dataset,
      method (e.g. autoencoder / isolation forest), and results. Then I'll enrich the card.
- [ ] **AI_Healthcare_Imaging** — README is two lines. Expand: imaging modality
      (X-ray/CT), model, dataset, and outcome.

## 4. README polish on flagship repos (off-site, high ROI)
For each Featured project, make sure the GitHub README has:
- [ ] A screenshot / GIF near the top
- [ ] A one-line "what + impact" summary
- [ ] Results / metrics section
- [ ] "How to run" steps
(QueryMinds, RAG, Credit Risk, Bikesharing already have strong READMEs.)

## 5. Site copy still pending your input
- [ ] **Hero availability line + "Let's connect" CTA** — confirm target role &
      timing (internship / co-op / new-grad / full-time) and start date so the
      wording is accurate. See chat for proposed examples.
- [ ] Consider a **custom domain** (e.g. lindaperez.dev) instead of github.io.
- [ ] Surface a **LinkedIn recommendation** quote if you have one (social proof).
