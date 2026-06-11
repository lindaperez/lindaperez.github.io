/* ============================================================
   Linda R. Perez — Portfolio content & behavior
   ------------------------------------------------------------
   ALL editable content lives in the arrays below. Change text,
   add/remove items, and the page rebuilds automatically.
   No build step required — just refresh the browser.
   ============================================================ */

/* ---------- 1. HERO STATS (optional compact metrics) ----------
   Set to [] to hide the stats row entirely. */
const STATS = [
  { num: "2027", label: "M.S. Data Science (expected)" },
  { num: "30+",  label: "GitHub projects" },
  { num: "15+",  label: "Certifications & courses" },
  { num: "6",    label: "Industry roles & internships" },
];

/* ---------- 3. PROJECTS ----------
   The Projects section is populated LIVE from your public GitHub repos
   (see GITHUB_USER below). Every repo automatically gets:
     • a thumbnail  -> GitHub's auto-generated social preview image
     • a description -> the repo's GitHub description
     • tags          -> the repo language + GitHub "topics"
     • a Code link   -> the repo URL (plus a Demo link if the repo has a homepage)

   To polish a specific repo (nicer title, custom screenshot, hand-written
   blurb, curated tags), add an entry to PROJECT_OVERRIDES keyed by the EXACT
   repo name. Anything you set here wins over the live GitHub data.

   PROJECT_CONFIG controls list behavior. */
const PROJECT_CONFIG = {
  pageSize: 3,            // projects per page (All projects pagination)
  featuredPageSize: 3,    // featured projects per page
  includeForks: false,    // set true to also list forked repos
  hideArchived: true,     // hide archived repos
  // Repos to never show (config/dotfiles/etc.). Add names as needed.
  exclude: ["lindaperez", "lindaperez.github.io"],
  // Repos to pin to the front (in this order), by exact name:
  pinned: ["DB_QueryMinds", "NLP_Housing_Vector_DB", "17_bk_AI_Credit-Risk-Analysis", "14_bk_Bikesharing"],
  // Flagship repos highlighted in a "Featured" block above the full list.
  // These are pulled out of the paginated "All projects" list to avoid repeats.
  featured: [
    "DB_QueryMinds",
    "NLP_Housing_Vector_DB",
    "17_bk_AI_Credit-Risk-Analysis",
    "CV_Image_pose_detection",
    "14_bk_Bikesharing",
    "Ano_Det_SpaceCraft_ESA",
  ],
};

/* Keyword -> tag inference. Repos rarely have GitHub "topics", so we read the
   repo name + description and add meaningful tags a hiring manager scans for
   (AI, React, Computer Vision, ...). Order is irrelevant; matches are merged.
   EDIT: add patterns or tags here to enrich the project tags. */
const TAG_KEYWORDS = [
  [/\b(ai|artificial intelligence|gpt|llm|agent|genai)\b/, "AI"],
  [/\b(machine learning|\bml\b|predict|prediction|classif|regression|cluster|supervised|unsupervised|model)\b/, "Machine Learning"],
  [/\b(deep learning|neural|cnn|tensorflow|keras|pytorch)\b/, "Deep Learning"],
  [/\b(nlp|language|embedding|vector|retrieval|rag|semantic)\b/, "NLP"],
  [/\b(cv|computer vision|image|pose|opencv|vision|lane|detection|detect)\b/, "Computer Vision"],
  [/\b(react native)\b/, "React Native"],
  [/\breact\b/, "React"],
  [/\bangular\b/, "Angular"],
  [/\bflask\b/, "Flask"],
  [/\bdjango\b/, "Django"],
  [/\b(symfony|\bphp\b)\b/, "PHP"],
  [/\b(etl|pipeline|data integrator)\b/, "ETL"],
  [/\b(sql|postgres|oracle|mysql|sqlite|database)\b/, "SQL"],
  [/\b(spark|pyspark|big data)\b/, "Big Data"],
  [/\b(tableau|plotly|matplotlib|leaflet|dashboard|visuali)\b/, "Data Visualization"],
  [/\b(analys|analytics|kpi|insight|trend)\b/, "Analytics"],
  [/\b(scrap|spider|crawl|dom)\b/, "Web Scraping"],
  [/\b(docker|container)\b/, "Docker"],
  [/\b(gcp|google cloud|aws|cloud|app engine|vertex)\b/, "Cloud"],
];

/* Hiring-manager ordering: group projects into relevance tiers so the
   strongest, most recent AI/ML work surfaces first (pinned always win).
   Lower number = shown earlier. */
function projectTier(tags) {
  const t = new Set(tags);
  if (["AI", "Machine Learning", "Deep Learning", "NLP", "Computer Vision"].some((x) => t.has(x))) return 1;
  if (["Analytics", "Data Visualization", "ETL", "Big Data"].some((x) => t.has(x))) return 2;
  if (["React", "React Native", "Angular", "Django", "Flask", "PHP", "Web Scraping"].some((x) => t.has(x))) return 3;
  return 4;
}

