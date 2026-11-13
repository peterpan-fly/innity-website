/* English content. Every word shown on the site lives in this file.
   To add a language: copy this file to content.<code>.js, change the key below
   from "en" to your code, translate the strings, and list the language in config.js.
   Do not translate: key, icon, image, product, pillar (these are identifiers).
   {x}, {n}, {a}, {b} are placeholders filled in by the site. */
window.INNITY_CONTENT = window.INNITY_CONTENT || {};
window.INNITY_CONTENT.en = {
  ui: {
    titleHome: 'Innity: Innovative Unity',
    titleSuffix: ' | Innity',
    loader: 'Connecting the ecosystem',
    nav: { home: 'Home', about: 'About', contact: 'Contact', menu: 'Menu', primary: 'Primary', language: 'Language' },
    cta: { demo: 'Book a demo', enquiry: 'Make an enquiry', partnership: 'Explore a partnership', partner: 'Partner with us' },
    common: {
      explore: 'Explore {x}', see: 'See {x}', partOf: 'Part of {x}', of: '{n} of 04',
      nextPillar: 'Next pillar, {n} of 04', to: '{a} to {b}', clientOutput: 'Client-ready output',
      solvedBy: 'Solved by combining', problem: 'Problem {n}',
    },
    footer: {
      blurb: 'Curated reach. Trusted influence. Customer and commerce outcomes. Partnership-led growth.',
      pillars: 'What we do', company: 'Company', copyright: '© 2026 Innity. Innovative Unity.',
    },
  },

  pillars: [
    { key: 'seen', num: '01', word: 'Seen', category: 'Media & Advertising', short: 'Media', catDesc: 'Always-on, curated advertising across display, social, video, OTT/CTV and DOOH.', services: ['Display & video ads', 'Social media ads', 'OTT/CTV, DOOH & audio', 'Programmatic activation & measurement'], label: 'Reach & activation', desc: 'Relevant presence across channels, contexts and moments.', service: 'Always-on Curated Advertising', product: 'advenue', productName: 'Advenue', signal: 'Attention', outcome: 'Curated Reach', icon: 'target', hero: 'Maintain continuous, relevant reach across channels and moments, powered by contextual, trend and intent intelligence.' },
    { key: 'trusted', num: '02', word: 'Trusted', category: 'Content & Influencer Marketing', short: 'Influencer', catDesc: 'Creators, KOLs, KOCs and communities that build trust and preference.', services: ['Creator & influencer campaigns', 'KOL, KOC, KOE & KOP advocacy', 'Social content operations', 'Communities & creator networks'], label: 'Influence & participation', desc: 'Creators, advocates and communities that build preference.', service: 'Influencer Community Marketing', product: 'passionation', productName: 'Passionation', signal: 'Influence', outcome: 'Trusted Influence', icon: 'users', hero: 'Turn creator influence into trusted, continuous advocacy, participation and commerce.' },
    { key: 'chosen', num: '03', word: 'Chosen', category: 'E-commerce & Shopper Marketing', short: 'Commerce', catDesc: 'Retail media, shoppable campaigns, sampling and live commerce that drive sales.', services: ['Retail & commerce media', 'Shoppable campaigns & click-to-cart', 'Sampling, events & live commerce', 'Loyalty, rewards & attribution'], label: 'Customer & commerce outcomes', desc: 'Discovery, trial, purchase, retention and measurable value.', service: 'Connected Shopper Marketing', product: 'cxp', productName: 'Innity CXP', signal: 'Action', outcome: 'Shopper Action', icon: 'cart', hero: 'Connect every touchpoint, from discovery to engagement, purchase and advocacy.' },
    { key: 'enabled', num: '04', word: 'Enabled', category: 'Partnership Consultation', short: 'Partnerships', catDesc: 'The right partners, data and technology for shared growth.', services: ['Partner curation & strategy', 'Data & technology enablement', 'Co-branding & co-marketing', 'Pilots & joint propositions'], label: 'Partnership & ecosystem growth', desc: 'Partners, data and technology that create shared value.', service: 'Partnership & Technology Consultation', product: 'innity', productName: 'Partnerships', signal: 'Value', outcome: 'Shared Growth', icon: 'hands', hero: 'Consult, connect and activate the right partners, data and technology.' },
  ],

  home: {
    kicker: 'Innovative Unity',
    intro: 'We help brands, agencies & partners',
    headlineLine: 'Be {x}.',
    lede: 'Media, influencer, e-commerce and partnership marketing, connected in one ecosystem from attention to action.',
    what: { title: 'What we do', sub: 'Four connected services. Use one, or connect them into one journey.' },
    secondary: 'See how it connects',
    rail: 'One ecosystem. Four connected pillars.',
    stats: [[4, 'pillars in one ecosystem'], [3, 'AI-native solutions'], [16, 'products and modules'], [10, 'client problems mapped'], [6, 'strategic platform partners']],
    brief: {
      title: 'Every brief asks for two things', sub: 'Today, the consumer journey isn’t linear.',
      a: 'Build long-term brand love', b: 'Drive immediate, measurable performance and sales',
      quote: 'Customers don’t see ads, content and shopping as separate experiences. They move between them in seconds.',
      answer: 'We call the answer Innovative Unity. We remove the silos to create a continuous journey from the moment of discovery to the point of transaction.',
    },
    pillarsLabel: 'The four pillars',
    ai: { title: 'Powered by native AI', sub: 'Three AI-empowered solutions that turn attention into action and drive measurable growth.' },
    useCases: { title: 'Ten client problems, mapped to solutions', sub: 'Pick the problem you’re solving to see which Innity products work on it together.', filters: ['All', 'Media', 'Influencer', 'Commerce'], filterLabel: 'Filter by service', listLabel: 'Client problems' },
    channels: { title: 'Channel execution', sub: 'Channel execution is seamlessly connected to Innity’s products and solutions layers.' },
    why: { title: 'Why brands and agencies work with Innity', sub: 'A regional operating partner across media, creators, communities, data, commerce and partnerships.' },
    delivery: { title: 'What Innity delivers', sub: 'A managed delivery layer turns products and modules into measurable client outcomes.' },
    measure: { title: 'Measure the connected journey', sub: 'Move from channel metrics to customer and commerce outcomes.', loop: 'Closed-loop learning', steps: ['Plan', 'Activate', 'Optimize', 'Attribute', 'Learn'] },
    partners: { title: 'Stronger partnerships. Better access. Greater impact.', sub: 'Innity’s premium partnerships empower brands with stronger platforms, smarter insights, and greater media impact across the full funnel.', link: 'Meet the partner ecosystem' },
    audiences: { title: 'Start where you are' },
    advantage: { title: 'The Innity advantage', sub: 'Creativity. Curation. Collaboration.' },
    closing: 'Let’s build what’s next.',
  },

  ai: [
    { pillar: 0, name: 'Moments AI', icon: 'bolt', text: 'Cross-channel presence curated by context, trends, and optimization.', tags: ['Reach', 'Relevance', 'Performance'] },
    { pillar: 1, name: 'Community AI', icon: 'users', text: 'Creators, advocates, and communities that build trust and engagement.', tags: ['Influence', 'Advocacy', 'Community'] },
    { pillar: 2, name: 'Shoppable AI', icon: 'cart', text: 'Connected shopper journeys across retail, commerce, and activation touchpoints.', tags: ['Discovery', 'Activation', 'Conversion'] },
  ],

  // pillar = index of the lead product's pillar (0 Seen, 1 Trusted, 2 Chosen)
  useCases: [
    { pillar: 0, title: 'Always-on curated reach', products: ['Advenue Intelligence', 'Experience', 'Media Solution'] },
    { pillar: 0, title: 'Launch products with impact', products: ['Advenue Creative Studio', 'Moment-Driven Video', 'Creators', 'Retail'] },
    { pillar: 0, title: 'Command attention', products: ['Advenue AttentionFX', 'Immersive and Interactive formats'] },
    { pillar: 1, title: 'Scale creator advocacy', products: ['Passionation Connect & IQS', 'Creator Networks'] },
    { pillar: 1, title: 'Operate social content', products: ['Passionation Post', 'Creative Studio', 'Amplification'] },
    { pillar: 1, title: 'Build communities', products: ['Passionation Community', 'CXP Shopper Community'] },
    { pillar: 0, title: 'Drive retail & e-commerce sales', products: ['Advenue Commerce Media', 'CXP Shopper Activation'] },
    { pillar: 2, title: 'Improve product discovery', products: ['CXP Commerce Intelligence', 'AEO/GEO', 'Product Catalogue'] },
    { pillar: 2, title: 'Increase lifetime value', products: ['CXP Customer Intelligence', 'Rewards', 'Loyalty'] },
    { pillar: 2, title: 'Prove business impact', products: ['CXP Attribution', 'Incrementality', 'Closed-loop reporting'] },
  ],

  channels: [
    { pillar: 0, name: 'Paid media', items: ['Display ads, social media ads, video ads, OTT/CTV, DOOH, audio & in-game ads', 'AttentionFX, moment-driven and interactive off-site ads', 'Contextual, trend, intent and opportunity activation', 'Programmatic activation, optimisation and measurement'] },
    { pillar: 1, name: 'Social & creator media', items: ['Passionation Post, for social content operations', 'Creator discovery, IQS selection and campaign management', 'KOL/KOC/KOE/KOP content and advocacy', 'Creator-content amplification and social commerce'] },
    { pillar: 2, name: 'Owned & community media', items: ['Branded and shopper communities', 'CDP, identity, segmentation and personalisation', 'Shoppable landing page, product discovery, engagement, purchase journeys', 'Sampling, reviews, UGC, missions, challenges, rewards and loyalty'] },
    { pillar: 3, name: 'Partner, retail & commerce', items: ['On-site and off-site retail & commerce media', 'Catalogue activation, click-to-cart and shoppable campaigns', 'Events, sampling, affiliate drives and live commerce', 'Co-marketing, attribution and closed-loop reporting'] },
  ],

  why: [
    { pillar: 0, icon: 'globe', title: 'Regional activation', text: 'Cross-market planning, premium publisher access and market-ready execution.' },
    { pillar: 2, icon: 'bulb', title: 'Technology & intelligence', text: 'Contextual, intent, creator-quality, customer and commerce intelligence.' },
    { pillar: 1, icon: 'magic', title: 'Creative infrastructure', text: 'High-impact formats, dynamic adaptation, social content and video production.' },
    { pillar: 1, icon: 'users', title: 'Creator & community network', text: 'KOL, KOC, KOE, KOP, vertical networks and shopper communities.' },
    { pillar: 2, icon: 'hands', title: 'Commerce partnerships', text: 'Retail media, shoppable activation, sampling, rewards and live commerce.' },
    { pillar: 2, icon: 'chart', title: 'Closed-loop accountability', text: 'Optimisation, attribution, incrementality and business-outcome reporting.' },
  ],
  outcomes: ['Stronger relevance across every touchpoint', 'Deeper connections that drive preference', 'Better outcomes that grow your business', 'Accountability you can measure and prove'],

  delivery: [
    { title: 'Strategy', text: 'Objectives, journey, audiences, channels and partner design.', trait: 'Outcome focused' },
    { title: 'Creative', text: 'Concepting, curation, content production and adaptation.', trait: 'Integrated expertise' },
    { title: 'Activation', text: 'Media, creators, communities, retail and commerce operations.', trait: 'End-to-end execution' },
    { title: 'Optimisation', text: 'Context, trends, attention, engagement and conversion signals.', trait: 'Performance driven' },
    { title: 'Measurement', text: 'Reporting, attribution, incrementality, retention and learning.', trait: 'Continuous learning' },
  ],
  measure: [
    { pillar: 0, icon: 'target', title: 'Attention', text: 'Viewability, interaction, moment-driven video engagement and attention signals' },
    { pillar: 1, icon: 'users', title: 'Influence', text: 'Content quality, participation, trust and community growth' },
    { pillar: 2, icon: 'cart', title: 'Action', text: 'Traffic, trial, click-to-cart, conversion and retail outcomes' },
    { pillar: 3, icon: 'chart', title: 'Value', text: 'Incrementality, repeat purchase, lifetime value and shared partner growth' },
  ],
  advantage: [
    { icon: 'bulb', title: 'Creativity', text: 'High-impact ideas and ad experiences that capture attention.' },
    { icon: 'stream', title: 'Curation', text: 'Smarter media, content and commerce pathways tailored to outcomes.' },
    { icon: 'hands', title: 'Collaboration', text: 'A connected partner approach across brands, creators, media and technology.' },
  ],
  audiences: [
    { tab: 'Clients & agencies', title: 'One partner for four connected growth priorities', text: 'Bring a brief that asks for brand love and measurable performance. Innity plans it across advertising, creators, commerce and partnerships, and reports on it as one journey.', intent: 'demo' },
    { tab: 'Partners', title: 'Co-create. Co-grow. Greater together.', text: 'Media, technology, data, retail and brand partners plug into a connected ecosystem with shared opportunities, joint ownership and shared KPIs.', intent: 'partnership' },
    { tab: 'Investors', title: 'A regional operating partner, built as one ecosystem', text: 'Three AI-native solutions and a partnership practice, unified across products, solutions and delivery services, serving brands and agencies across media, creators, communities, data and commerce.', intent: 'enquiry' },
    { tab: 'Talent', title: 'Creativity. Curation. Collaboration.', text: 'Work across high-impact ideas, smarter media and commerce pathways, and a connected partner approach spanning brands, creators, media and technology.', intent: 'enquiry' },
  ],

  /* Pillar pages: Seen, Trusted, Chosen */
  pillarPage: {
    whereTitle: 'Where it runs', whereSub: 'Channel execution connected to the products above.',
    useCasesTitle: 'Client problems this solves', useCasesSub: 'Each one pairs products across the ecosystem.',
    activationsTitle: 'Seven connected shopper activations', activationsSub: 'Each activation works independently; value compounds when connected.',
    journeyTitle: 'The shopper journey they connect', journeyText: 'Discover, engage, try, buy, repeat.', journey: ['Discover', 'Engage', 'Try', 'Buy', 'Repeat'],
    loopTitle: 'Then the loop runs again', loopText: 'What you learn from amplifying feeds the next round of discovery.',
  },
  pages: {
    seen: {
      modTitle: 'Six buyable solution groups', modSub: 'Advenue connects intelligence, creative, media and commerce.',
      modules: [
        { icon: 'star', title: 'Experience Solutions', items: ['Curation 360', 'AttentionFX Ads', 'Moment-Driven Video Ads', 'Interactive Off-Site Ads'] },
        { icon: 'brush', title: 'Creative Studio', items: ['Dynamic creative', 'Content adaptation', 'Content integration', 'Video clipping'] },
        { icon: 'brain', title: 'Intelligence', items: ['Trends & context discovery', 'Opportunity scoring', 'Audience & intent signals'] },
        { icon: 'server', title: 'Media Platform', items: ['Interactive ads server', 'Self-service', 'Activation', 'Optimisation & measurement'] },
        { icon: 'news', title: 'Publisher Solutions', items: ['Ads monetisation', 'Inventory enablement', 'Yield & revenue optimisation'] },
        { icon: 'bag', title: 'Commerce Media', items: ['E-commerce integration', 'Product catalogue activation', 'Click-to-cart', 'Commerce attribution'] },
      ],
      stepTitle: 'Driving impact through curated media intelligence', stepSub: 'Curated intelligence turns media presence into timely, high-attention action.',
      steps: [
        { title: 'Stay present', text: 'Always-on ads planning across display, social, native, video, OTT/CTV and DOOH.', tag: 'Reach' },
        { title: 'Own the moment', text: 'Spot signals and trends and activate relevant moment-based creative and video while interest is rising.', tag: 'Relevance' },
        { title: 'Earn attention', text: 'Use immersive, interactive and multi-screen experiences.', tag: 'Attention' },
        { title: 'Connect discovery to action', text: 'Bring catalogue, product and click-to-cart experiences off-site.', tag: 'Action' },
      ],
      channels: [0], useCases: [0, 1, 2, 6],
    },
    trusted: {
      modTitle: 'Five connected modules', modSub: 'Passionation covers content operations, creators, communities and intelligence.',
      modules: [
        { icon: 'pencil', title: 'Social Content Management', product: 'Passionation Post', items: ['Social media management', 'Scheduling', 'Automation'] },
        { icon: 'usercheck', title: 'Influencer & Creator Management', product: 'Passionation Connect', items: ['Discovery', 'Collaboration', 'Campaign management'] },
        { icon: 'comments', title: 'Community & Advocacy', product: 'Passionation Community', items: ['KOL, KOC, KOE & KOP recruitment', 'Engagement', 'Partnership'] },
        { icon: 'brain', title: 'Creator Intelligence', product: 'Passionation IQS', items: ['Relevance', 'Trust', 'Engagement', 'Budget efficiency'] },
        { icon: 'network', title: 'Creator Networks', product: 'Category-native networks', items: ['DearMom Creator Network', 'Campus Creator Network', 'Professional Influence Network'] },
      ],
      stepTitle: 'From one-off posts to an always-on influence engine', stepSub: 'One connected loop to select trusted voices, activate participation, build advocacy and compound content value.',
      steps: [
        { title: 'Understand & discover', tools: 'Passionation IQS + Passionation Connect', text: 'Identify the voices that best fit the brand, aligned on values, trust, context and audience.' },
        { title: 'Activate & outreach', tools: 'Passionation Post + Passionation Connect', text: 'Activate the right influencers and creators through tailored content and targeted outreach across every influence tier.' },
        { title: 'Engage & participate', tools: 'Passionation Community + Creator Networks', text: 'Turn trusted communities into sustained participation, loyalty and long-term brand value.' },
        { title: 'Amplify & learn', tools: 'Creator Content Ads + Curation + Video Clipping', text: 'Secure permissions, scale winning content across channels and extend its performance lifecycle.' },
      ],
      loop: true, channels: [1], useCases: [3, 4, 5],
    },
    chosen: {
      modTitle: 'Five modules', modSub: 'Innity CXP connects commerce intelligence, customer data, activation, community and measurement.',
      modules: [
        { icon: 'search', title: 'Commerce Intelligence', items: ['Agentic Commerce, AEO and GEO', 'AI-powered product discovery'] },
        { icon: 'id', title: 'Customer Intelligence', items: ['CDP, identity and segmentation', 'Personalisation and journey analytics'] },
        { icon: 'store', title: 'Shopper Activation', items: ['Retail & commerce media and shoppable campaigns', 'Events, sampling and live commerce'] },
        { icon: 'users', title: 'Shopper Community', items: ['Engagement, reviews and UGC', 'Rewards, loyalty and advocacy'] },
        { icon: 'bars', title: 'Measurement & Attribution', items: ['Media-to-commerce attribution', 'Incrementality and closed-loop reporting'] },
      ],
      activations: [
        { icon: 'store', title: 'Retail & Commerce Media', tag: 'On/off-site reach' }, { icon: 'cal', title: 'Events & Pop-Up Stores', tag: 'Physical-to-digital' },
        { icon: 'box', title: 'Sampling & Unboxing', tag: 'Trial & unboxing' }, { icon: 'game', title: 'Gamification & Rewards', tag: 'Missions & loyalty' },
        { icon: 'link', title: 'Affiliate & Influencer Drives', tag: 'Tracked action' }, { icon: 'hands', title: 'Co-Branding / Co-Marketing', tag: 'Partner value' },
        { icon: 'video', title: 'Live Commerce / Live Stream', tag: 'Real-time conversion' },
      ],
      channels: [2, 3], useCases: [6, 7, 8, 9],
    },
  },

  /* Enabled page */
  enabled: {
    heroTitle: 'Partnership-led growth', closing: 'Co-create. Co-grow. Greater together.',
    eco: { title: 'Partnerships power possibilities', sub: 'A connected ecosystem. Shared opportunities. Real growth together. Select a partner type to see what it adds.', core: 'PARTNERSHIP-LED GROWTH', label: 'Partner types' },
    ecosystem: [
      { icon: 'horn', title: 'Media & technology partners', who: 'Media, technology & ad platforms', examples: 'TikTok, Google, LinkedIn, Amap, FastMoss, FreeWheel, Perion', benefit: 'Expand reach across channels.' },
      { icon: 'hands', title: 'Client success partners', who: 'Media, creative, digital and PR agencies', examples: 'Consultancies and brand partners', benefit: 'Combine expertise to deliver better client outcomes.' },
      { icon: 'db', title: 'Data partners', who: 'Data, identity & location intelligence', examples: 'Telco, location, audience, retail and market intelligence', benefit: 'Turn data into smarter decisions.' },
      { icon: 'bulb', title: 'Strategic & co-branding partners', who: 'Brands, platforms & ecosystem alliances', examples: 'Co-branding, product partners and innovation', benefit: 'Create new value through co-innovation.' },
      { icon: 'cart', title: 'Retail & commerce partners', who: 'Retail & commerce media and marketplaces', examples: 'On-site, off-site and O2O', benefit: 'Connect discovery to purchase, online and in-store.' },
      { icon: 'users', title: 'Influencer & community partners', who: 'KOL, KOC, KOE and KOP', examples: 'Affiliates and creator networks', benefit: 'Build trusted influence through creators and communities.' },
    ],
    consult: { title: 'Innity turns partnerships into growth', sub: 'Partnership & Technology Consultation, from opportunity to activation. Beyond access: expertise that connects the ecosystem.' },
    services: [
      { icon: 'compass', title: 'Consult on business needs', scope: 'Start with the outcome, not the channel', action: 'Define the brief, audience & KPIs.', result: 'A clear strategy before activation.' },
      { icon: 'cross', title: 'Curate the right partners', scope: 'Media, platforms & specialist expertise', action: 'Select by audience, objective & channel fit.', result: 'A purpose-built partner ecosystem.' },
      { icon: 'db', title: 'Enable smarter technology', scope: 'Data, identity & location intelligence', action: 'Recommend the right tools, data & measurement approach.', result: 'Connect insight to action.' },
      { icon: 'users', title: 'Connect trusted influence', scope: 'Creators, communities & advocates', action: 'Shape the right voices for each brief.', result: 'Build relevance, trust & advocacy.' },
      { icon: 'cart', title: 'Link content to commerce', scope: 'Retail media, affiliates & marketplaces', action: 'Plan on-site, off-site & O2O journeys.', result: 'Connect discovery to purchase.' },
      { icon: 'bulb', title: 'Co-create what comes next', scope: 'Brands, agencies & ecosystem partners', action: 'Design pilots & joint propositions.', result: 'Turn new ideas into testable solutions.' },
    ],
    process: { title: 'From strategy to activation', sub: 'Consultation, enablement and activation, built around shared outcomes.', quote: 'Joint ownership. Shared KPIs. A clear review rhythm. Start with the business question; scale what the pilot validates.' },
    stages: [
      { name: 'Consultation', title: 'Define the growth opportunity', text: 'Clarify audience needs, business goals & barriers across the customer journey.', output: 'Prioritized use cases, a partner shortlist & agreed success measures.' },
      { name: 'Enablement', title: 'Design the connected solution', text: 'Match partners, tools & data to the brief. Align workflows, ownership & reporting.', output: 'Partner roles, data requirements & an activation-ready plan.' },
      { name: 'Activation', title: 'Launch, learn & improve', text: 'Pilot across chosen channels. Review signals against agreed KPIs & refine the approach together.', output: 'Pilot learnings, a KPI review & the next test-or-scale decision.' },
    ],
    growth: { title: 'Innity unlocks customer growth opportunities', sub: 'Discover new customers, strengthen relationships and grow through partnerships.', note: 'Illustrative opportunities. Partner collaboration subject to customer consent & agreed data use.' },
    opportunities: [
      { title: 'Discover new customers', sub: 'Expand beyond your current customer base.', how: 'Use media, creators & audience insights to identify and engage new prospects.', gain: 'New customer acquisition', gainSub: 'Broader reach & qualified leads' },
      { title: 'Strengthen existing customers', sub: 'Deepen engagement, loyalty & repeat value.', how: 'Connect data, content & relevant offers to re-engage current customers.', gain: 'Stronger customer relationships', gainSub: 'Retention, repeat purchase & cross-sell' },
      { title: 'B2B / brand-to-brand partnerships', sub: 'Collaborate around partners’ existing customers.', how: 'Match complementary partners; co-create cross-promotions, offers & referrals.', gain: 'Access to partners’ existing customers', gainSub: 'Mutual value for both customer bases' },
    ],
    voicesHead: { title: 'A connected ecosystem of voices', sub: 'Community-powered trust, advocacy and growth through partner voices.' },
    voices: [
      { image: 'ppl_koc', title: 'KOCs', role: 'Consumer trust', text: 'Real users build confidence through authentic product experiences.' },
      { image: 'ppl_kop', title: 'KOPs', role: 'Professional authority', text: 'Recognized professionals influence through expertise and credibility.' },
      { image: 'ppl_koe', title: 'KOEs', role: 'Employee advocacy', text: 'Employees humanize the brand through authentic workplace and product stories.' },
      { image: 'ppl_amb', title: 'Brand ambassadors', role: 'Consistent brand influence', text: 'Long-term advocates represent the brand across ongoing campaigns.' },
      { image: 'ppl_aff', title: 'Affiliates', role: 'Conversion partners', text: 'Content partners turn recommendations and traffic into measurable sales.' },
      { image: 'ppl_bp', title: 'Brand partners', role: 'Collaborative reach', text: 'Businesses expand opportunities through shared audiences and co-marketing.' },
    ],
    partnersHead: { title: 'Strategic platform partners', sub: 'Strategic partnerships. Premium platform access. Superior results.' },
  },
  partners: [
    { image: 'p_tiktok', name: 'TikTok', title: 'TikTok Affiliate Partner', badge: 'Premium access', text: 'Official affiliate partner with TikTok to drive performance and commerce through creators and content.', advantages: ['Access to TikTok Shop and creator ecosystem', 'Data-driven affiliate insights and reporting', 'Higher conversion and ROI for brands'] },
    { image: 'p_google', name: 'Google', title: 'Google Buyer Direct Preferred Partner', badge: 'Premium access', text: 'Direct access to Google’s premium inventory and advertising solutions.', advantages: ['Exclusive inventory and beta access', 'Higher campaign performance', 'Strategic support from Google teams'] },
    { image: 'p_linkedin', name: 'LinkedIn', title: 'LinkedIn Ads Certified Agency', badge: 'Certified expertise', text: 'Recognized by LinkedIn for proven expertise in driving B2B growth.', advantages: ['Certified by LinkedIn for excellence', 'Access to exclusive tools and insights', 'Stronger B2B leads and measurable ROI'] },
    { image: 'p_amap', name: 'Amap', title: 'Southeast Asia Preferred Partner', badge: 'Location data partner', text: 'Preferred partnership with Amap to unlock navigation, mobility and location-based audience opportunities across Southeast Asia.', advantages: ['Access to map, mobility and location-based audiences', 'Regional reach across Southeast Asia travel touchpoints', 'Smarter targeting with navigation and local context signals'] },
    { image: 'p_fastmoss', name: 'FastMoss', title: 'Tier 1 Asia Partner', badge: 'Premium data partner', text: 'Official Tier 1 reseller of FastMoss, the leading TikTok data intelligence platform.', advantages: ['Access to TikTok Shop and creator insights', 'Data-driven product and market insights', 'Empower smarter decisions and faster growth'] },
    { image: 'p_freewheel', name: 'FreeWheel', title: 'Premium Video Platform Exclusive Partner', badge: 'Premium video reach', text: 'Exclusive partnership with FreeWheel for advanced premium video advertising at scale.', advantages: ['Access to premium video inventory', 'Advanced targeting and optimization', 'Brand safe environment with high viewability'] },
  ],

  about: {
    crumb: 'About', title: 'Innovative Unity',
    lede: 'Products, solutions and connected growth. Curated reach, trusted influence, customer and commerce outcomes, and partnership-led growth, from one partner.',
    story: 'We face a consistent, dual mandate from our clients. Every brief asks for two things: build long-term brand love, and drive immediate, measurable performance and sales.',
    p1: 'Customers don’t see ads, content and shopping as separate experiences. They move between them in seconds.',
    p2: 'So we drive growth by seamlessly connecting ads, social and commerce. We remove the silos to create a continuous journey from the moment of discovery to the point of transaction.',
    howTitle: 'How we deliver',
  },

  contact: {
    crumb: 'Contact', title: 'Let’s build what’s next.',
    lede: 'Tell us what you’re trying to grow. We’ll bring the right mix of advertising, creators, commerce and partners.',
    intentQuestion: 'What would you like to do?',
    intents: [{ value: 'enquiry', label: 'Make an enquiry', summary: 'Enquiry' }, { value: 'demo', label: 'Book a demo', summary: 'Demo request' }, { value: 'partnership', label: 'Explore a partnership', summary: 'Partnership' }],
    whoQuestion: 'You are a', whos: ['Client or agency', 'Partner', 'Investor', 'Talent'],
    pillarQuestion: 'Which pillars are you interested in?',
    name: 'Your name', email: 'Work email', company: 'Company', goal: 'What are you trying to achieve?',
    submit: 'Prepare my enquiry', submitLive: 'Send my enquiry', sending: 'Sending',
    errName: 'Add your name so we know who to reply to.', errEmail: 'Enter a work email address, like name@company.com.',
    errSend: 'We couldn’t send your enquiry. Copy the summary and send it to your Innity contact, or try again.',
    preparedTitle: 'Your enquiry is prepared', preparedText: 'This preview site isn’t connected to Innity’s inbox yet. Copy the summary and send it to your Innity contact.',
    sentTitle: 'Your enquiry is sent', sentText: 'Thanks. The Innity team will reply to the email address you gave.',
    copy: 'Copy summary', copied: 'Summary copied', selected: 'Summary selected, press copy', edit: 'Edit enquiry',
    summary: { from: '{a} from {b}', email: 'Email', company: 'Company', who: 'I am a', pillars: 'Pillars', goal: 'Goal', notSure: 'Not sure yet' },
  },
};
