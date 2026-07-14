/* ============================================================
   site-nav.js — one unified, collapsible navigation drawer that
   is identical on every page. A three-dots (kebab) button opens a
   left sidebar with the full site navigation; it becomes a cross
   (x) to close. Links auto-resolve relative to where this script
   lives (the site root), so the same file works from any page depth.
   ============================================================ */
(function () {
  var me = document.currentScript;
  var BASE = me ? new URL('.', me.src).href : location.href.replace(/[^/]*$/, '');
  var THEME_KEY = 'sutirtha-theme';
  var LANG_KEY = 'sutirtha-lang';
  var themeButton = null;
  var langButton = null;
  var infoButton = null;
  var applyingLanguage = false;
  var langScanTimer = null;

  var LANGS = ['en', 'hi', 'bn'];
  var LANG_LABELS = {
    en: 'EN',
    hi: 'HI',
    bn: 'BN'
  };

  var TRANSLATIONS = {
    hi: {
      html: {
        'home-bio-1': 'नमस्ते! मैं भौतिकी का एक उत्साही मास्टर छात्र हूँ, जिसकी रुचि गुरुत्वाकर्षण और ब्रह्माण्ड विज्ञान, सैद्धांतिक खगोलभौतिकी और डार्क मैटर फिनोमेनोलॉजी में है। मेरी व्यापक प्रेरणा ब्रह्माण्ड की प्रकृति और इतिहास को सबसे छोटे से सबसे बड़े पैमानों तक समझना है।',
        'home-bio-2': 'मेरा वर्तमान शोध बैरियोनिक पदार्थ के डेटा-आधारित Bayesian inference से स्थानीय dark matter phase space बनाना, dark matter के प्रत्यक्ष और अप्रत्यक्ष detection, और उनके near-field cosmological implications पर केंद्रित है।',
        'home-bio-3': 'मेरी शैक्षणिक पृष्ठभूमि ने theoretical physics, data science और computational methods की गहरी समझ विकसित करने में मदद की है। मैंने observational cosmology, large-scale structure formation, galaxy evolution, radio astronomy और astrophysical data analysis से जुड़े विषयों पर काम किया है। बड़े datasets के अध्ययन के लिए मैं Bayesian statistical inference, machine learning और numerical methods का उपयोग करता हूँ। मेरी रुचि conformal field theory (CFT), AdS/CFT duality और perturbative string theory के पहलुओं में भी है।',
        'home-bio-4': 'मैं आपसी रुचि वाले प्रोजेक्ट्स पर शोधकर्ताओं और अकादमिक समूहों के साथ सहयोग के लिए खुला हूँ। संभावित problem statements पर चर्चा करने के लिए बेझिझक संपर्क करें।',
        'home-bio-5': 'अकादमिक कार्य के बाहर, कला और संगीत मेरे शौक हैं; मेरे पास fine arts में diploma है, मैं violin बजाता हूँ, और अभी flute सीख रहा हूँ।',
        'pub-note': '<span class="i">&#9432;</span>और सामग्री जल्द ही धीरे-धीरे दिखाई देगी।',
        'exp-0': '<strong>Supervisor:</strong> Prof. Allen Caldwell; <strong>Collaboration:</strong> DESY-CERN. MADMAX dielectric haloscope में signal extraction का अध्ययन, जहाँ लगभग 80 high-index disks और 10 T magnet axion-induced microwave signals को बहुत कमजोर power scale से ऊपर उठाते हैं। Background removal, Bayesian MCMC, और statistical tests से axion detectability को realistic conditions में quantify किया।',
        'exp-1': '<strong>Supervisor:</strong> Prof. Subha Majumdar. Gaia DR3, DESI, SDSS और LAMOST stellar kinematics तथा Milky Way rotation curves से local dark matter density को constrain किया। 6D phase-space data, spectro-photometry और astrometry के साथ mass models बनाए और MCMC methods से virial mass, concentration और anisotropy effects का अध्ययन किया।',
        'exp-2': '<strong>Supervisor:</strong> Dr. Sankarshana Srinivasan. Neutron-star magnetars और fast radio bursts के पास QCD axion तथा ALP dark-matter candidates के resonant axion-photon coupling का अध्ययन किया। Radio-band signals, matched filtering और model comparison को cosmological perturbation context से जोड़ा।',
        'exp-3': '<strong>Supervisor:</strong> Prof. Arpita Patra; <strong>Lab:</strong> CRIS Lab. Multi-Party Computation और Quantum Cryptography के intersection पर privacy-preserving machine learning के लिए actively secure four-party computation protocol पर काम किया। Qiskit के साथ quantum-circuit simulation और Quantum SVM workflow लागू किया।',
        'exp-4': 'IIT Madras BS Data Science and Applications academic track, जिसमें probability, statistics, programming, algorithms, databases, machine learning, deep learning, NLP, computer vision, responsible AI, projects और internship work शामिल हैं। यह Academic Journey view खोलता है।',
        'exp-5': 'Cosmological mega-survey science पर school/workshop में भागीदारी: large-scale structure, galaxy/redshift surveys, weak lensing, CMB context, statistical inference, survey systematics और next-generation data sets से cosmological parameters constrain करना।',
        'exp-6': 'Astronomical Society of India की 42nd Meeting में poster participation, Bengaluru में IISc, ISRO और Jawaharlal Nehru Planetarium द्वारा hosted meeting context में observational और theoretical astrophysics पर scientific discussions और poster sessions शामिल थे।',
        'exp-7': '<strong>Supervisor:</strong> Dr. David Edward Bruschi. Relativistic quantum information के तहत Bose-Einstein condensates में gravitational waves द्वारा phonon creation का अध्ययन। Cavity-type trapped phononic fields में dynamical Casimir effect models और particle-creation resonances पर आधारित gravitational-wave detection methods विकसित किए।',
        'exp-8': '<strong>Supervisor:</strong> Prof. Jasjeet Singh Bagla. Zodiacal light और Mars-origin dust contribution पर Python simulations के साथ dust-particle trajectories और time-dependent distributions का अध्ययन किया।',
        'exp-9': 'Hands-on observational astronomy और experimental physics training, जिसमें 3-m और 4-m telescopes का operation/calibration, 21 cm hydrogen-line observations, radio-astronomy hardware, cosmic-ray muon detection और Johnson-Nyquist noise experiments शामिल थे।'
      },
      text: {
        'Interplay of the baryonic and dark components of galaxies.': 'गैलेक्सियों के baryonic और dark components की परस्पर भूमिका।',
        'Build-up of the faint outer stellar halos of galaxies.': 'गैलेक्सियों के faint outer stellar halos का निर्माण।',
        'Kinematic structure and assembly history of galaxies.': 'गैलेक्सियों की kinematic structure और assembly history।',
        'Formation of groups and clusters in the early universe.': 'आरंभिक ब्रह्माण्ड में groups और clusters का निर्माण।',
        'Data, models and supplementary material.': 'Data, models और supplementary material।',
        'Physics of relativistic jets from compact objects.': 'Compact objects से निकलने वाले relativistic jets की physics।',
        'Galactic rotation curves as a probe of the dark matter distribution.': 'Dark matter distribution के probe के रूप में galactic rotation curves।',
        'Cosmology from large-scale galaxy surveys.': 'Large-scale galaxy surveys से cosmology।',
        'Axion dark-matter search with a magnetised disc (MADMAX).': 'Magnetised disc (MADMAX) के साथ axion dark-matter search।',
        'Joint-likelihood, data-driven inference of the local dark matter density.': 'Local dark matter density का joint-likelihood, data-driven inference।',
        'Surface density of the Milky Way from stellar kinematics.': 'Stellar kinematics से Milky Way की surface density।'
      }
    },
    bn: {
      html: {
        'home-bio-1': 'নমস্কার! আমি পদার্থবিদ্যার একজন উৎসাহী মাস্টার্স ছাত্র; আমার গবেষণার আগ্রহ মাধ্যাকর্ষণ ও মহাবিশ্বতত্ত্ব, তাত্ত্বিক জ্যোতির্বিজ্ঞান এবং dark matter phenomenology। ক্ষুদ্রতম থেকে বৃহত্তম স্কেল পর্যন্ত মহাবিশ্বের প্রকৃতি ও ইতিহাস বোঝাই আমার বৃহত্তর প্রেরণা।',
        'home-bio-2': 'আমার বর্তমান গবেষণা baryonic matter-এর data-driven Bayesian inference থেকে local dark matter phase space নির্মাণ, dark matter-এর direct ও indirect detection, এবং সংশ্লিষ্ট near-field cosmological implications নিয়ে।',
        'home-bio-3': 'আমার একাডেমিক পটভূমি theoretical physics, data science এবং computational methods সম্পর্কে গভীর বোঝাপড়া তৈরি করেছে। observational cosmology, large-scale structure formation, galaxy evolution, radio astronomy এবং astrophysical data analysis-সম্পর্কিত নানা সমস্যায় কাজ করেছি। বড় datasets বিশ্লেষণে আমি Bayesian statistical inference, machine learning এবং numerical methods ব্যবহার করি। conformal field theory (CFT), AdS/CFT duality এবং perturbative string theory-র দিকগুলোতেও আমার আগ্রহ আছে।',
        'home-bio-4': 'পারস্পরিক আগ্রহের প্রকল্পে গবেষক ও একাডেমিক গোষ্ঠীর সঙ্গে সহযোগিতার জন্য আমি উন্মুক্ত। সম্ভাব্য problem statements নিয়ে আলোচনা করতে নির্দ্বিধায় যোগাযোগ করুন।',
        'home-bio-5': 'একাডেমিক কাজের বাইরে শিল্প ও সঙ্গীত আমার শখ; fine arts-এ আমার diploma আছে, আমি violin বাজাই এবং বর্তমানে flute শিখছি।',
        'pub-note': '<span class="i">&#9432;</span>আরও কনটেন্ট শিগগিরই ধীরে ধীরে দেখা যাবে।',
        'exp-0': '<strong>Supervisor:</strong> Prof. Allen Caldwell; <strong>Collaboration:</strong> DESY-CERN. MADMAX dielectric haloscope-এ signal extraction নিয়ে কাজ, যেখানে প্রায় 80 high-index disks এবং 10 T magnet অত্যন্ত দুর্বল axion-induced microwave signal বাড়িয়ে তোলে। Background removal, Bayesian MCMC এবং statistical tests দিয়ে realistic conditions-এ axion detectability পরিমাপ করা হয়েছে।',
        'exp-1': '<strong>Supervisor:</strong> Prof. Subha Majumdar. Gaia DR3, DESI, SDSS এবং LAMOST stellar kinematics ও Milky Way rotation curves থেকে local dark matter density constrain করা হয়েছে। 6D phase-space data, spectro-photometry এবং astrometry দিয়ে mass models তৈরি করে MCMC পদ্ধতিতে virial mass, concentration ও anisotropy effects বিশ্লেষণ করা হয়েছে।',
        'exp-2': '<strong>Supervisor:</strong> Dr. Sankarshana Srinivasan. Neutron-star magnetars এবং fast radio bursts-এর কাছে QCD axion ও ALP dark-matter candidates-এর resonant axion-photon coupling নিয়ে কাজ। Radio-band signals, matched filtering এবং model comparison-কে cosmological perturbation context-এর সঙ্গে যুক্ত করা হয়েছে।',
        'exp-3': '<strong>Supervisor:</strong> Prof. Arpita Patra; <strong>Lab:</strong> CRIS Lab. Multi-Party Computation এবং Quantum Cryptography-র সংযোগস্থলে privacy-preserving machine learning-এর জন্য actively secure four-party computation protocol নিয়ে কাজ। Qiskit দিয়ে quantum-circuit simulation এবং Quantum SVM workflow বাস্তবায়ন করা হয়েছে।',
        'exp-4': 'IIT Madras BS Data Science and Applications academic track, যেখানে probability, statistics, programming, algorithms, databases, machine learning, deep learning, NLP, computer vision, responsible AI, projects এবং internship work অন্তর্ভুক্ত। এটি Academic Journey view খুলে দেয়।',
        'exp-5': 'Cosmological mega-survey science বিষয়ক school/workshop-এ অংশগ্রহণ: large-scale structure, galaxy/redshift surveys, weak lensing, CMB context, statistical inference, survey systematics এবং next-generation data sets দিয়ে cosmological parameters constrain করা।',
        'exp-6': 'Astronomical Society of India-র 42nd Meeting-এ poster participation; Bengaluru-তে IISc, ISRO এবং Jawaharlal Nehru Planetarium আয়োজিত meeting context-এ observational ও theoretical astrophysics নিয়ে poster sessions এবং scientific discussions ছিল।',
        'exp-7': '<strong>Supervisor:</strong> Dr. David Edward Bruschi. Relativistic quantum information framework-এ Bose-Einstein condensates-এ gravitational waves দ্বারা phonon creation নিয়ে গবেষণা। Cavity-type trapped phononic fields-এ dynamical Casimir effect models এবং particle-creation resonances-ভিত্তিক gravitational-wave detection methods তৈরি করা হয়েছে।',
        'exp-8': '<strong>Supervisor:</strong> Prof. Jasjeet Singh Bagla. Zodiacal light এবং Mars-origin dust contribution নিয়ে Python simulations-এর মাধ্যমে dust-particle trajectories ও time-dependent distributions বিশ্লেষণ করা হয়েছে।',
        'exp-9': 'Hands-on observational astronomy ও experimental physics training: 3-m ও 4-m telescopes operation/calibration, 21 cm hydrogen-line observations, radio-astronomy hardware, cosmic-ray muon detection এবং Johnson-Nyquist noise experiments।'
      },
      text: {
        'Interplay of the baryonic and dark components of galaxies.': 'গ্যালাক্সির baryonic ও dark components-এর পারস্পরিক ভূমিকা।',
        'Build-up of the faint outer stellar halos of galaxies.': 'গ্যালাক্সির faint outer stellar halos কীভাবে তৈরি হয়।',
        'Kinematic structure and assembly history of galaxies.': 'গ্যালাক্সির kinematic structure ও assembly history।',
        'Formation of groups and clusters in the early universe.': 'প্রারম্ভিক মহাবিশ্বে groups ও clusters গঠন।',
        'Data, models and supplementary material.': 'Data, models এবং supplementary material।',
        'Physics of relativistic jets from compact objects.': 'Compact objects থেকে relativistic jets-এর physics।',
        'Galactic rotation curves as a probe of the dark matter distribution.': 'Dark matter distribution বোঝার probe হিসেবে galactic rotation curves।',
        'Cosmology from large-scale galaxy surveys.': 'Large-scale galaxy surveys থেকে cosmology।',
        'Axion dark-matter search with a magnetised disc (MADMAX).': 'Magnetised disc (MADMAX) দিয়ে axion dark-matter search।',
        'Joint-likelihood, data-driven inference of the local dark matter density.': 'Local dark matter density-র joint-likelihood, data-driven inference।',
        'Surface density of the Milky Way from stellar kinematics.': 'Stellar kinematics থেকে Milky Way-এর surface density।'
      }
    }
  };
  var EXPERIENCE_KEYS = ['exp-0', 'exp-1', 'exp-2', 'exp-3', 'exp-4', 'exp-5', 'exp-6', 'exp-7', 'exp-8', 'exp-9'];

  var NAV = [
    { label: 'Home', href: 'index.html' },
    { label: 'Research', href: 'research.html', children: [
      ['Overview', 'research.html'],
      ['Baryons & Dark Matter', 'research/research_consp.html'],
      ['Outer Stellar Halos', 'research/research_outer.html'],
      ['Galaxy Kinematics', 'research/research_kinematics.html'],
      ['High Redshift', 'research/research_proto.html'],
      ['Relativistic Jets', 'research/research_jets.html'],
      ['Galactic Rotation Curve as a Dark Matter Probe', 'research/research_rotcurve.html'],
      ['Large-Scale Cosmological Survey', 'research/research_survey.html'],
      ['Magnetised Disc Axion Search Experiment', 'research/research_axion.html'],
      ['Joint Likelihood & Local Dark Matter Density', 'research/research_jointlike.html'],
      ['Surface Density of the Milky Way', 'research/research_surfdens.html']
    ]},
    { label: 'Publication/preprint', href: 'publications.html' },
    { label: 'Galaxy Comics', href: 'comics.html', children: [
      ['Overview', 'comics.html'],
      ['Ram-Pressure Stripping', 'comics/comic_rampressure.html'],
      ['Compact Groups', 'comics/comic_compact.html'],
      ['Fossil Groups', 'comics/comic_fossil.html'],
      ['Dwarf Galaxy Harassment', 'comics/comic_harassment.html'],
      ['Multiple Minor Merger', 'comics/comic_multi_minor.html'],
      ['Galaxy Major Merger', 'comics/comic_majormerger.html']
    ]},
    { label: 'Academics', href: 'teaching.html', children: [
      ['Overview', 'teaching.html'],
      ['Gravitational Dynamics', 'teaching/grav_dyn.html'],
      ['Fluid Dynamics', 'teaching/fluid_dyn.html'],
      ['Numerical Cosmology', 'teaching/num_cos.html'],
      ['Notes of Theoretical Physics', 'teaching/lecture_canary.html'],
      ['Movies', 'teaching/movies/index.html']
    ]},
    { label: 'About Me', href: 'vita.html' },
    { label: "What's New", href: 'whatsnew.html' },
    { label: 'Arts', href: 'arts.html' },
    { label: 'Philosophy', href: 'philosophy.html' },
    { label: 'Downloads', href: 'research/research_download.html' }
  ];

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function abs(h) { return BASE + h; }
  function normalizedPath(url) {
    var path = new URL(url, location.href).pathname;
    path = path.replace(/\/+$/, '/');
    path = path.replace(/\/index\.html$/, '/');
    return path;
  }
  function itemIsActive(item) {
    var current = normalizedPath(location.href);
    if (current === normalizedPath(abs(item.href))) return true;
    if (item.children) {
      return item.children.some(function (child) {
        return current === normalizedPath(abs(child[1]));
      });
    }
    return false;
  }
  function buildHeaderNavItem(item) {
    var active = itemIsActive(item);
    if (item.children) {
      var dd = el('div', 'dropdown');
      var a = el('a', 'dropbtn' + (active ? ' active' : ''));
      a.href = abs(item.href);
      if (active) a.setAttribute('aria-current', 'page');
      a.appendChild(document.createTextNode(item.label));
      var caret = el('span', 'caret');
      caret.innerHTML = '&#9662;';
      a.appendChild(caret);
      dd.appendChild(a);
      var menu = el('div', 'dropdown-content');
      item.children.forEach(function (child) {
        var childActive = normalizedPath(location.href) === normalizedPath(abs(child[1]));
        var ca = el('a', childActive ? 'active' : '', child[0]);
        ca.href = abs(child[1]);
        if (childActive) ca.setAttribute('aria-current', 'page');
        menu.appendChild(ca);
      });
      dd.appendChild(menu);
      return dd;
    }
    var link = el('a', active ? 'active' : '', item.label);
    link.href = abs(item.href);
    if (active) link.setAttribute('aria-current', 'page');
    return link;
  }
  function normalizeTopNav() {
    Array.prototype.forEach.call(document.querySelectorAll('.topnav'), function (nav) {
      nav.innerHTML = '';
      NAV.forEach(function (item) {
        nav.appendChild(buildHeaderNavItem(item));
      });
    });
  }
  function readTheme() {
    try {
      return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
    } catch (e) {
      return 'dark';
    }
  }
  function writeTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // Ignore private-mode storage failures; the button still works for this page.
    }
  }
  function syncThemeButton(theme) {
    if (!themeButton) return;
    themeButton.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    themeButton.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    themeButton.dataset.mode = theme;
  }
  function readLanguage() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      return LANGS.indexOf(stored) >= 0 ? stored : 'en';
    } catch (e) {
      return 'en';
    }
  }
  function writeLanguage(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      // Translation still applies on this page when storage is unavailable.
    }
  }
  function syncLanguageButton(lang) {
    if (!langButton) return;
    var next = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
    langButton.textContent = LANG_LABELS[lang] || 'EN';
    langButton.dataset.lang = lang;
    langButton.setAttribute('aria-label', 'Language: ' + (LANG_LABELS[lang] || 'EN') + '. Switch to ' + (LANG_LABELS[next] || 'EN') + '.');
    langButton.setAttribute('title', 'Language: EN / HI / BN');
  }
  function rememberOriginalHtml(node) {
    if (!node.hasAttribute('data-lang-original-html')) {
      node.setAttribute('data-lang-original-html', node.innerHTML);
    }
  }
  function rememberOriginalText(node) {
    if (!node.hasAttribute('data-lang-original-text')) {
      node.setAttribute('data-lang-original-text', node.textContent.trim());
    }
  }
  function applyHtmlTranslation(node, key, lang) {
    rememberOriginalHtml(node);
    var nextHtml = node.getAttribute('data-lang-original-html');
    if (lang === 'en') {
      if (node.innerHTML !== nextHtml) node.innerHTML = nextHtml;
      return;
    }
    var html = TRANSLATIONS[lang] && TRANSLATIONS[lang].html[key];
    if (html) {
      nextHtml = html;
      if (node.innerHTML !== nextHtml) node.innerHTML = nextHtml;
    }
  }
  function applyTextTranslation(node, lang) {
    rememberOriginalText(node);
    var original = node.getAttribute('data-lang-original-text');
    if (lang === 'en') {
      if (node.textContent !== original) node.textContent = original;
      return;
    }
    var text = TRANSLATIONS[lang] && TRANSLATIONS[lang].text[original];
    if (text && node.textContent !== text) node.textContent = text;
  }
  function applyLanguage(lang) {
    applyingLanguage = true;
    document.documentElement.setAttribute('lang', lang === 'bn' ? 'bn' : (lang === 'hi' ? 'hi' : 'en'));
    Array.prototype.forEach.call(document.querySelectorAll('[data-ed]'), function (node) {
      applyHtmlTranslation(node, node.getAttribute('data-ed'), lang);
    });
    var note = document.querySelector('.pub-note');
    if (note) applyHtmlTranslation(note, 'pub-note', lang);
    Array.prototype.forEach.call(document.querySelectorAll('.kp-blurb'), function (node) {
      applyTextTranslation(node, lang);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.timeline .description'), function (node, index) {
      if (EXPERIENCE_KEYS[index]) applyHtmlTranslation(node, EXPERIENCE_KEYS[index], lang);
    });
    syncLanguageButton(lang);
    applyingLanguage = false;
  }
  function scheduleLanguageApply() {
    if (applyingLanguage) return;
    window.clearTimeout(langScanTimer);
    langScanTimer = window.setTimeout(function () { applyLanguage(readLanguage()); }, 80);
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (document.body) document.body.classList.toggle('light-mode', theme === 'light');
    syncThemeButton(theme);
  }
  applyTheme(readTheme());

  function initScrollTopControls() {
    if (document.querySelector('.scroll-top-page')) return;

    var upIcon = '<svg class="scroll-top-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M13 33L32 14l19 19"></path><path d="M13 50l19-19 19 19"></path></svg>';
    var pageBtn = el('button', 'scroll-top-page');
    pageBtn.type = 'button';
    pageBtn.setAttribute('aria-label', 'Scroll page to top');
    pageBtn.innerHTML = upIcon;
    document.body.appendChild(pageBtn);

    function updatePageButton() {
      pageBtn.classList.toggle('is-visible', window.scrollY > 260);
    }
    pageBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', updatePageButton, { passive: true });
    updatePageButton();

    function hasVerticalScroll(node) {
      if (!node || node === document.body || node === document.documentElement) return false;
      var style = window.getComputedStyle(node);
      if (style.overflowY !== 'auto' && style.overflowY !== 'scroll') return false;
      return node.scrollHeight > node.clientHeight + 16 && node.clientHeight > 60;
    }

    function placePanelButton(scroller, button) {
      var rect = scroller.getBoundingClientRect();
      var visible = scroller.scrollTop > 22 && rect.bottom > 0 && rect.top < window.innerHeight && hasVerticalScroll(scroller);
      var left = Math.min(window.innerWidth - 42, Math.max(8, rect.right - 34));
      var top = Math.min(window.innerHeight - 42, Math.max(8, rect.bottom - 34));
      button.style.left = left + 'px';
      button.style.top = top + 'px';
      button.classList.toggle('is-visible', visible);
    }

    function attachPanelButton(scroller) {
      if (!hasVerticalScroll(scroller) || scroller.__sutirthaScrollTopButton) return;
      var button = el('button', 'scroll-top-panel');
      button.type = 'button';
      button.setAttribute('aria-label', 'Scroll this section to top');
      button.innerHTML = upIcon;
      document.body.appendChild(button);
      scroller.__sutirthaScrollTopButton = button;

      function update() { placePanelButton(scroller, button); }
      scroller.addEventListener('scroll', update, { passive: true });
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      button.addEventListener('click', function () {
        scroller.scrollTo({ top: 0, behavior: 'smooth' });
      });
      update();
    }

    function scanScrollers() {
      var candidates = document.querySelectorAll(
        '#kp-list, #pub-list, .timeline, #github-repos-container, .snav-drawer, [data-scroll-top]'
      );
      Array.prototype.forEach.call(candidates, attachPanelButton);
      Array.prototype.forEach.call(document.querySelectorAll('.scroll-top-panel'), function (button) {
        button.classList.remove('is-visible');
      });
      Array.prototype.forEach.call(candidates, function (node) {
        if (node.__sutirthaScrollTopButton) placePanelButton(node, node.__sutirthaScrollTopButton);
      });
    }

    var scanTimer = null;
    function scheduleScan() {
      window.clearTimeout(scanTimer);
      scanTimer = window.setTimeout(scanScrollers, 120);
    }
    scanScrollers();
    window.setTimeout(scanScrollers, 700);
    window.setTimeout(scanScrollers, 1800);
    if ('MutationObserver' in window) {
      new MutationObserver(scheduleScan).observe(document.body, { childList: true, subtree: true });
    }
  }

  /* ============================================================
     Visitor analytics — GoatCounter (privacy-first, no cookies).
     Real dashboard at https://GC_CODE.goatcounter.com shows visits,
     unique visitors, countries, referrers, pages and browsers — i.e.
     you can actually SEE who is visiting, and exclude your own visits.

     ONE-TIME SETUP (≈1 min): sign up free at
       https://www.goatcounter.com/signup
     and register the code below as your subdomain. If that code is
     taken, pick another and change GC_CODE here — nothing else changes.

     EXCLUDE YOURSELF: open any page once with ?skipgc appended
       (e.g.  https://…github.io/index.html?skipgc )
     and this browser/device stops being counted. Use ?countgc to undo.
     ============================================================ */
  var GC_CODE = 'sutirthamukherjee'; // <-- your goatcounter.com code/subdomain

  function setupAnalytics() {
    try {
      var qs = location.search + location.hash;
      if (/[?#&]skipgc\b/.test(qs)) localStorage.setItem('skipgc', 't');
      if (/[?#&]countgc\b/.test(qs)) localStorage.removeItem('skipgc');
    } catch (e) {}

    if (!GC_CODE || document.getElementById('goatcounter-js')) return;
    var s = document.createElement('script');
    s.id = 'goatcounter-js';
    s.async = true;
    s.src = '//gc.zgo.at/count.js';
    // count.js natively skips when localStorage['skipgc']==='t' (self-exclusion).
    s.setAttribute('data-goatcounter', 'https://' + GC_CODE + '.goatcounter.com/count');
    document.body.appendChild(s);
  }

  function addVisitorCounter() {
    if (document.querySelector('.visitor-counter')) return;
    var target = document.getElementById('bottom') || document.querySelector('footer') || document.body;
    if (!target || !GC_CODE) return;

    var wrap = el('div', 'visitor-counter');
    var link = el('a');
    link.href = 'https://' + GC_CODE + '.goatcounter.com';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Visitor statistics');

    var img = document.createElement('img');
    // Authentic site-wide count, served straight from your GoatCounter data.
    img.src = 'https://' + GC_CODE + '.goatcounter.com/counter/TOTAL.svg?no_branding=1';
    img.alt = 'Visitor count';
    img.loading = 'lazy';
    img.decoding = 'async';
    // Until the code is registered (or if the counter is private) hide quietly.
    img.onerror = function () { wrap.style.display = 'none'; };

    link.appendChild(img);
    wrap.appendChild(link);
    target.appendChild(wrap);
  }

  function setupContentProtection() {
    if (/(^|#)edit\b/i.test(location.hash || '')) return;

    if (!document.getElementById('content-protection-css')) {
      var style = document.createElement('style');
      style.id = 'content-protection-css';
      style.textContent =
        'html.content-protected,html.content-protected body,' +
        'html.content-protected body *:not(input):not(textarea):not(select){' +
        '-webkit-user-select:none!important;user-select:none!important;}' +
        'html.content-protected img{-webkit-user-drag:none!important;user-drag:none!important;}' +
        '@media print{html.content-protected body{display:none!important;}}';
      document.head.appendChild(style);
    }

    document.documentElement.classList.add('content-protected');

    function isEditableTarget(target) {
      if (!target || target === document) return false;
      return !!(target.closest && target.closest('input,textarea,select,[contenteditable="true"]'));
    }

    function blockIfNeeded(event) {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
    }

    ['copy', 'cut', 'contextmenu', 'dragstart', 'selectstart'].forEach(function (name) {
      document.addEventListener(name, blockIfNeeded, true);
    });

    document.addEventListener('keydown', function (event) {
      if (isEditableTarget(event.target)) return;
      var key = String(event.key || '').toLowerCase();
      if ((event.ctrlKey || event.metaKey) && /^(a|c|x|p|s|u)$/.test(key)) {
        event.preventDefault();
      }
      if (key === 'printscreen') {
        event.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(function () {});
        }
      }
    }, true);

    function markImages() {
      Array.prototype.forEach.call(document.images || [], function (img) {
        img.setAttribute('draggable', 'false');
      });
    }
    markImages();
    if ('MutationObserver' in window) {
      new MutationObserver(markImages).observe(document.body, { childList: true, subtree: true });
    }
  }

  function init() {
    normalizeTopNav();
    if (document.querySelector('.snav-toggle')) return; // never double-inject

    var btn = el('button', 'snav-toggle');
    btn.setAttribute('aria-label', 'Open navigation');
    btn.innerHTML = '<span class="snav-ic-dots">&#8942;</span><span class="snav-ic-x">&times;</span>';

    var ov = el('div', 'snav-overlay');

    var dr = el('nav', 'snav-drawer');
    dr.setAttribute('aria-label', 'Site navigation');
    var head = el('div', 'snav-head');
    head.appendChild(el('span', 'snav-title', 'Navigation'));
    var close = el('button', 'snav-close');
    close.setAttribute('aria-label', 'Close navigation');
    close.innerHTML = '&times;';
    head.appendChild(close);
    dr.appendChild(head);

    var list = el('ul', 'snav-list');
    NAV.forEach(function (item) {
      var li = el('li');
      if (item.children) {
        var row = el('div', 'snav-row');
        var a = el('a', 'snav-link', item.label); a.href = abs(item.href);
        var tg = el('button', 'snav-sub-toggle'); tg.innerHTML = '&#9662;';
        tg.setAttribute('aria-label', 'Expand ' + item.label);
        row.appendChild(a); row.appendChild(tg); li.appendChild(row);
        var sub = el('ul', 'snav-sub');
        item.children.forEach(function (c) {
          var s = el('li');
          var sa = el('a', 'snav-sublink', c[0]); sa.href = abs(c[1]);
          s.appendChild(sa); sub.appendChild(s);
        });
        li.appendChild(sub);
        tg.addEventListener('click', function (e) { e.preventDefault(); li.classList.toggle('open'); });
      } else {
        var a2 = el('a', 'snav-link', item.label); a2.href = abs(item.href);
        li.appendChild(a2);
      }
      list.appendChild(li);
    });
    dr.appendChild(list);

    document.body.appendChild(btn);
    document.body.appendChild(ov);
    document.body.appendChild(dr);

    themeButton = el('button', 'theme-toggle');
    themeButton.type = 'button';
    themeButton.innerHTML =
      '<svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.9 15.1A8.6 8.6 0 0 1 8.9 3.1a7.1 7.1 0 1 0 12 12z"></path></svg>';
    document.body.appendChild(themeButton);
    syncThemeButton(readTheme());
    themeButton.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      writeTheme(next);
      applyTheme(next);
    });

    langButton = el('button', 'language-toggle');
    langButton.type = 'button';
    document.body.appendChild(langButton);
    syncLanguageButton(readLanguage());
    langButton.addEventListener('click', function () {
      var current = readLanguage();
      var next = LANGS[(LANGS.indexOf(current) + 1) % LANGS.length];
      writeLanguage(next);
      applyLanguage(next);
    });

    infoButton = el('button', 'site-info-toggle');
    infoButton.type = 'button';
    infoButton.setAttribute('aria-label', 'Website note');
    infoButton.setAttribute('aria-expanded', 'false');
    infoButton.innerHTML =
      '<span aria-hidden="true">i</span>' +
      '<span class="site-info-popover" role="note">This website is designed and maintained by Sutirtha Mukherjee. Currently under construction. &copy; 2026 Sutirtha Mukherjee. All rights reserved.</span>';
    document.body.appendChild(infoButton);
    infoButton.addEventListener('click', function () {
      var openInfo = !infoButton.classList.contains('is-open');
      infoButton.classList.toggle('is-open', openInfo);
      infoButton.setAttribute('aria-expanded', openInfo ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!infoButton || infoButton.contains(e.target)) return;
      infoButton.classList.remove('is-open');
      infoButton.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !infoButton) return;
      infoButton.classList.remove('is-open');
      infoButton.setAttribute('aria-expanded', 'false');
    });

    applyLanguage(readLanguage());
    if ('MutationObserver' in window) {
      new MutationObserver(scheduleLanguageApply).observe(document.body, { childList: true, subtree: true });
    }
    initScrollTopControls();
    setupAnalytics();
    addVisitorCounter();
    setupContentProtection();

    function open() { document.body.classList.add('snav-open'); btn.classList.add('is-open'); btn.setAttribute('aria-label', 'Close navigation'); }
    function shut() { document.body.classList.remove('snav-open'); btn.classList.remove('is-open'); btn.setAttribute('aria-label', 'Open navigation'); }
    btn.addEventListener('click', function () { document.body.classList.contains('snav-open') ? shut() : open(); });
    close.addEventListener('click', shut);
    ov.addEventListener('click', shut);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