const PROJECT_OVERRIDES = {
  "DB_QueryMinds": {
    title: "QueryMinds — AI-Assisted SQL Learning Platform",
    img: "assets/projects/project-1.png",
    desc: "Project lead for a 3-person team building an AI-assisted SQL learning and analytics platform: GPT-4-generated practice, AI-assisted grading, gated learning paths, and instructor analytics dashboards over a normalized MySQL learning-record store, deployed on Google Cloud (App Engine + Cloud SQL).",
    tags: ["Python", "Django", "MySQL", "GPT-4", "GCP", "Analytics"],
  },
  "NLP_Housing_Vector_DB": {
    title: "RAG System — Housing Resource Finder",
    img: "assets/projects/project-2.svg",
    desc: "Retrieval-Augmented Generation chatbot answering housing questions (rental assistance, affordable housing, tenant rights) from official local documents. An ingestion pipeline parses and chunks PDFs/web pages into embeddings in a vector store; the backend builds citation-grounded prompts for a local/containerized LLM and returns numbered source citations for verifiability.",
    tags: ["Python", "Flask", "RAG", "Vector Search", "LLM", "Docker"],
  },
  "14_bk_Bikesharing": {
    title: "Bikesharing / Ride-Sharing Analytics",
    img: "assets/projects/project-4.png",
    desc: "Analyzed 2.34M NYC Citi Bike trips to assess the viability of a Des Moines bike-share — profiling rider mix (81% subscribers / 19% customers), trip duration by demographics, and peak-usage patterns — delivered as an interactive Tableau dashboard.",
    tags: ["Python", "Pandas", "Tableau", "Data Visualization", "Analytics"],
    links: { demo: "https://public.tableau.com/app/profile/linda.perez/viz/NYC_citibike_challenge_16526601638260/DataAnalysisStory" },
  },
  "17_bk_AI_Credit-Risk-Analysis": {
    title: "Credit Risk Analysis",
    img: "assets/projects/project-3.svg",
    desc: "Compared resampling and ensemble methods (RandomOverSampler, SMOTE, ClusterCentroids, SMOTEENN, BalancedRandomForest, EasyEnsemble) on imbalanced LendingClub credit data (17K+ records) to predict loan-default risk — evaluating accuracy, precision, recall, and F1 to recommend a model for lending decisions.",
    tags: ["Python", "scikit-learn", "Machine Learning", "Classification", "imbalanced-learn"],
  },

  /* --- Curated blurbs (hiring-manager friendly). Tags are auto-inferred
     unless overridden; titles fall back to a prettified repo name. --- */
  "CV_Image_pose_detection": {
    title: "Exercise Rep Counting (Computer Vision)",
    desc: "Computer-vision study comparing pose-based vs RGB-based approaches for counting exercise repetitions from video (LLSP dataset) — covering pose extraction, feature construction, model training, hard-case analysis, and a squat-only runtime prototype.",
    tags: ["Python", "Computer Vision", "Deep Learning", "Pose Estimation"],
  },
  "CV-detect-lanes": {
    title: "Real-Time Lane Detection",
    desc: "Detects road-lane boundaries from driving video using grayscale/adaptive preprocessing, Canny edge detection, ROI masking, and line fitting — overlaying detected lanes and the region-of-interest in real time.",
    tags: ["Python", "Computer Vision", "OpenCV"],
  },
  "CV-sp-26-mini-2": {
    title: "Real-Time Image Processing (OpenCV)",
    desc: "Real-time application that captures live webcam video and applies OpenCV image-processing transforms on the stream.",
    tags: ["Python", "Computer Vision", "OpenCV"],
  },
  "Heart_Prediction_NEU": {
    title: "Heart Disease Prediction",
    desc: "Supervised ML model predicting a patient's likelihood of heart disease to support early clinical risk screening, with feature analysis and model evaluation.",
    tags: ["Python", "Machine Learning", "Healthcare"],
  },
  "Ano_Det_SpaceCraft_ESA": {
    title: "Spacecraft Anomaly Detection (ESA)",
    desc: "Anomaly detection on European Space Agency spacecraft telemetry time series, flagging abnormal sensor behavior for fault monitoring.",
    tags: ["Python", "Machine Learning", "Anomaly Detection"],
  },
  "AI_Healthcare_Imaging": {
    title: "Healthcare Imaging with Deep Learning",
    desc: "Applied machine learning and deep learning to medical-imaging analysis, exploring classification and feature extraction on health image data.",
    tags: ["Python", "Deep Learning", "Computer Vision", "Healthcare"],
  },
  "18_bk_AI_Cryptocurrencies": {
    title: "Cryptocurrency Clustering",
    desc: "Unsupervised clustering of tradable cryptocurrencies using StandardScaler, PCA for dimensionality reduction, and K-means (with Elbow-curve k selection) to group assets into an investment-portfolio classification.",
    tags: ["Python", "Machine Learning", "Clustering", "PCA", "K-means"],
  },
  "20_bk_AI_Covid19-Risk": {
    title: "COVID-19 Risk Analysis",
    desc: "Exploratory and predictive analysis of COVID-19 case data, surfacing risk factors and trends across populations.",
    tags: ["Python", "Machine Learning", "Analytics"],
  },
  "16_bk_Amazon-Vine-Analysis": {
    title: "Amazon Vine Review Analysis",
    desc: "Big-data analysis of Amazon Vine product reviews using PySpark to test whether paid reviews skew more favorable.",
    tags: ["Python", "Big Data", "PySpark", "Analytics"],
  },
  "13_bk_Mapping-Earthquakes": {
    title: "Earthquake Mapping Visualization",
    desc: "Interactive Leaflet map visualizing global earthquake data with layered controls for magnitude, tectonic plates, and base maps.",
    tags: ["JavaScript", "Data Visualization", "Leaflet"],
  },
  "10_bk_Mission-to-Mars": {
    title: "Mission to Mars (Web Scraping)",
    desc: "Web app that scrapes and stores Mars exploration data (news, images, facts) and serves it through a Flask + MongoDB interface.",
    tags: ["Python", "Flask", "Web Scraping", "MongoDB"],
  },
  "8_bk_Movies-ETL": {
    title: "Movies ETL Pipeline",
    desc: "ETL pipeline that extracts, cleans, and merges movie data from multiple sources and loads it into a PostgreSQL database.",
    tags: ["Python", "ETL", "SQL"],
  },
  "5_bk_PyBer-Analysis": {
    title: "PyBer Ride-Share Analysis",
    desc: "Ride-share data analysis with summary statistics and Matplotlib visualizations comparing usage across city types.",
    tags: ["Python", "Analytics", "Data Visualization"],
  },
  "6_bk_World-Weather-Analysis": {
    title: "World Weather Analysis",
    desc: "Collected and analyzed global weather data to recommend travel destinations matching user-defined criteria.",
    tags: ["Python", "Analytics", "Pandas"],
  },
  "JS_Free-Spider": {
    title: "DOM Web Scraper",
    desc: "JavaScript scraper that extracts structured information directly from a site's DOM — early hands-on web-data extraction work.",
    tags: ["JavaScript", "Web Scraping"],
  },
  "PHP_TechServices": {
    title: "Tech Services CRUD (Symfony)",
    desc: "Customer-services management application with full CRUD workflows built on the Symfony PHP framework.",
    tags: ["PHP", "Symfony", "SQL"],
  },
};

