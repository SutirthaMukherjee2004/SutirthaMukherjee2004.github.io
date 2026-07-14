/* ============================================================
   research-data.js  —  single source of truth for BOTH the
   Research section AND the "Key Projects" panel on the home page.

   Per topic:
     id, title, page (relative to /research/),
     thumb   : single card image (optional),
     blurb   : one-line description (shown on the Key Projects list),
     category: one of 'Mini-Projects' | 'Major-Projects' | 'Thesis'
               (drives the home-page project filter — edit freely),
     summary : long writing for the detail page (optional),
     plots   : [{src, caption}] (optional).
   ============================================================ */
(function () {
  var me = document.currentScript;
  window.RESEARCH = {
    base: me ? new URL('.', me.src).href : '',
    topics: [
      { id: 'rotation-curve', title: 'Galactic Rotation Curve as a Dark Matter Probe',
        page: 'research_rotcurve.html',
        blurb: 'Galactic rotation curves as a probe of the dark matter distribution.',
        category: 'Major-Projects', summary: '', plots: [] },
      { id: 'cosmo-survey', title: 'Large-Scale Cosmological Survey',
        page: 'research_survey.html',
        blurb: 'Cosmology from large-scale galaxy surveys.',
        category: 'Major-Projects', summary: '', plots: [] },
      { id: 'madmax-axion', title: 'Magnetised Disc Axion Search Experiment',
        page: 'research_axion.html',
        blurb: 'Axion dark-matter search with a magnetised disc (MADMAX).',
        category: 'Mini-Projects', summary: '', plots: [] },
      { id: 'joint-likelihood', title: 'Joint Likelihood & Tight Constraints on the Local Dark Matter Density',
        page: 'research_jointlike.html',
        blurb: 'Joint-likelihood, data-driven inference of the local dark matter density.',
        category: 'Thesis', summary: '', plots: [] },
      { id: 'surface-density', title: 'Surface Density of the Milky Way',
        page: 'research_surfdens.html',
        blurb: 'Surface density of the Milky Way from stellar kinematics.',
        category: 'Major-Projects', summary: '', plots: [] },
      { id: 'baryons-dm', title: 'Baryons & Dark Matter',
        page: 'research_consp.html', thumb: 'gamma_fdm.png',
        blurb: 'Interplay of the baryonic and dark components of galaxies.',
        category: 'Major-Projects', summary: '', plots: [] },
      { id: 'outer-halos', title: 'Outer Stellar Halos',
        page: 'research_outer.html', thumb: '1on5020top.png',
        blurb: 'Build-up of the faint outer stellar halos of galaxies.',
        category: 'Major-Projects', summary: '', plots: [] },
      { id: 'galaxy-kinematics', title: 'Galaxy Kinematics',
        page: 'research_kinematics.html', thumb: 'kdc_map.png',
        blurb: 'Kinematic structure and assembly history of galaxies.',
        category: 'Mini-Projects', summary: '', plots: [] },
      { id: 'high-redshift', title: 'High Redshift',
        page: 'research_proto.html', thumb: 'rotcurve_webpage.png',
        blurb: 'Formation of groups and clusters in the early universe.',
        category: 'Mini-Projects', summary: '', plots: [] },
      { id: 'relativistic-jets', title: 'Relativistic Jets',
        page: 'research_jets.html',
        blurb: 'Physics of relativistic jets from compact objects.',
        category: 'Mini-Projects', summary: '', plots: [] },
      { id: 'downloads', title: 'Downloads',
        page: 'research_download.html', thumb: 'mock_z_lensing.png',
        blurb: 'Data, models and supplementary material.',
        category: 'Mini-Projects', summary: '', plots: [] }
    ]
  };

  var paperDetails = {
    "madmax-axion": {
      blurb: "MADMAX signal-processing diagnostics for axion-search false-positive and false-negative tests.",
      thumb: "paper-figures-web/madmax-paper-fig1-kernels-frequency.webp",
      summary: "<p>This project studies signal extraction and false-positive / false-negative behaviour in MADMAX-style dielectric-haloscope spectra. The gallery collects kernel-frequency diagnostics, per-step p-value behaviour, and four MADMAX run panels used to compare analysis choices.</p>",
      plots: [
        { src: "paper-figures-web/madmax-paper-fig1-kernels-frequency.webp", full: "paper-figures-full/madmax-paper-fig1-kernels-frequency.png", caption: "" },
        { src: "paper-figures-web/madmax-bn06-qiid-pvalues.webp", full: "paper-figures-full/madmax-bn06-qiid-pvalues.png", caption: "" },
        { src: "paper-figures-web/madmax-1.webp", full: "paper-figures-full/madmax-1.png", caption: "" },
        { src: "paper-figures-web/madmax-2.webp", full: "paper-figures-full/madmax-2.png", caption: "" },
        { src: "paper-figures-web/madmax-3.webp", full: "paper-figures-full/madmax-3.png", caption: "" },
        { src: "paper-figures-web/madmax-4.webp", full: "paper-figures-full/madmax-4.png", caption: "" },
      ]
    },
    "cosmo-survey": {
      blurb: "Unified Milky Way phase-space catalogue from Gaia DR3 and large spectroscopic surveys.",
      thumb: "paper-figures-web/data-fig1-sky-grid.webp",
      summary: "<p>This project builds a unified catalogue of accurate distances, radial velocities, and 6D phase-space information for Milky Way disc and halo tracers from the solar neighbourhood to roughly 250 kpc.</p><p>The draft combines Gaia DR3 astrometry with DESI, SDSS/BOSS, LAMOST, APOGEE, GALAH, RAVE, specialised variable-star catalogues, globular-cluster and dwarf-galaxy members, and Sagittarius-stream tracers. The catalogue contains about 4.56 million quality-assured sources, including more than 5e5 halo stars selected by Galactocentric position.</p><p>The analysis focuses on cross-matching, duplicate handling, survey-to-survey calibration, error normalisation, membership validation, and purity/completeness diagnostics. The main motivation is to move beyond the Gaia parallax limit and provide a robust outer-halo fossil record for Galactic dynamics and dark-matter mass modelling.</p>",
      plots: [
        { src: "paper-figures-web/data-fig1-sky-grid.webp", caption: "" },
        { src: "paper-figures-web/data-fig2-extinction.webp", caption: "" },
        { src: "paper-figures-web/data-fig3-hr-diagram.webp", caption: "" },
        { src: "paper-figures-web/data-fig4-keil.webp", caption: "" },
        { src: "paper-figures-web/data-relative-distance-error-plot.webp", caption: "" },
        { src: "paper-figures-web/data-relative-distance-error-plot1.webp", caption: "" },
        { src: "paper-figures-web/data-distance-comparison-panels.webp", caption: "" },
        { src: "paper-figures-web/data-master-plot-with-inset-no-zeros.webp", caption: "" },
        { src: "paper-figures-web/data-combined-gmag-distribution.webp", caption: "" },
        { src: "paper-figures-web/data-combined-feh-distribution.webp", caption: "" },
        { src: "paper-figures-web/data-fig-5a-with-inset.webp", caption: "" },
        { src: "paper-figures-web/data-fig5b-plot.webp", caption: "" },
        { src: "paper-figures-web/data-fig6-error-analysis.webp", caption: "" },
        { src: "paper-figures-web/data-homo-fig6-dup-normdiff.webp", caption: "" },
        { src: "paper-figures-web/data-homo-fig7-drv-zp.webp", caption: "" },
        { src: "paper-figures-web/data-homo-fig8-drv-params.webp", caption: "" },
        { src: "paper-figures-web/data-gc-ngc-6205-m-13.webp", caption: "" },
        { src: "paper-figures-web/data-gc-ngc-5904-m-5.webp", caption: "" },
        { src: "paper-figures-web/data-gc-ngc-5139-ocen.webp", caption: "" },
        { src: "paper-figures-web/data-dw-draco.webp", caption: "" },
        { src: "paper-figures-web/data-summary-dist-1.webp", caption: "" },
        { src: "paper-figures-web/data-summary-rv-1.webp", caption: "" },
        { src: "paper-figures-web/data-plot1-mixture-comparison.webp", caption: "" },
        { src: "paper-figures-web/data-plot2-purity-curves-and-distributions.webp", caption: "" },
        { src: "paper-figures-web/data-plot3-radial-dist.webp", caption: "" },
        { src: "paper-figures-web/data-plot3-radial-rv.webp", caption: "" },
        { src: "paper-figures-web/data-plot3-radial-ruwe.webp", caption: "" },
        { src: "paper-figures-web/data-plot4-core-fraction-eta.webp", caption: "" },
        { src: "paper-figures-web/data-plot5-purity-by-method.webp", caption: "" },
        { src: "paper-figures-web/data-plot6-gc-oc-sgr-completeness.webp", caption: "" },
      ]
    },
    "rotation-curve": {
      blurb: "Milky Way rotation curve from inner-disc and outer-halo tracer kinematics.",
      thumb: "paper-figures-web/rc-fig-zslice-kinematics.webp",
      summary: "<p>This project uses stellar kinematics to infer the Milky Way rotation curve as a probe of the Galaxy dark-matter distribution, joining the inner disc and the outer halo within a common dynamical framework.</p><p>The inner-disc analysis uses cylindrical Jeans modelling, tracer-density fits, velocity-dispersion profiles, cross-term corrections, selection tests, and systematic-error budgets. The outer-halo analysis uses halo tracers and spherical Jeans modelling, including number-density profiles, radial velocity dispersions, anisotropy modelling, and substructure rejection.</p><p>The combined rotation curve is designed to expose how assumptions about tracer density, anisotropy, substructure, the solar LSR, and visible-matter priors affect the inferred circular velocity and, therefore, estimates of the Milky Way dark-matter halo.</p>",
      plots: [
        { src: "paper-figures-web/rc-fig-zslice-kinematics.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-thin-disc-second-moments.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-second-moments-components.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-velocity-ellipsoid-ours.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-velocity-ellipsoid-linear-fits.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-crossterm-vc-curve.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-jeans-term-maps.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-density-chi2.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-density-map-panel.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-density-systematic-effect.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-density-fits-zslices.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-dispersion-profile.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-crossterm-systematic.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-selection-xyplane.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-systematic-selection-only.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-systematic-plus-dispersion.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-systematic-plus-density.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-systematic-all-combined.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-systematic-sequential.webp", caption: "" },
        { src: "paper-figures-web/rc-outer-halo-sigma-model-comparison.webp", caption: "" },
        { src: "paper-figures-web/rc-plot2-outer-grand-rc-per-lsr-constant-beta.webp", caption: "" },
        { src: "paper-figures-web/rc-plot3b-full-grand-rc-inner-outer-multi-lsr-logx.webp", caption: "" },
        { src: "paper-figures-web/rc-outer-halo-beta-pheno-literature-2x2-page1.webp", caption: "" },
        { src: "paper-figures-web/rc-outer-halo-beta-pheno-literature-2x2-page2.webp", caption: "" },
        { src: "paper-figures-web/rc-plot-panelwise-desi-li26-beta.webp", caption: "" },
        { src: "paper-figures-web/rc-fig-beta-dip-substructure-panels.webp", caption: "" },
        { src: "paper-figures-web/rc-plot3-grand-rc-with-beta-overlay.webp", caption: "" },
        { src: "paper-figures-web/rc-plot3-grand-rc-r8p1-v229-only-logx-beta.webp", caption: "" },
        { src: "paper-figures-web/rc-plot4-our-rc-vs-literature-bhatt.webp", caption: "" },
      ]
    },
    "joint-likelihood": {
      blurb: "Joint rotation-curve and local-kinematics constraints on the local dark matter density.",
      thumb: "paper-figures-web/joint-likelihood-rhodm-sigma-comparison.webp",
      summary: "<p>This project constrains the local dark matter density by combining Milky Way rotation-curve information with local kinematic measurements. The mass model uses a spherical NFW dark-matter halo, a spheroidal visible-matter bulge, and an axisymmetric disk, then estimates the model parameters through likelihood and MCMC analyses.</p><p>The central point is that the inferred local dark matter density is not a single number independent of astrophysical choices. It depends strongly on the adopted Local Standard of Rest, on how tracer velocities are binned and averaged into a rotation curve, and on whether visible-matter disk priors are imposed. These effects help explain why the literature reports a wide range of local-density values with apparently small error bars.</p><p>The analysis compares rotation-curve datasets from Bhattacharjee et al., Eilers et al., Mroz Cepheids and Gaia DR3 tracers, studies degeneracies between the dark halo and visible disk parameters, and propagates the resulting constraints into local velocity-distribution functions relevant for dark-matter searches.</p>",
      plots: [
        { src: "paper-figures-web/joint-likelihood-rotation-curve-prior-comparison.webp", full: "paper-figures-full/joint-likelihood-rotation-curve-prior-comparison.png", caption: "" },
        { src: "paper-figures-web/joint-likelihood-rhodm-rs-lsr-priors.webp", full: "paper-figures-full/joint-likelihood-rhodm-rs-lsr-priors.png", caption: "" },
        { src: "paper-figures-web/joint-likelihood-rhodm-sigma-comparison.webp", full: "paper-figures-full/joint-likelihood-rhodm-sigma-comparison.png", caption: "" },
        { src: "paper-figures-web/joint-likelihood-vdf-rotation-curve-comparison.webp", full: "paper-figures-full/joint-likelihood-vdf-rotation-curve-comparison.png", caption: "" },
        { src: "paper-figures-web/joint-likelihood-vdf-shm-comparison.webp", full: "paper-figures-full/joint-likelihood-vdf-shm-comparison.png", caption: "" },
        { src: "paper-figures-web/joint-likelihood-mcmc-corner-comparison.webp", full: "paper-figures-full/joint-likelihood-mcmc-corner-comparison.png", caption: "" },
      ]
    },
    "surface-density": {
      blurb: "Updated Milky Way disc surface density from panel-wise red-clump vertical dynamics.",
      thumb: "paper-figures-web/surface-current-fig11-fig6-solar-sigma.webp",
      summary: "<p>This project applies the Cheng et al. (2024) tilt-corrected vertical Jeans / K_Z machinery to an eight-survey red-clump census built from Gaia DR3, DESI DR1, APOGEE DR17, GALAH DR4, RAVE DR6, Gaia-ESO DR5, LAMOST DR11, and Gaia-XP abundances.</p><p>The analysis classifies stars panel by panel in the alpha-metallicity plane using L1/L2 boundaries, carries thin-disc, thick-disc, and halo tracers separately, fits velocity-dispersion closures and tilt terms, and propagates these choices into Sigma(R, |Z|).</p><p>The figure gallery collects the chemistry, kinematics, and surface-density diagnostics used to compare tracer populations and closure choices across radius and height.</p>",
      plots: [
        { src: "paper-figures-web/surface-current-fig01-alpha-m-vs-mh-clean-quality-hexbin.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig02-mgfe-vs-feh-clean-quality-hexbin.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig03-alphafe-vs-feh-clean-quality-hexbin.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig04-combined-xfe-or-alpham-vs-metallicity-clean-quality-hexbin.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig05-combined-xfe-or-alpham-vs-metallicity-quality-motivated-rz-panels.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig06-panel-l1-l2-population-counts.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig07-fig2-velocity-dispersion-r3-6.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig08-fig3-velocity-dispersion-r6-9.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig09-fig4-velocity-dispersion-r9-12.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig10-fig5-hsigma-fit.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig11-fig6-solar-sigma.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig12-fig6p1-solar-sigma-combined.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig13-fig8-sigma-vs-r.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig14-fig7-sigma-grid.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig15-sigmaz-model-sigma-r-comparison.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig16-thin-thick-sigma-r-discrepancy-by-sigz-model.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig17-fig9-exp-vs-sech2.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig18-all-strict-panel-l2-sigma-r-overplot.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig19-original-panel-grid-sigma-r.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig20-original-panel-sigma-r-assignments.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig21-original-panel-sigma-z-assignments.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig22-sigma-z-profiles.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig23-sigma-z-model-comparison.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig24-chemical-selection-l1-l2.webp", caption: "" },
        { src: "paper-figures-web/surface-current-fig25-fig10-kg-integral.webp", caption: "" },
      ]
    },
  };
  function figureLabel(src) {
    var file = String(src || '').split('/').pop().replace(/\.[a-z0-9]+$/i, '');
    var label = file
      .replace(/^(data|rc|surface-current|surface|joint-likelihood)[-_]/i, '')
      .replace(/^fig[-_ ]?[0-9]+[a-z]?\b[-_]?/i, '')
      .replace(/^current[-_]?fig[0-9]+[a-z]?\b[-_]?/i, '')
      .replace(/^plot[-_ ]?[0-9]+[a-z]?\b[-_]?/i, '')
      .replace(/\bfig[-_ ]?[0-9]+[a-z]?\b[-_]?/gi, '')
      .replace(/[-_]+/g, ' ')
      .replace(/^madmax\s+/i, '')
      .replace(/\bbn06\b/gi, 'BN06')
      .replace(/\bqiid\b/gi, 'QIID')
      .replace(/\bpvalues\b/gi, 'p values')
      .replace(/\brhodm\b/gi, 'rho DM')
      .replace(/\brs\b/gi, 'scale radius')
      .replace(/\bvdf\b/gi, 'velocity distribution')
      .replace(/\bshm\b/gi, 'standard halo model')
      .replace(/\blsr\b/gi, 'LSR')
      .replace(/\bruwe\b/gi, 'RUWE')
      .replace(/\brv\b/gi, 'radial velocity')
      .replace(/\bgc\b/gi, 'globular cluster')
      .replace(/\boc\b/gi, 'open cluster')
      .replace(/\bkg\b/gi, 'KG')
      .replace(/\bmgfe\b/gi, 'Mg Fe')
      .replace(/\bfeh\b/gi, 'Fe H')
      .replace(/\balphafe\b/gi, 'alpha Fe')
      .replace(/\balpham\b/gi, 'alpha M')
      .replace(/\bsigmaz\b/gi, 'sigma Z')
      .replace(/\bsigma\b/gi, 'sigma')
      .replace(/\s+/g, ' ')
      .trim();
    label = label.replace(/^([1-4])$/, 'run panel $1');
    return label || 'research figure';
  }

  function captionSentence(label) {
    var lower = String(label || '').toLowerCase();
    if (/kernel|frequency/.test(lower)) return 'Kernel response and frequency-domain structure for the MADMAX signal model';
    if (/qiid|p values/.test(lower)) return 'Per-step QIID p-value behaviour across repeated MADMAX search runs';
    if (/run panel 1/.test(lower)) return 'MADMAX run diagnostic for the first simulated search configuration';
    if (/run panel 2/.test(lower)) return 'MADMAX run diagnostic for the second simulated search configuration';
    if (/run panel 3/.test(lower)) return 'MADMAX run diagnostic for the third simulated search configuration';
    if (/run panel 4/.test(lower)) return 'MADMAX run diagnostic for the fourth simulated search configuration';
    if (/sky grid/.test(lower)) return 'Sky-footprint grid used to organize the stellar catalogue';
    if (/extinction/.test(lower)) return 'Extinction correction diagnostic across the compiled stellar sample';
    if (/hr diagram/.test(lower)) return 'Hertzsprung-Russell structure of the selected catalogue sources';
    if (/keil/.test(lower)) return 'Kiel-diagram view of the stellar-parameter selection';
    if (/relative distance error/.test(lower)) return 'Relative-distance uncertainty behaviour for the catalogue calibration';
    if (/distance comparison/.test(lower)) return 'Cross-survey comparison of distance estimates and calibration residuals';
    if (/gmag/.test(lower)) return 'G-band magnitude distribution for the assembled stellar sample';
    if (/fe h|metallicity|mh/.test(lower)) return 'Metallicity-space diagnostic for the selected tracer population';
    if (/radial velocity|drv/.test(lower)) return 'Radial-velocity calibration and survey-to-survey consistency diagnostic';
    if (/globular cluster|ngc|draco|sgr/.test(lower)) return 'Validation against known halo tracers, clusters, or satellite systems';
    if (/purity|completeness/.test(lower)) return 'Purity and completeness diagnostic for the catalogue-selection method';
    if (/radial dist/.test(lower)) return 'Radial-distribution comparison for the selected tracer sample';
    if (/ruwe/.test(lower)) return 'RUWE quality-control diagnostic for the astrometric selection';
    if (/zslice|thin disc|second moments|velocity ellipsoid|dispersion/.test(lower)) return 'Stellar-kinematic moment diagnostic used in the rotation-curve analysis';
    if (/crossterm|jeans|density|selection|systematic/.test(lower)) return 'Systematic-control diagnostic for the Jeans and rotation-curve reconstruction';
    if (/outer halo|beta|anisotropy/.test(lower)) return 'Outer-halo anisotropy and rotation-curve comparison diagnostic';
    if (/rho dm|scale radius|standard halo model|velocity distribution|rotation curve prior|mcmc/.test(lower)) return 'Joint-likelihood dark-matter constraint and local phase-space diagnostic';
    if (/alpha|mg fe|population counts|chemical/.test(lower)) return 'Chemical-abundance selection diagnostic for separating Milky Way tracer populations';
    if (/sigma|surface density|kg integral|hsigma|sech/.test(lower)) return 'Surface-density and vertical-force diagnostic from stellar-kinematic modelling';
    var cleaned = String(label || 'research figure')
      .replace(/\bvs\b/gi, 'versus')
      .replace(/\bmcmc\b/gi, 'MCMC')
      .replace(/\blsr\b/gi, 'LSR')
      .replace(/\bq iid\b/gi, 'QIID')
      .replace(/\s+/g, ' ')
      .trim();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  function siteCaption(topic, plot) {
    var label = figureLabel(plot && plot.src);
    return topic.title + ': ' + captionSentence(label) + '.';
  }

  function refreshCaptions(topic) {
    if (!topic || !Array.isArray(topic.plots)) return;
    topic.plots = topic.plots.map(function (plot) {
      var copy = Object.assign({}, plot);
      copy.caption = siteCaption(topic, copy);
      return copy;
    });
  }

  window.RESEARCH.topics.forEach(function (topic) {
    var detail = paperDetails[topic.id];
    if (!detail) return;
    Object.keys(detail).forEach(function (key) { topic[key] = detail[key]; });
    refreshCaptions(topic);
    if (detail.thumb) topic.previewPlots = [{ src: detail.thumb, caption: topic.title }];
  });
})();