/* Fallback shown only if the GitHub API can't be reached (offline / rate
   limited). These keep the section from ever appearing empty. */
const FALLBACK_PROJECTS = [
  {
    title: "QueryMinds — SQL Educational System",
    img: "assets/projects/project-1.png",
    desc: "Full-stack AI learning app with GPT-based SQL autocorrection, hint generation, and learner/class analytics dashboards.",
    tags: ["Python", "Django", "React", "SQL", "GPT"],
    links: { code: "https://github.com/lindaperez/DB_QueryMinds" },
  },
  {
    title: "Bikesharing / Ride-Sharing Analytics",
    img: "assets/projects/project-4.png",
    desc: "Transportation usage analysis with KPI-oriented insights and dashboards.",
    tags: ["Python", "Pandas", "Tableau", "Matplotlib"],
    links: { code: "https://github.com/lindaperez/14_bk_Bikesharing" },
  },
  {
    title: "Credit Risk Analysis",
    img: "assets/projects/project-3.svg",
    desc: "ML credit-risk prediction framed as a business decision problem.",
    tags: ["Python", "Jupyter", "Machine Learning", "Classification"],
    links: { code: "https://github.com/lindaperez/17_bk_AI_Credit-Risk-Analysis" },
  },
];

/* ---------- 4. CERTIFICATIONS & COURSES ----------
   featured: true items always show; others appear on "Show all".
   issuer = provider, detail = program / course names. */
const CERTIFICATIONS = [
  {
    title: "Fraud Detection on Financial Transactions with ML on Google Cloud",
    issuer: "Google Cloud",
    detail: "Applied machine learning on GCP",
    year: "2026",
    featured: true,
  },
  {
    title: "Claude Code 101 · Subagents · Agent Skills · AI Fluency Framework",
    issuer: "Anthropic",
    detail: "AI Capabilities & Limitations; AI Fluency Framework & Foundations; Claude 101",
    year: "2026",
    featured: true,
  },
  {
    title: "Machine Learning & NLP Specialization courses",
    issuer: "DeepLearning.AI / Stanford",
    detail: "Supervised ML: Regression & Classification; Advanced Learning Algorithms; NLP with Classification & Vector Spaces",
    year: "2025",
    featured: true,
  },
  {
    title: "Multi-Agent Systems",
    issuer: "Coursera",
    detail: "Design and coordination of multi-agent systems",
    year: "2026",
    featured: true,
    inProgress: true,
  },
  {
    title: "PCEP — Certified Entry-Level Python Programmer",
    issuer: "OpenEDG",
    detail: "Python certification",
    year: "2022",
    featured: true,
  },
  {
    title: "Berkeley Data Analytics Boot Camp",
    issuer: "UC Berkeley Extension",
    detail: "Data analytics; plus STATX10-068 Introduction to Statistics (2024)",
    year: "2022",
    featured: false,
  },

  /* --- LinkedIn Learning (each course listed individually, 2019–2023) ---
     EDIT: add any additional LinkedIn certificates here as new entries. */
  {
    title: "Intermediate SQL for Data Scientists",
    issuer: "LinkedIn Learning",
    year: "2019–2023",
    featured: false,
  },
  {
    title: "Advanced SQL: Logical Query Processing, Part 1",
    issuer: "LinkedIn Learning",
    year: "2019–2023",
    featured: false,
  },
  {
    title: "SQL Essential Training",
    issuer: "LinkedIn Learning",
    year: "2019–2023",
    featured: false,
  },
  {
    title: "Advanced Python",
    issuer: "LinkedIn Learning",
    year: "2019–2023",
    featured: false,
  },
  {
    title: "Unit Testing and Test-Driven Development in Python",
    issuer: "LinkedIn Learning",
    year: "2019–2023",
    featured: false,
  },
  {
    title: "Learning REST APIs",
    issuer: "LinkedIn Learning",
    year: "2019–2023",
    featured: false,
  },
  {
    title: "Business Analysis Foundations",
    issuer: "LinkedIn Learning",
    year: "2019–2023",
    featured: false,
  },
];

/* ---------- 5a. EXPERIENCE (most recent first) ---------- */
const EXPERIENCE = [
  {
    date: "Mar 2017 – Present · San Jose, CA",
    role: "Career Break — Continuous Professional Development",
    org: "Full-time parenting",
    points: [
      "Planned career break for full-time parenting.",
      "Continued growing in data science, analytics, ML, and AI through UC Berkeley Extension, LinkedIn Learning, Coursera, the M.S. program, and self-directed projects.",
    ],
  },
  {
    date: "Sep 2015 – Aug 2016 · Santiago, Chile",
    role: "Software Developer, SOA CRM",
    org: "VASS LATAM",
    points: [
      "Designed PL/SQL and Oracle SQL scripts enabling 80+ web services to access integrated payments, credit, and customer data sources in a service-oriented architecture.",
      "Built ETL pipelines with MySQL, PL/SQL, and Oracle Data Integrator to consolidate high-volume transactional data, cutting query times and accelerating decision-support reporting.",
    ],
  },
  {
    date: "May 2015 – Aug 2015 · Remote",
    role: "Data Scraper (Freelance)",
    org: "Neuvoo / Talent.com",
    points: [
      "Built and maintained 20+ daily production-ready scraping scripts automating job-posting extraction from job boards and company websites.",
      "Increased listing coverage and automated ingestion, supporting job-search visibility for millions of users with JavaScript, jQuery, and PHP.",
    ],
  },
  {
    date: "Jun 2014 – Jun 2015 · Caracas, VE",
    role: "Database Specialist",
    org: "Universal Bank B.O.D",
    points: [
      "Built 100+ SQL Server pipelines, scheduled jobs, and ETL/data-delivery infrastructure serving financial information across business departments.",
      "Developed IBM Cognos Report Studio reports on customer and account activity, surfacing trends and analytics summaries used by Business Managers for decision-making.",
    ],
  },
  {
    date: "May 2013 – Oct 2013 · Caracas, VE",
    role: "Software Developer Intern",
    org: "Sudeban",
    points: [
      "Built and integrated a corporate internal portal with 30+ workflows and portlets for the company-wide employee base.",
      "Achieved 100% adoption across departments within 3 months using the Liferay framework, SQL, and LDAP.",
    ],
  },
  {
    date: "Jul 2011 – Sep 2011 · Caracas, VE",
    role: "Software Developer Intern",
    org: "Banco Agrícola",
    points: [
      "Built a production-ready full-stack inventory system centralizing tracking of millions of hardware assets.",
      "Improved asset visibility and reduced manual tracking using Symfony, PHP, PostgreSQL, JavaScript, HTML, and CSS.",
    ],
  },
];

/* ---------- 5b. EDUCATION ---------- */
const EDUCATION = [
  {
    date: "Expected May 2027 · San Jose, CA",
    role: "M.S. in Data Science",
    org: "Northeastern University",
    points: [
      "Currently taking: Machine Learning.",
      "Coursework: Computer Vision, NLP, Machine Learning, Unsupervised Learning, Algorithms, Database Systems, Data Management.",
    ],
  },
  {
    date: "2006 – 2014 · Caracas, VE",
    role: "B.S. in Computer Science",
    org: "Universidad Simón Bolívar",
    points: [
      "Foundations in software engineering, algorithms, and databases.",
    ],
  },
];

/* ---------- 6. SKILLS (grouped by category) ----------
   level: 0–100 self-rated proficiency, used to draw the radar chart.
   EDIT these numbers to reshape the radar. */
const SKILLS = [
  { group: "Data Science / ML", level: 85, items: ["scikit-learn", "Pandas", "NumPy", "Classification", "Clustering", "Model Evaluation", "NLP", "Embeddings", "RAG", "LLM workflows"] },
  { group: "Programming", level: 80, items: ["Python", "SQL", "JavaScript", "Git", "Linux"] },
  { group: "Data Engineering", level: 90, items: ["ETL pipelines", "SQL Server", "MySQL", "Oracle SQL", "PL/SQL", "Spark", "Data quality checks"] },
  { group: "Cloud & Tools", level: 78, items: ["GCP", "BigQuery", "Vertex AI", "App Engine", "AWS S3", "AWS RDS", "Docker", "Docker Compose"] },
  { group: "Analytics & Viz", level: 80, items: ["Product analytics", "KPI definition", "Root-cause analysis", "Tableau", "Plotly", "Matplotlib", "Dashboards"] },
];

/* ---------- 6b. GITHUB ----------
   Username for the live Open Source panel (public GitHub REST API,
   no auth/key required). EDIT to your handle. */
const GITHUB_USER = "lindaperez";

/* ---------- 7. HONORS / EDUCATION HIGHLIGHTS ---------- */
const HONORS = [
  { year: "2027", text: "M.S. in Data Science (expected), Northeastern University — Silicon Valley" },
  { year: "2014", text: "B.S. in Computer Science, Universidad Simón Bolívar (Caracas, Venezuela)" },
];

/* ============================================================
   RENDERING — you generally do not need to edit below here.
   ============================================================ */

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html != null) node.innerHTML = html;
  return node;
}

/* Image with automatic gradient-placeholder fallback */
function mediaImg(src, alt) {
  const img = el("img", "proj__img");
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  img.width = 400; img.height = 250;
  img.onerror = function () {
    this.removeAttribute("src");
    this.alt = "";
    this.setAttribute("role", "presentation");
  };
  return img;
}

/* True when the visitor prefers reduced motion — we then skip
   count-up / radar animations and render final values immediately. */
const REDUCED_MOTION =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Run a callback once, the first time `node` scrolls into view. */
function onReveal(node, cb) {
  if (REDUCED_MOTION || !("IntersectionObserver" in window)) { cb(); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { cb(); obs.disconnect(); }
    });
  }, { threshold: 0.35 });
  io.observe(node);
}

/* Splits "10+" -> { value: 10, prefix: "", suffix: "+" }.
   Non-numeric values like "MS" return value: null (shown as-is). */
function parseStat(raw) {
  const m = String(raw).match(/^(\D*?)(\d+(?:\.\d+)?)(\D*)$/);
  if (!m) return { value: null, text: String(raw) };
  return { prefix: m[1], value: parseFloat(m[2]), suffix: m[3], decimals: (m[2].split(".")[1] || "").length };
}

function animateCount(node, target, decimals, prefix, suffix) {
  const duration = 1100;
  let start = null;
  function step(ts) {
    if (start === null) start = ts;
    const t = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    const current = (target * eased).toFixed(decimals);
    node.textContent = `${prefix}${current}${suffix}`;
    if (t < 1) requestAnimationFrame(step);
    else node.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
  }
  requestAnimationFrame(step);
}

function renderStats() {
  const root = document.getElementById("stats");
  if (!root || !STATS.length) { if (root) root.remove(); return; }
  STATS.forEach((s) => {
    const li = el("li", null, `<span class="stat__num"></span><span class="stat__label">${s.label}</span>`);
    const numEl = li.querySelector(".stat__num");
    const parsed = parseStat(s.num);
    if (parsed.value == null) {
      numEl.textContent = parsed.text;            // e.g. "MS" — no animation
    } else {
      numEl.textContent = `${parsed.prefix}0${parsed.suffix}`;
      onReveal(li, () => animateCount(numEl, parsed.value, parsed.decimals, parsed.prefix, parsed.suffix));
    }
    root.appendChild(li);
  });
}

function projectLinks(links = {}) {
  const labels = { code: "Code", demo: "Demo", paper: "Paper", page: "Details", pdf: "PDF" };
  return Object.entries(links)
    .map(([k, url]) => `<a href="${url}" ${url !== "#" ? 'target="_blank" rel="noopener"' : ""}>${labels[k] || k}</a>`)
    .join("");
}

/* Turn "14_bk_AI_Credit-Risk-Analysis" -> "Credit Risk Analysis".
   Strips leading numeric/initial prefixes, swaps separators for spaces,
   and title-cases words (leaving ALL-CAPS acronyms intact). */
function prettifyRepoName(name) {
  let s = name.replace(/[_-]+/g, " ").trim();
  // drop leading throwaway tokens like "14", "bk", "ai" (kept short list)
  const drop = new Set(["bk"]);
  const parts = s.split(" ").filter(Boolean);
  while (parts.length > 1 && (/^\d+$/.test(parts[0]) || drop.has(parts[0].toLowerCase()))) {
    parts.shift();
  }
  return parts
    .map((w) => (w === w.toUpperCase() ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/* Build a rich tag set for a repo: language (+ Python for notebooks),
   GitHub topics, and keyword-inferred domain/tech tags. Deduped, capped. */
function inferTags(repo) {
  const tags = [];
  const push = (t) => { if (t && !tags.includes(t)) tags.push(t); };

  // language (normalize Jupyter Notebook -> Jupyter, and imply Python)
  if (repo.language === "Jupyter Notebook") { push("Jupyter"); push("Python"); }
  else if (repo.language) push(repo.language);

  (repo.topics || []).forEach(push);

  // keyword inference from name + description
  const hay = `${repo.name} ${repo.description || ""}`.toLowerCase().replace(/[_-]+/g, " ");
  TAG_KEYWORDS.forEach(([re, tag]) => { if (re.test(hay)) push(tag); });

  return (tags.length ? tags : ["Repository"]).slice(0, 6);
}

/* Merge a live GitHub repo object with any PROJECT_OVERRIDES entry. */
function repoToProject(repo) {
  const o = PROJECT_OVERRIDES[repo.name] || {};
  const links = { code: repo.html_url };
  if (repo.homepage && /^https?:\/\//.test(repo.homepage)) links.demo = repo.homepage;
  Object.assign(links, o.links || {});   // override/add demo, paper, page, etc.
  return {
    name: repo.name,
    title: o.title || prettifyRepoName(repo.name),
    desc: o.desc || repo.description || "Public repository on GitHub.",
    img: o.img || `https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo.name}`,
    tags: o.tags || inferTags(repo),
    links,
    stars: repo.stargazers_count || 0,
    pushed: repo.pushed_at || "",
  };
}

/* Merge repos -> projects, then apply hiring-manager ordering using the
   FINAL tags (so curated overrides land in the right tier):
   pinned first, then relevance tier (AI/ML > analytics > web > other),
   then most recently pushed. */
function buildSortedProjects(repos) {
  const pinned = (PROJECT_CONFIG && PROJECT_CONFIG.pinned) || [];
  const rank = (name) => {
    const i = pinned.indexOf(name);
    return i === -1 ? Infinity : i;
  };
  return repos
    .map(repoToProject)
    .sort((a, b) =>
      (rank(a.name) - rank(b.name)) ||
      (projectTier(a.tags) - projectTier(b.tags)) ||
      (new Date(b.pushed) - new Date(a.pushed))
    );
}

function projectRow(p) {
  const row = el("article", "proj");
  row.dataset.tags = (p.tags || []).join("|");

  const primary = (p.links && (p.links.demo || p.links.page || p.links.code || p.links.paper)) || null;
  const img = mediaImg(p.img, `${p.title} thumbnail`);
  if (primary && primary !== "#") {
    const a = el("a", "proj__thumb");
    a.href = primary; a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", `${p.title} — open project`);
    a.appendChild(img);
    row.appendChild(a);
  } else {
    const wrap = el("div", "proj__thumb");
    wrap.appendChild(img);
    row.appendChild(wrap);
  }

  const body = el("div", "proj__body");
  body.appendChild(el("h3", "proj__title", p.title));
  body.appendChild(el("p", "proj__desc", p.desc));
  const tags = el("ul", "proj__tags");
  (p.tags || []).forEach((t) => tags.appendChild(el("li", null, t)));
  body.appendChild(tags);
  if (p.links && Object.keys(p.links).length) {
    body.appendChild(el("div", "proj__links", projectLinks(p.links)));
  }
  row.appendChild(body);
  return row;
}

/* Featured (flagship) projects — highlighted cards, paginated like the
   main list. `projects` is already in featured order. */
const FEAT_STATE = { items: [], page: 1, pageSize: 3 };

function renderFeatured(projects) {
  const block = document.getElementById("featured-block");
  if (!projects.length) { if (block) block.hidden = true; return; }
  if (block) block.hidden = false;
  FEAT_STATE.items = projects;
  FEAT_STATE.page = 1;
  FEAT_STATE.pageSize = (PROJECT_CONFIG && PROJECT_CONFIG.featuredPageSize) || 3;
  renderFeaturedPage();
}

function renderFeaturedPage(scroll) {
  const root = document.getElementById("featured-grid");
  if (!root) return;
  root.innerHTML = "";
  const pages = Math.max(1, Math.ceil(FEAT_STATE.items.length / FEAT_STATE.pageSize));
  if (FEAT_STATE.page > pages) FEAT_STATE.page = pages;
  const start = (FEAT_STATE.page - 1) * FEAT_STATE.pageSize;
  FEAT_STATE.items.slice(start, start + FEAT_STATE.pageSize).forEach((p) => {
    const row = projectRow(p);
    row.classList.add("proj--featured");
    root.appendChild(row);
  });
  buildPager(document.getElementById("featured-pager"), FEAT_STATE.page, pages,
    FEAT_STATE.items.length, "featured project", goToFeaturedPage);
  if (scroll) {
    const s = document.getElementById("projects");
    if (s) s.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "start" });
  }
}

function goToFeaturedPage(n) {
  const pages = Math.max(1, Math.ceil(FEAT_STATE.items.length / FEAT_STATE.pageSize));
  FEAT_STATE.page = Math.min(Math.max(1, n), pages);
  renderFeaturedPage(true);
}

/* Paginated project list. State lives in PROJ_STATE so the tag filter and
   pager can re-render the current slice without refetching. */
const PROJ_STATE = { all: [], filtered: [], page: 1, pageSize: 6 };

function renderProjects(projects) {
  // Hide the whole "All projects" sub-block if there's nothing to paginate.
  const block = document.getElementById("allprojects-block");
  if (block) block.hidden = !projects.length;
  if (!projects.length) return;

  PROJ_STATE.all = projects;
  PROJ_STATE.filtered = projects;
  PROJ_STATE.page = 1;
  PROJ_STATE.pageSize = (PROJECT_CONFIG && PROJECT_CONFIG.pageSize) || 6;
  buildProjectFilter(projects);
  renderProjectPage();
}

function totalProjectPages() {
  return Math.max(1, Math.ceil(PROJ_STATE.filtered.length / PROJ_STATE.pageSize));
}

function renderProjectPage(scroll) {
  const root = document.getElementById("projects-grid");
  if (!root) return;
  root.innerHTML = "";

  const pages = totalProjectPages();
  if (PROJ_STATE.page > pages) PROJ_STATE.page = pages;
  const start = (PROJ_STATE.page - 1) * PROJ_STATE.pageSize;
  const slice = PROJ_STATE.filtered.slice(start, start + PROJ_STATE.pageSize);

  if (!slice.length) {
    root.appendChild(el("p", "gh__status", "No projects match that filter."));
  } else {
    slice.forEach((p) => root.appendChild(projectRow(p)));
  }

  renderPager();

  // When paging via controls, bring the section heading into view.
  if (scroll) {
    const sec = document.getElementById("projects");
    if (sec) sec.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "start" });
  }
}

function goToProjectPage(n) {
  const pages = totalProjectPages();
  PROJ_STATE.page = Math.min(Math.max(1, n), pages);
  renderProjectPage(true);
}

/* Generic numbered pager with Prev/Next, windowed to stay compact.
   Reused by both the featured block and the full project list. */
function buildPager(pager, cur, pages, total, noun, onGo) {
  if (!pager) return;
  pager.innerHTML = "";
  if (pages <= 1) { pager.hidden = true; return; }
  pager.hidden = false;

  const btn = (label, target, opts = {}) => {
    const b = el("button", "page-btn" + (opts.current ? " is-current" : ""), label);
    b.type = "button";
    if (opts.disabled) b.disabled = true;
    if (opts.current) b.setAttribute("aria-current", "page");
    if (opts.label) b.setAttribute("aria-label", opts.label);
    if (!opts.disabled && !opts.current) b.addEventListener("click", () => onGo(target));
    return b;
  };

  pager.appendChild(btn("‹ Prev", cur - 1, { disabled: cur === 1, label: "Previous page" }));

  // windowed page numbers (max 5 around current)
  let from = Math.max(1, cur - 2);
  let to = Math.min(pages, from + 4);
  from = Math.max(1, to - 4);
  if (from > 1) {
    pager.appendChild(btn("1", 1, { current: cur === 1 }));
    if (from > 2) pager.appendChild(el("span", "page-gap", "…"));
  }
  for (let i = from; i <= to; i++) pager.appendChild(btn(String(i), i, { current: i === cur }));
  if (to < pages) {
    if (to < pages - 1) pager.appendChild(el("span", "page-gap", "…"));
    pager.appendChild(btn(String(pages), pages, { current: cur === pages }));
  }

  pager.appendChild(btn("Next ›", cur + 1, { disabled: cur === pages, label: "Next page" }));
  pager.appendChild(el("span", "page-count", `${total} ${noun}${total === 1 ? "" : "s"}`));
}

function renderPager() {
  buildPager(document.getElementById("projects-pager"), PROJ_STATE.page,
    totalProjectPages(), PROJ_STATE.filtered.length, "project", goToProjectPage);
}

/* Largest 4-digit year in a label ("2019–2023" -> 2023) for sorting. */
function repYear(label) {
  const nums = String(label).match(/\d{4}/g);
  return nums ? Math.max(...nums.map(Number)) : 0;
}

function renderCertifications() {
  const root = document.getElementById("cert-list");
  if (!root) return;
  root.innerHTML = "";

  // Group by the exact year label, then order groups newest-first.
  const groups = {};
  CERTIFICATIONS.forEach((c) => {
    (groups[c.year] = groups[c.year] || []).push(c);
  });
  const years = Object.keys(groups).sort((a, b) => repYear(b) - repYear(a));

  years.forEach((year) => {
    const group = el("div", "cert-year-group");
    group.appendChild(el("h3", "cert-year", year));
    const ol = el("ol", "pub-list");
    groups[year].forEach((c) => {
      const li = el("li");
      const links = projectLinks(c.links || {});
      const badge = c.inProgress ? ` <span class="badge badge--progress">In progress</span>` : "";
      li.innerHTML =
        `<div class="pub__title">${c.title}${badge}</div>` +
        `<div class="pub__meta"><em>${c.issuer}</em>` +
        (c.detail ? ` &middot; ${c.detail}` : "") +
        `</div>` +
        (links ? `<div class="pub__links">${links}</div>` : "");
      ol.appendChild(li);
    });
    group.appendChild(ol);
    root.appendChild(group);
  });
}

function renderTimeline(rootId, data) {
  const root = document.getElementById(rootId);
  if (!root) return;
  data.forEach((item) => {
    const li = el("li");
    li.appendChild(el("span", "timeline__date", item.date));
    li.appendChild(el("p", "timeline__role", item.role));
    li.appendChild(el("span", "timeline__org", item.org));
    if (item.points && item.points.length) {
      const ul = el("ul", "timeline__points");
      item.points.forEach((pt) => ul.appendChild(el("li", null, pt)));
      li.appendChild(ul);
    }
    root.appendChild(li);
  });
}

function renderSkills() {
  const root = document.getElementById("skills-grid");
  if (!root) return;
  SKILLS.forEach((g) => {
    const group = el("div", "skill-group");
    group.appendChild(el("h3", null, g.group));
    const ul = el("ul");
    g.items.forEach((s) => ul.appendChild(el("li", null, s)));
    group.appendChild(ul);
    root.appendChild(group);
  });
}

function renderHonors() {
  const root = document.getElementById("honors-list");
  if (!root) return;
  HONORS.forEach((h) => {
    root.appendChild(el("li", null, `<span class="year">${h.year}</span><span>${h.text}</span>`));
  });
}

/* ---------- Project tag filter ----------
   Builds chips from the union of all project tags. Clicking a chip filters
   PROJ_STATE and re-renders from page 1. Limited to the most common tags. */
function buildProjectFilter(projects) {
  const bar = document.getElementById("project-filter");
  if (!bar) return;
  bar.innerHTML = "";

  // Rank tags by frequency, keep the top ~12 so the bar doesn't overflow.
  const counts = {};
  projects.forEach((p) => (p.tags || []).forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
  const tags = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b)).slice(0, 12);
  if (!tags.length) { bar.remove(); return; }

  const makeChip = (label, value) => {
    const btn = el("button", "chip", label);
    btn.type = "button";
    btn.dataset.tag = value;
    btn.setAttribute("aria-pressed", value === "*" ? "true" : "false");
    return btn;
  };

  bar.appendChild(makeChip("All", "*"));
  tags.forEach((t) => bar.appendChild(makeChip(t, t)));

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    const active = btn.dataset.tag;

    bar.querySelectorAll(".chip").forEach((c) =>
      c.setAttribute("aria-pressed", String(c === btn))
    );

    PROJ_STATE.filtered = active === "*"
      ? PROJ_STATE.all
      : PROJ_STATE.all.filter((p) => (p.tags || []).includes(active));
    PROJ_STATE.page = 1;
    renderProjectPage();
  });
}

/* ---------- Skills proficiency radar (SVG) ----------
   Draws a polygon over a grid using each SKILLS group's `level`.
   The data polygon scales 0 -> full when scrolled into view. */
const SVGNS = "http://www.w3.org/2000/svg";
function svg(tag, attrs) {
  const node = document.createElementNS(SVGNS, tag);
  for (const k in attrs) node.setAttribute(k, attrs[k]);
  return node;
}

function renderRadar() {
  const root = document.getElementById("skills-radar");
  if (!root) return;
  const axes = SKILLS.filter((s) => typeof s.level === "number");
  if (axes.length < 3) { root.remove(); return; } // radar needs >= 3 axes

  const SIZE = 320, CX = SIZE / 2, CY = SIZE / 2, R = 110;
  const rings = [0.25, 0.5, 0.75, 1];
  const n = axes.length;
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const point = (i, r) => [CX + R * r * Math.cos(angle(i)), CY + R * r * Math.sin(angle(i))];

  const s = svg("svg", {
    viewBox: `0 0 ${SIZE} ${SIZE}`, class: "radar", role: "img",
    "aria-label": "Radar chart of skill proficiency by area",
  });

  // Concentric grid rings
  rings.forEach((rr) => {
    const pts = axes.map((_, i) => point(i, rr).join(",")).join(" ");
    s.appendChild(svg("polygon", { points: pts, class: "radar__ring" }));
  });

  // Axis spokes + labels
  axes.forEach((a, i) => {
    const [x, y] = point(i, 1);
    s.appendChild(svg("line", { x1: CX, y1: CY, x2: x, y2: y, class: "radar__spoke" }));
    const [lx, ly] = point(i, 1.16);
    const label = svg("text", {
      x: lx, y: ly, class: "radar__label",
      "text-anchor": lx < CX - 5 ? "end" : lx > CX + 5 ? "start" : "middle",
      "dominant-baseline": "middle",
    });
    label.textContent = a.group;
    s.appendChild(label);
  });

  // Data polygon (starts collapsed at center, animates outward)
  const dataPoly = svg("polygon", { class: "radar__data", points: axes.map(() => `${CX},${CY}`).join(" ") });
  const dots = axes.map(() => svg("circle", { r: 3.5, cx: CX, cy: CY, class: "radar__dot" }));
  s.appendChild(dataPoly);
  dots.forEach((d) => s.appendChild(d));
  root.appendChild(s);

  const targetPts = axes.map((a, i) => point(i, Math.max(0, Math.min(1, a.level / 100))));
  const apply = (scale) => {
    dataPoly.setAttribute("points", targetPts.map(([x, y]) => {
      return `${CX + (x - CX) * scale},${CY + (y - CY) * scale}`;
    }).join(" "));
    dots.forEach((d, i) => {
      d.setAttribute("cx", CX + (targetPts[i][0] - CX) * scale);
      d.setAttribute("cy", CY + (targetPts[i][1] - CY) * scale);
    });
  };

  onReveal(root, () => {
    if (REDUCED_MOTION) { apply(1); return; }
    const duration = 900;
    let start = null;
    function step(ts) {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      apply(1 - Math.pow(1 - t, 3));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

/* Fetch all public repos once and apply PROJECT_CONFIG filtering.
   Returns a sorted array (pinned first, then most recently pushed), or
   null if the API can't be reached. Shared by Projects + Open Source. */
async function fetchRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let repos = await res.json();
    if (!Array.isArray(repos)) throw new Error("Unexpected response");

    const cfg = PROJECT_CONFIG || {};
    const exclude = new Set((cfg.exclude || []).map((s) => s.toLowerCase()));
    repos = repos.filter((r) => {
      if (!cfg.includeForks && r.fork) return false;
      if (cfg.hideArchived && r.archived) return false;
      if (exclude.has(r.name.toLowerCase())) return false;
      return true;
    });

    return repos;   // ordering happens in buildSortedProjects (uses final tags)
  } catch (err) {
    return null;
  }
}

/* ---------- Open Source / GitHub summary panel ----------
   Totals + language breakdown bar built from the shared repo list.
   (The repos themselves are shown in the Projects section.) */
const GH_LANG_COLORS = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6", HTML: "#e34c26",
  CSS: "#563d7c", Java: "#b07219", Jupyter: "#DA5B0B", "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051", SQL: "#e38c00", R: "#198CE7", Go: "#00ADD8", Ruby: "#701516",
  PHP: "#4F5D95", "C++": "#f34b7d", C: "#555555",
};
function ghColor(lang) { return GH_LANG_COLORS[lang] || "#9aa0a6"; }

function renderGitHub(repos) {
  const root = document.getElementById("github-panel");
  if (!root) return;

  if (!repos || !repos.length) {
    root.innerHTML =
      `<p class="gh__status">Couldn't load live GitHub data right now. ` +
      `<a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">View on GitHub →</a></p>`;
    return;
  }

  const totalStars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
  const langCounts = {};
  repos.forEach((r) => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
  const langs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]);
  const langTotal = langs.reduce((a, [, c]) => a + c, 0) || 1;

  // ---- totals ----
  const stats = el("ul", "gh__stats");
  [
    [repos.length, "Public repos"],
    [totalStars, "Total stars"],
    [langs.length, "Languages"],
  ].forEach(([num, label]) => {
    stats.appendChild(el("li", null, `<span class="gh__num">${num}</span><span class="gh__label">${label}</span>`));
  });

  // ---- language bar ----
  const langWrap = el("div", "gh__langs");
  const bar = el("div", "gh__langbar");
  langs.slice(0, 8).forEach(([name, count]) => {
    const seg = el("span", "gh__langseg");
    seg.style.width = `${(count / langTotal) * 100}%`;
    seg.style.background = ghColor(name);
    seg.title = `${name} · ${count} repo${count > 1 ? "s" : ""}`;
    bar.appendChild(seg);
  });
  langWrap.appendChild(bar);
  const legend = el("ul", "gh__legend");
  langs.slice(0, 8).forEach(([name, count]) => {
    legend.appendChild(el("li", null,
      `<span class="gh__dot" style="background:${ghColor(name)}"></span>${name} <span class="gh__legend-count">${count}</span>`));
  });
  langWrap.appendChild(legend);

  const link = el("p", "gh__status",
    `<a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">View full profile on GitHub →</a>`);

  root.innerHTML = "";
  root.appendChild(stats);
  if (langs.length) root.appendChild(langWrap);
  root.appendChild(link);
}

/* ---------- Mobile nav toggle ---------- */
function setupNav() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  // Close menu after clicking a link (mobile)
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- Footer dates ---------- */
function setupFooter() {
  const now = new Date();
  const yearEl = document.getElementById("year");
  const updatedEl = document.getElementById("last-updated");
  if (yearEl) yearEl.textContent = String(now.getFullYear());
  if (updatedEl) {
    updatedEl.textContent = now.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  }
}

/* ---------- Projects + Open Source (live GitHub) ----------
   One fetch feeds both sections; falls back to FALLBACK_PROJECTS offline. */
async function initGitHubSections() {
  const repos = await fetchRepos();
  if (repos && repos.length) {
    const all = buildSortedProjects(repos);
    const featNames = (PROJECT_CONFIG && PROJECT_CONFIG.featured) || [];
    const featSet = new Set(featNames);
    // Featured in configured order (skip any that don't exist), rest paginated.
    const featured = featNames.map((n) => all.find((p) => p.name === n)).filter(Boolean);
    const rest = all.filter((p) => !featSet.has(p.name));
    renderFeatured(featured);
    renderProjects(rest);
    renderGitHub(repos);
  } else {
    renderFeatured(FALLBACK_PROJECTS);   // offline / rate-limited
    renderProjects([]);
    renderGitHub(null);
  }
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  initGitHubSections();
  renderCertifications();
  renderTimeline("experience-timeline", EXPERIENCE);
  renderTimeline("education-timeline", EDUCATION);
  renderSkills();
  renderRadar();
  renderHonors();
  setupNav();
  setupFooter();
});
