// --- INVENTORY DATABASE ---
let inventory = window.CF_STATIC_INVENTORY || [];
const defaultInventory = inventory.map(item => ({ ...item, images: [...(item.images || [])] }));
window.CF_DEFAULT_INVENTORY = defaultInventory;
window.CF_INVENTORY = inventory;

async function loadGitHubManagedInventory() {
    try {
        const response = await fetch(`data/inventory.json?t=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Inventory JSON returned ${response.status}`);
        const items = await response.json();
        if (!Array.isArray(items)) throw new Error('Inventory JSON must be an array');
        setInventoryItems(items, { preservePremiumPicks: true });
    } catch (error) {
        console.warn('Using bundled static inventory fallback:', error);
        refreshInventoryViews({ preservePremiumPicks: true });
    } finally {
        handleRouteFromHash();
    }
}

function refreshInventoryViews(options = {}) {
    const { preservePremiumPicks = false } = options;
    window.CF_INVENTORY = inventory;
    if (!preservePremiumPicks) selectedPremiumPicks = null;
    populateCategoryFilter();
    populateListingsCategoryFilter();
    renderPremiumInventory();
    renderInventory();
    renderRecentlyAdded();
    renderListingsPage();
    renderCategoriesPage();
}

function setInventoryItems(items, options = {}) {
    inventory = Array.isArray(items) ? items : defaultInventory.map(item => ({ ...item, images: [...item.images] }));
    refreshInventoryViews(options);
}

window.CF_SET_INVENTORY = setInventoryItems;
window.CF_REFRESH_INVENTORY = refreshInventoryViews;

// --- VIEW NAVIGATION ---
let lastProductReturn = { view: 'home', scrollY: 0 };

function getCurrentVisibleView() {
    const viewIds = ['home', 'listings', 'categories', 'about', 'contact', 'policies', 'product'];
    return viewIds.find(id => !document.getElementById(`view-${id}`)?.classList.contains('hidden-view')) || 'home';
}

function showView(viewId, options = {}) {
    const { scrollToTop = true } = options;
    const homeView = document.getElementById('view-home');
    const productView = document.getElementById('view-product');
    const aboutView = document.getElementById('view-about');
    const listingsView = document.getElementById('view-listings');
    const categoriesView = document.getElementById('view-categories');
    const contactView = document.getElementById('view-contact');
    const policiesView = document.getElementById('view-policies');

    homeView?.classList.add('hidden-view');
    productView?.classList.add('hidden-view');
    aboutView?.classList.add('hidden-view');
    listingsView?.classList.add('hidden-view');
    categoriesView?.classList.add('hidden-view');
    contactView?.classList.add('hidden-view');
    policiesView?.classList.add('hidden-view');

    if (viewId === 'product') {
        productView?.classList.remove('hidden-view');
    } else if (viewId === 'about') {
        aboutView?.classList.remove('hidden-view');
    } else if (viewId === 'listings') {
        listingsView?.classList.remove('hidden-view');
    } else if (viewId === 'categories') {
        categoriesView?.classList.remove('hidden-view');
    } else if (viewId === 'contact') {
        contactView?.classList.remove('hidden-view');
    } else if (viewId === 'policies') {
        policiesView?.classList.remove('hidden-view');
    } else {
        homeView?.classList.remove('hidden-view');
    }

    if (scrollToTop) window.scrollTo(0, 0);
}

function returnToPreviousInventoryContext() {
    if (!lastProductReturn || lastProductReturn.view === 'product') {
        openListingsPage({ mode: 'all' });
        return;
    }

    showView(lastProductReturn.view || 'home', { scrollToTop: false });
    requestAnimationFrame(() => {
        window.scrollTo({ top: lastProductReturn.scrollY || 0, behavior: 'smooth' });
    });
}

function scrollToSection(sectionId) {
    setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function getRandomHeroMessage() {
    const messages = [
        {
            title: 'Need Inventory Gone? <span class="text-blue-400">Cypress, CA Buys.</span>',
            subtitle: 'Turn slow-moving collectibles, games, cards, electronics, toys, or gear into cash without listing, messaging, shipping, or waiting on flaky buyers.',
            primaryText: 'Sell Inventory',
            primarySection: 'suppliers',
            secondaryText: 'See What I Buy',
            secondarySection: 'inventory'
        },
        {
            title: 'Welcome to <span class="text-blue-400">Cypress, CA Flips.</span>',
            subtitle: 'A local resale shop for parents, collectors, gamers, riders, and gift hunters who want inspected goods, honest condition notes, and fair deals.',
            primaryText: 'Shop Local Finds',
            primarySection: 'inventory',
            secondaryText: 'Why Trust Me?',
            secondaryView: 'about'
        },
        {
            title: 'For Parents, Collectors & Deal Hunters. <span class="text-blue-400">No Guesswork.</span>',
            subtitle: 'Find kid-friendly consoles, nostalgic games, Disney plush, anime figures, and collectibles with flaws disclosed before you waste time or gas.',
            primaryText: 'Browse Inventory',
            primarySection: 'inventory',
            secondaryText: 'Ask a Question',
            secondaryView: 'contact'
        },
        {
            title: 'TCG Cards. Collectibles. <span class="text-blue-400">Video Games.</span>',
            subtitle: 'Cypress Flips focuses on handheld consoles, games, Pokémon cards, collectibles, plush, figures, motorcycle accessories, and occasional hard-to-source finds.',
            primaryText: 'Explore Categories',
            primarySection: 'inventory',
            secondaryText: 'Sell a Collection',
            secondarySection: 'suppliers'
        },
        {
            title: 'Quality Finds. <span class="text-blue-400">Cypress, CA Value.</span>',
            subtitle: 'Based in Cypress, CA and serving Orange County and the LA area with inspected resale goods, honest listings, and no-pressure local deals.',
            primaryText: 'Browse Inventory',
            primarySection: 'inventory',
            secondaryText: 'Become a Supplier',
            secondarySection: 'suppliers'
        }
    ];

    return messages[Math.floor(Math.random() * messages.length)];
}

function setupHeroMessage() {
    const message = getRandomHeroMessage();
    const title = document.getElementById('hero-title');
    const subtitle = document.getElementById('hero-subtitle');
    const primary = document.getElementById('hero-primary-cta');
    const secondary = document.getElementById('hero-secondary-cta');
    const stats = document.getElementById('hero-stats');

    if (title) title.innerHTML = message.title;
    if (subtitle) subtitle.textContent = message.subtitle;
    if (primary) {
        primary.textContent = message.primaryText;
        primary.href = `#${message.primarySection}`;
        primary.dataset.navSection = message.primarySection;
    }
    if (secondary) {
        secondary.textContent = message.secondaryText;
        if (message.secondaryView) {
            secondary.href = `#${message.secondaryView}`;
            secondary.dataset.navView = message.secondaryView;
            delete secondary.dataset.navSection;
        } else {
            secondary.href = `#${message.secondarySection}`;
            secondary.dataset.navSection = message.secondarySection;
            delete secondary.dataset.navView;
        }
    }

    if (stats) {
        const availableItems = getAvailableInventoryItems();
        const categories = new Set(availableItems.map(item => item.category)).size;
        const premiumCount = availableItems.filter(item => item.isPremium).length;
        stats.innerHTML = `
            <button type="button" class="hero-stat-card" data-stat-action="listings"><span>${availableItems.length}</span><small>Current Listings</small></button>
            <button type="button" class="hero-stat-card" data-stat-action="premium"><span>${premiumCount}</span><small>Premium Picks</small></button>
            <button type="button" class="hero-stat-card" data-stat-action="categories"><span>${categories}</span><small>Categories</small></button>
        `;
        setupHeroStatListeners();
    }
}


function setupHeroStatListeners() {
    document.querySelectorAll('[data-stat-action]').forEach(button => {
        if (button.dataset.bound) return;
        button.dataset.bound = 'true';
        button.addEventListener('click', () => {
            const action = button.dataset.statAction;
            if (action === 'premium') {
                openListingsPage({ mode: 'premium' });
            } else if (action === 'categories') {
                openCategoriesPage();
            } else {
                openListingsPage({ mode: 'all' });
            }
        });
    });
}

let revealObserver = null;

function setupScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach(element => element.classList.add('reveal-visible'));
        return;
    }

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px'
    });

    observeRevealElements(document);
}

function observeRevealElements(root = document) {
    const revealElements = root.querySelectorAll ? root.querySelectorAll('.reveal:not(.reveal-observed)') : [];

    revealElements.forEach((element, index) => {
        element.classList.add('reveal-observed');
        if (!element.style.transitionDelay && element.classList.contains('product-card')) {
            element.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
        }

        if (revealObserver) {
            revealObserver.observe(element);
        } else {
            element.classList.add('reveal-visible');
        }
    });
}

window.observeRevealElements = observeRevealElements;

function setupHeaderEffects() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const updateNav = () => {
        nav.classList.toggle('nav-scrolled', window.scrollY > 12);
    };

    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
}

function setupBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;

    const updateVisibility = () => {
        button.classList.toggle('hidden', window.scrollY < 650);
    };

    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', event => {
        const target = event.target;
        const isTyping = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

        if (event.key === '/' && !isTyping && !document.getElementById('view-home')?.classList.contains('hidden-view')) {
            event.preventDefault();
            scrollToSection('inventory');
            setTimeout(() => document.getElementById('inventory-search')?.focus(), 250);
        }

        if (event.key === 'Escape') {
            document.getElementById('auth-modal')?.classList.add('hidden');
            document.getElementById('profile-panel')?.classList.add('hidden');
            if (!document.getElementById('view-product')?.classList.contains('hidden-view')) showView('home');
        }
    });
}

function setupStaticNavigationListeners() {
    const brandHome = document.getElementById('brand-home');
    if (brandHome) {
        brandHome.addEventListener('click', () => showView('home'));
    }

    document.querySelectorAll('[data-nav-section]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            showView('home', { scrollToTop: false });
            scrollToSection(link.dataset.navSection);
            if (typeof mobileMenu !== 'undefined') mobileMenu?.classList.add('hidden');
        });
    });

    document.querySelectorAll('[data-nav-view]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            showView(link.dataset.navView);
            if (typeof mobileMenu !== 'undefined') mobileMenu?.classList.add('hidden');
        });
    });

    const aboutBackHome = document.getElementById('about-back-home');
    if (aboutBackHome) {
        aboutBackHome.addEventListener('click', () => showView('home'));
    }

    const listingsBackHome = document.getElementById('listings-back-home');
    if (listingsBackHome) {
        listingsBackHome.addEventListener('click', () => showView('home'));
    }

    const categoriesBackHome = document.getElementById('categories-back-home');
    if (categoriesBackHome) {
        categoriesBackHome.addEventListener('click', () => showView('home'));
    }

    const contactBackHome = document.getElementById('contact-back-home');
    if (contactBackHome) {
        contactBackHome.addEventListener('click', () => showView('home'));
    }

    const policiesBackHome = document.getElementById('policies-back-home');
    if (policiesBackHome) {
        policiesBackHome.addEventListener('click', () => showView('home'));
    }

    const contactSellToUs = document.getElementById('contact-sell-to-us');
    if (contactSellToUs) {
        contactSellToUs.addEventListener('click', () => {
            showView('home', { scrollToTop: false });
            scrollToSection('suppliers');
        });
    }

    const recentViewAll = document.getElementById('recent-view-all');
    if (recentViewAll) {
        recentViewAll.addEventListener('click', () => openListingsPage({ mode: 'all' }));
    }

    const backButton = document.getElementById('back-to-inventory');
    if (backButton) {
        backButton.addEventListener('click', returnToPreviousInventoryContext);
    }

    const reserveProductButton = document.getElementById('reserve-product-button');
    if (reserveProductButton) {
        reserveProductButton.addEventListener('click', () => showProductInquiryForm('reserve'));
    }

    const productInquiryButton = document.getElementById('show-product-inquiry');
    if (productInquiryButton) {
        productInquiryButton.addEventListener('click', () => showProductInquiryForm('question'));
    }

    const shareProductButton = document.getElementById('share-product-button');
    if (shareProductButton) {
        shareProductButton.addEventListener('click', shareCurrentProduct);
    }

    const checkoutDepositButton = document.getElementById('checkout-deposit-button');
    if (checkoutDepositButton) {
        checkoutDepositButton.addEventListener('click', startDepositCheckout);
    }
}

// --- INVENTORY RENDERING, SEARCH & SORTING ---
function stripHTML(value) {
    const temp = document.createElement('div');
    temp.innerHTML = value || '';
    return temp.textContent || temp.innerText || '';
}

function normalizeInventoryStatus(value = 'available') {
    const normalized = String(value || 'available').trim().toLowerCase().replace(/[\s_-]+/g, '-');
    const aliases = {
        visible: 'available',
        active: 'available',
        in_stock: 'available',
        'in-stock': 'available',
        available: 'available',
        hold: 'hold',
        held: 'hold',
        'on-hold': 'hold',
        onhold: 'hold',
        pending: 'pending',
        'pending-pickup': 'pending',
        reserved: 'reserved',
        reserve: 'reserved',
        upcoming: 'coming-soon',
        soon: 'coming-soon',
        'coming-soon': 'coming-soon',
        draft: 'draft',
        review: 'needs-review',
        'needs-review': 'needs-review',
        sold: 'sold',
        hidden: 'hidden',
        hide: 'hidden',
        archived: 'archived',
        archive: 'archived'
    };
    return aliases[normalized] || normalized || 'available';
}

function getProductStatus(item) {
    const status = normalizeInventoryStatus(item.status || item.Status || item.availability || item.itemStatus || item.inventoryStatus || 'available');
    const labels = {
        available: 'Available',
        hold: 'On Hold',
        pending: 'Pending Pickup',
        reserved: 'Reserved',
        'coming-soon': 'Coming Soon',
        sold: 'Sold',
        draft: 'Draft / Not Ready',
        'needs-review': 'Needs Review',
        hidden: 'Hidden',
        archived: 'Archived'
    };
    return { value: status, label: labels[status] || 'Available' };
}

function isAvailableForInventory(item) {
    return getProductStatus(item).value === 'available';
}

function getAvailableInventoryItems() {
    return inventory.filter(isAvailableForInventory);
}

// --- SIMPLE MODE (auto-switch based on available inventory count) ---
// Under CF_SITE_SETTINGS.simpleModeThreshold available items: hide the heavy
// search/filter/sort panel and show a simple grid + category chips instead.
// At or above the threshold, the full filter UI comes back automatically.
let simpleModeCategory = 'all';

function getSimpleModeThreshold() {
    const value = Number(window.CF_SITE_SETTINGS?.simpleModeThreshold);
    return Number.isFinite(value) && value > 0 ? value : 50;
}

function isSimpleMode() {
    return getAvailableInventoryItems().length < getSimpleModeThreshold();
}

function updateInventoryModeUI() {
    const filterPanel = document.getElementById('inventory-filter-panel');
    const chips = document.getElementById('inventory-category-chips');
    const premiumSection = document.getElementById('premium-picks-section');
    if (!filterPanel || !chips) return;

    if (!isSimpleMode()) {
        filterPanel.classList.remove('hidden');
        chips.classList.add('hidden');
        premiumSection?.classList.remove('hidden');
        return;
    }

    // Simple mode: every item is in the single grid, so the separate
    // Premium Picks block would just duplicate cards. Hide it.
    filterPanel.classList.add('hidden');
    chips.classList.remove('hidden');
    premiumSection?.classList.add('hidden');

    const availableItems = getAvailableInventoryItems();
    const categories = [...new Set(availableItems.map(item => item.category))].sort();
    if (!categories.includes(simpleModeCategory)) simpleModeCategory = 'all';

    const chipClass = active => `px-4 py-2 rounded-full text-sm font-semibold transition border ${active
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white text-gray-600 border-gray-200 hover:text-blue-600 hover:border-blue-300'}`;

    chips.innerHTML = '';
    const allChip = document.createElement('button');
    allChip.type = 'button';
    allChip.className = chipClass(simpleModeCategory === 'all');
    allChip.textContent = `All (${availableItems.length})`;
    allChip.addEventListener('click', () => { simpleModeCategory = 'all'; renderInventory(); });
    chips.appendChild(allChip);

    categories.forEach(category => {
        const count = availableItems.filter(item => item.category === category).length;
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = chipClass(simpleModeCategory === category);
        chip.textContent = `${category} (${count})`;
        chip.addEventListener('click', () => { simpleModeCategory = category; renderInventory(); });
        chips.appendChild(chip);
    });
}

function inferProductBadges(item) {
    const text = `${item.title} ${item.category} ${item.shortDesc} ${stripHTML(item.fullDesc)}`.toLowerCase();
    const badges = [];

    badges.push(getProductStatus(item).label);
    if (item.isPremium) badges.push('Premium');
    if (text.includes('untested')) badges.push('Untested');
    else if (text.includes('tested') || text.includes('working') || text.includes('powers on')) badges.push('Tested');
    if (text.includes('complete in box') || text.includes('complete in package')) badges.push('Complete');
    if (text.includes('cartridge only')) badges.push('Cartridge Only');
    if (text.includes('new in package') || text.includes('unopened') || text.includes('new old stock')) badges.push('New/Sealed');
    if (text.includes('cosmetic') || text.includes('wear') || text.includes('scuff') || text.includes('crack')) badges.push('Wear Disclosed');
    if (item.category === 'Video Games') badges.push('Local Pickup');

    return [...new Set(badges)].slice(0, 5);
}

function getBestFor(item) {
    const text = `${item.title} ${item.category} ${item.shortDesc} ${stripHTML(item.fullDesc)}`.toLowerCase();
    if (text.includes('switch') || text.includes('mario') || text.includes('pokemon yellow')) return 'Best for parents, gamers, and gift buyers';
    if (text.includes('ps2') || text.includes('game boy') || text.includes('zelda') || text.includes('3ds')) return 'Best for retro gamers and collectors';
    if (text.includes('disney') || text.includes('plush') || text.includes('bambi') || text.includes('figaro') || text.includes('kovu') || text.includes('scamp')) return 'Best for Disney fans, collectors, and gifts';
    if (text.includes('one piece') || text.includes('jujutsu') || text.includes('anime')) return 'Best for anime collectors and display shelves';
    if (text.includes('cody') || text.includes('wwe')) return 'Best for WWE fans and figure collectors';
    if (text.includes('cd player') || text.includes('vintage electronics')) return 'Best for vintage tech collectors and nostalgia displays';
    return 'Best for collectors and local deal hunters';
}

function renderBadgeHTML(item, extraClass = '') {
    return inferProductBadges(item).map(badge => `<span class="product-badge ${extraClass}">${badge}</span>`).join('');
}

function getProductConditionSummary(item) {
    const text = `${item.title} ${item.shortDesc} ${stripHTML(item.fullDesc)}`.toLowerCase();
    if (text.includes('new old stock')) return 'New old stock / packaged, see notes';
    if (text.includes('new in package') || text.includes('unopened')) return 'Unopened package, packaging wear disclosed';
    if (text.includes('cartridge only')) return 'Pre-owned cartridge only';
    if (text.includes('vintage')) return 'Good vintage pre-owned/display condition';
    if (text.includes('near-mint') || text.includes('near mint')) return 'Near-mint display condition';
    if (text.includes('fair to good')) return 'Fair to good pre-owned condition';
    if (text.includes('good pre-owned')) return 'Good pre-owned condition';
    if (text.includes('display condition')) return 'Good display condition';
    return 'Pre-owned; condition disclosed in description';
}

function getProductTestedSummary(item) {
    const text = `${item.title} ${item.shortDesc} ${stripHTML(item.fullDesc)}`.toLowerCase();
    if (text.includes('untested') || text.includes('not been opened or tested')) return 'Untested / disclosed';
    if (text.includes('powers on') || text.includes('powered on') || text.includes('working') || text.includes('works') || text.includes('tested')) return 'Tested to the best of my ability';
    if (item.category === 'Video Games' || item.category === 'Vintage Electronics' || item.category === 'More Finds') return 'Ask for exact test details';
    return 'Visually inspected';
}

function getIncludedSummary(item) {
    const text = `${item.title} ${item.shortDesc} ${stripHTML(item.fullDesc)}`.toLowerCase();
    if (text.includes('cartridge only')) return 'Cartridge only';
    if (text.includes('bundle')) return 'Bundle contents shown/described';
    if (text.includes('complete in box')) return 'Complete in box as pictured';
    if (text.includes('complete in package')) return 'Complete in package as pictured';
    if (text.includes('tag attached')) return 'Tag attached';
    if (text.includes('figure only') || text.includes('no box')) return 'Figure only; no box unless pictured';
    return 'Only items shown/described included';
}

function getKnownFlawsSummary(item) {
    const text = `${item.title} ${item.shortDesc} ${stripHTML(item.fullDesc)}`.toLowerCase();
    const flaws = [];
    if (text.includes('crack')) flaws.push('crack disclosed');
    if (text.includes('scuff') || text.includes('scuffs')) flaws.push('scuffs/wear');
    if (text.includes('label wear') || text.includes('fading')) flaws.push('label wear');
    if (text.includes('packaging wear') || text.includes('clearance sticker')) flaws.push('packaging wear');
    if (text.includes('lint')) flaws.push('lint/fiber pickup');
    if (text.includes('tag') && (text.includes('bending') || text.includes('creasing'))) flaws.push('tag wear');
    if (text.includes('untested')) flaws.push('untested');
    return flaws.length ? flaws.join(', ') : 'No major issues visible; see photos';
}

function renderQuickFacts(item) {
    const facts = [
        ['Status', getProductStatus(item).label],
        ['Condition', getProductConditionSummary(item)],
        ['Tested', getProductTestedSummary(item)],
        ['Included', getIncludedSummary(item)],
        ['Known notes', getKnownFlawsSummary(item)],
        ['Pickup', 'Cypress, CA local pickup']
    ];

    return `
        <div class="quick-facts-header">
            <i class="fa-solid fa-clipboard-check"></i>
            <span>Quick Facts</span>
        </div>
        <dl>
            ${facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}
        </dl>
    `;
}

function isRecentlyAdded(item) {
    return getRecentlyAddedIds().includes(item.id);
}

function hasPriceDrop(item) {
    return Number(item.oldPrice || 0) > Number(item.price || 0);
}

// --- HOLIDAY SALE HELPERS (resolved in site-settings.js, theme-independent) ---
function getHolidaySale() {
    return window.CF_HOLIDAY_SALE || { active: false };
}

function getSalePrice(price) {
    const sale = getHolidaySale();
    if (!sale.active) return Number(price);
    // Round DOWN to the nearest .50 so sale prices look intentional, never up.
    const discounted = Number(price) * (1 - sale.percentOff / 100);
    return Math.floor(discounted * 2) / 2;
}

function renderPriceHTML(item, sizeClass = 'text-xl') {
    const sale = getHolidaySale();
    if (!sale.active) {
        return `<span class="${sizeClass} font-bold text-blue-600">$${item.price.toFixed(2)}</span>`;
    }
    return `<span class="flex items-baseline gap-2 flex-wrap">
        <span class="${sizeClass} font-bold text-red-600">$${getSalePrice(item.price).toFixed(2)}</span>
        <span class="text-sm text-gray-400 line-through">$${item.price.toFixed(2)}</span>
    </span>`;
}

function renderSaleBanner() {
    const sale = getHolidaySale();
    const existing = document.getElementById('holiday-sale-banner');
    if (!sale.active) {
        existing?.remove();
        document.body.style.removeProperty('padding-top');
        return;
    }
    if (existing) return;
    const nav = document.querySelector('nav');
    if (!nav) return;

    // The nav is position:fixed, so the banner must be fixed too — pinned
    // directly beneath it (nav is h-16 = 4rem) — and the page content shifted
    // down by the banner's real height so nothing hides behind it.
    // The nav is position:fixed but has no explicit top — body padding (added
    // below) would push it down over the banner. Pin it to the viewport top.
    nav.style.top = '0';

    const banner = document.createElement('div');
    banner.id = 'holiday-sale-banner';
    banner.className = 'fixed w-full z-40 bg-red-600 text-white text-center text-xs sm:text-sm font-bold py-2 px-4 shadow-md';
    banner.style.top = '4rem';
    banner.innerHTML = `🎉 ${sale.label}: ${sale.percentOff}% off everything — prices shown already include it.`;
    document.body.appendChild(banner);

    const syncOffset = () => {
        document.body.style.paddingTop = `${banner.offsetHeight}px`;
    };
    syncOffset();
    window.addEventListener('resize', syncOffset);
}

function trackEvent(name, detail = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...detail });
    if (typeof window.gtag === 'function') {
        window.gtag('event', name, detail);
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.info('[Cypress Flips event]', name, detail);
    }
}

function updateProductStructuredData(item) {
    let script = document.getElementById('product-jsonld');
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'product-jsonld';
        document.head.appendChild(script);
    }

    const status = getProductStatus(item).value === 'sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock';
    script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: item.title,
        image: item.images,
        description: stripHTML(item.shortDesc || item.fullDesc),
        category: item.category,
        offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'USD',
            availability: status,
            itemCondition: 'https://schema.org/UsedCondition',
            areaServed: 'Cypress, CA'
        }
    });
}

function updateLocalBusinessStructuredData() {
    let script = document.getElementById('local-business-jsonld');
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'local-business-jsonld';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Cypress Flips',
        description: 'Cypress, CA resale shop focused on inspected video games, collectibles, plush, figures, TCG cards, motorcycle accessories, and local inventory liquidation.',
        areaServed: ['Cypress, CA', 'Orange County, CA', 'Los Angeles, CA'],
        url: window.location.origin || 'https://cypressflips.com',
        sameAs: [
            'https://www.facebook.com/mjmorrisonusa',
            'https://www.instagram.com/mjmorrisonusa/',
            'https://www.ebay.com/usr/mjmorrisonusa'
        ]
    });
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    if (!categoryFilter) return;

    const categories = [...new Set(getAvailableInventoryItems().map(item => item.category))].sort();
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function createProductCard(item, tierLabel = '') {
    const card = document.createElement('div');
    const tierBadge = tierLabel ? `<span class="absolute top-3 right-3 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">${tierLabel}</span>` : '';
    const status = getProductStatus(item);
    const valueLine = getBestFor(item);
    const badgeHTML = renderBadgeHTML(item, 'product-badge--small');
    const recentBadge = isRecentlyAdded(item) ? '<span class="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>' : '';
    const priceDropBadge = hasPriceDrop(item) ? '<span class="absolute top-11 right-3 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">PRICE DROP</span>' : '';
    const saleBadge = getHolidaySale().active && status.value === 'available'
        ? `<span class="absolute bottom-3 right-3 bg-red-600 text-white text-xs font-extrabold px-2 py-1 rounded shadow-sm">${getHolidaySale().percentOff}% OFF</span>` : '';
    card.className = `product-card reveal bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer status-${status.value}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details for ${item.title}`);
    card.onclick = () => openProduct(item.id);
    card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProduct(item.id);
        }
    });
    card.innerHTML = `
        <div class="aspect-square bg-gray-200 relative flex items-center justify-center overflow-hidden">
            <img src="${item.images[0]}" alt="${item.title}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition duration-300" onerror="this.src='images/placeholder-product.jpg'">
            ${item.isPremium ? '<span class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">PREMIUM</span>' : ''}
            ${tierBadge || recentBadge}
            ${tierBadge ? recentBadge : ''}
            ${priceDropBadge}
            ${saleBadge}
            <span class="status-badge absolute bottom-3 left-3 bg-white/90 text-slate-900 text-xs font-extrabold px-2 py-1 rounded-full shadow-sm">${status.label}</span>
        </div>
        <div class="p-5">
            <div class="text-xs font-bold text-blue-500 uppercase mb-1">${item.category}</div>
            <h3 class="font-bold text-lg mb-1">${item.title}</h3>
            <p class="product-value-line"><i class="fa-solid fa-bullseye mr-1"></i>${valueLine}</p>
            <p class="text-gray-500 text-sm mb-3">${item.shortDesc}</p>
            <div class="product-card-badges mb-4">${badgeHTML}</div>
            <div class="flex justify-between items-center gap-3">
                ${renderPriceHTML(item, 'text-xl')}
                <button type="button" class="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-slate-700 transition">View Details</button>
            </div>
        </div>
    `;
    return card;
}

let selectedPremiumPicks = null;
let currentProduct = null;
let showEntireInventory = false;

function pickRandom(items) {
    if (!items.length) return null;
    return items[Math.floor(Math.random() * items.length)];
}

function getClosestByPrice(items, targetPrice) {
    if (!items.length) return null;
    return [...items].sort((a, b) => Math.abs(a.price - targetPrice) - Math.abs(b.price - targetPrice))[0];
}

function getFeaturedPremiumPicks() {
    if (selectedPremiumPicks) return selectedPremiumPicks;

    const premiumItems = inventory
        .filter(item => item.isPremium && isAvailableForInventory(item))
        .map(item => ({ ...item }))
        .sort((a, b) => a.price - b.price);

    if (premiumItems.length <= 3) {
        const sorted = [...premiumItems].sort((a, b) => a.price - b.price);
        const labels = sorted.length === 1
            ? ['HIGHEST PICK']
            : sorted.length === 2
                ? ['LOW-PRICE PICK', 'HIGHEST PICK']
                : ['LOW-PRICE PICK', 'MID-TIER PICK', 'HIGHEST PICK'];

        selectedPremiumPicks = sorted.map((item, index) => ({ item, label: labels[index] || 'PREMIUM PICK' }));
        return selectedPremiumPicks;
    }

    const lowestPrice = premiumItems[0].price;
    const highestItem = premiumItems[premiumItems.length - 1];
    const highestPrice = highestItem.price;
    const priceSpread = highestPrice - lowestPrice;
    const usedIds = new Set([highestItem.id]);

    // Mid tier: aim for the midpoint between the lowest and highest premium prices.
    // Use a flexible window: at least $50 on either side, or 25% of the midpoint if that is larger.
    const midTarget = (lowestPrice + highestPrice) / 2;
    const midWindow = Math.max(50, midTarget * 0.25);
    const midMin = midTarget - midWindow;
    const midMax = midTarget + midWindow;
    const midCandidates = premiumItems.filter(item =>
        !usedIds.has(item.id) && item.price >= midMin && item.price <= midMax
    );
    const midItem = pickRandom(midCandidates) || getClosestByPrice(
        premiumItems.filter(item => !usedIds.has(item.id)),
        midTarget
    );
    if (midItem) usedIds.add(midItem.id);

    // Low tier: randomly pick from the low end, capped by the lowest 35% of the premium price spread
    // and by 2x the lowest premium price, while staying below the selected mid-tier item when possible.
    const lowUpperBySpread = lowestPrice + (priceSpread * 0.35);
    const lowUpperByLowest = lowestPrice * 2;
    const lowUpperByMid = midItem ? Math.max(lowestPrice, midItem.price - 0.01) : midTarget - 0.01;
    const lowMax = Math.min(lowUpperBySpread, lowUpperByLowest, lowUpperByMid);
    const lowCandidates = premiumItems.filter(item =>
        !usedIds.has(item.id) && item.price <= lowMax
    );
    const lowItem = pickRandom(lowCandidates) || premiumItems.find(item => !usedIds.has(item.id));
    if (lowItem) usedIds.add(lowItem.id);

    const picks = [];
    if (lowItem) picks.push({ item: lowItem, label: 'LOW-PRICE PICK' });
    if (midItem) picks.push({ item: midItem, label: 'MID-TIER PICK' });
    picks.push({ item: highestItem, label: 'HIGHEST PICK' });

    // Safety fill in case inventory size/duplicate pricing creates fewer than 3 unique picks.
    premiumItems.forEach(item => {
        if (picks.length < 3 && !picks.some(pick => pick.item.id === item.id)) {
            picks.push({ item, label: 'PREMIUM PICK' });
        }
    });

    selectedPremiumPicks = picks.slice(0, 3);
    return selectedPremiumPicks;
}

function renderPremiumInventory() {
    const premiumGrid = document.getElementById('premium-grid');
    if (!premiumGrid) return;

    const premiumPicks = getFeaturedPremiumPicks();
    premiumGrid.innerHTML = '';

    if (premiumPicks.length === 0) {
        premiumGrid.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center col-span-full">
                <p class="text-gray-500">Premium picks will be featured here soon.</p>
            </div>
        `;
        return;
    }

    premiumPicks.forEach(({ item, label }) => {
        const card = createProductCard(item, label);
        card.classList.add('premium-pick-card');

        if (label.includes('LOW')) card.classList.add('premium-pick-card--low');
        if (label.includes('MID')) card.classList.add('premium-pick-card--mid');
        if (label.includes('HIGHEST')) card.classList.add('premium-pick-card--high');

        premiumGrid.appendChild(card);
    });

    observeRevealElements(premiumGrid);
    centerMidPremiumPickOnMobile();
}

function centerMidPremiumPickOnMobile() {
    const premiumGrid = document.getElementById('premium-grid');
    const midPick = premiumGrid?.querySelector('.premium-pick-card--mid');
    if (!premiumGrid || !midPick || !window.matchMedia('(max-width: 639px)').matches) return;

    requestAnimationFrame(() => {
        const targetLeft = midPick.offsetLeft - ((premiumGrid.clientWidth - midPick.clientWidth) / 2);
        premiumGrid.scrollTo({ left: Math.max(targetLeft, 0), behavior: 'smooth' });
    });
}

function getFilterState() {
    return {
        query: (document.getElementById('inventory-search')?.value || '').trim().toLowerCase(),
        category: document.getElementById('category-filter')?.value || 'all',
        price: document.getElementById('price-filter')?.value || 'all',
        sort: document.getElementById('sort-filter')?.value || 'featured',
        showAll: showEntireInventory || document.getElementById('show-all-toggle')?.checked || false
    };
}

function matchesPriceRange(item, range) {
    if (range === 'all') return true;
    if (range === '200-plus') return item.price >= 200;

    const [min, max] = range.split('-').map(Number);
    if (Number.isNaN(min) || Number.isNaN(max)) return true;
    return item.price >= min && item.price <= max;
}

function hasFilteringCriteria(state) {
    return Boolean(state.query) || state.category !== 'all' || state.price !== 'all';
}

function shouldShowFullInventory(state) {
    return state.showAll || hasFilteringCriteria(state);
}

function getFilteredInventory() {
    const state = getFilterState();

    let items = inventory
        .map((item, index) => ({ ...item, originalIndex: index }))
        .filter(isAvailableForInventory)
        .filter(item => {
            const searchableText = [
                item.title,
                item.category,
                item.shortDesc,
                stripHTML(item.fullDesc),
                `$${item.price.toFixed(2)}`
            ].join(' ').toLowerCase();

            const matchesSearch = !state.query || searchableText.includes(state.query);
            const matchesCategory = state.category === 'all' || item.category === state.category;
            const matchesPrice = matchesPriceRange(item, state.price);

            return matchesSearch && matchesCategory && matchesPrice;
        });

    switch (state.sort) {
        case 'price-asc':
            items.sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
            break;
        case 'price-desc':
            items.sort((a, b) => b.price - a.price || a.title.localeCompare(b.title));
            break;
        case 'title-asc':
            items.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            items.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'category-asc':
            items.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
            break;
        case 'premium-first':
        case 'featured':
        default:
            items.sort((a, b) => Number(b.isPremium) - Number(a.isPremium) || a.originalIndex - b.originalIndex);
            break;
    }

    return { items, state };
}


let listingsMode = 'all';
let selectedCategoryPageCategory = null;
let listingsPage = 1;
let categoryPage = 1;

function sortInventoryItems(items, sort = 'featured') {
    const sorted = [...items];
    switch (sort) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price || a.title.localeCompare(b.title));
            break;
        case 'title-asc':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            sorted.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'category-asc':
            sorted.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
            break;
        case 'premium-first':
        case 'featured':
        default:
            sorted.sort((a, b) => Number(b.isPremium) - Number(a.isPremium) || (a.originalIndex ?? 0) - (b.originalIndex ?? 0));
            break;
    }
    return sorted;
}

function itemMatchesQuery(item, query) {
    if (!query) return true;
    const searchableText = [
        item.title,
        item.category,
        item.shortDesc,
        stripHTML(item.fullDesc),
        `$${item.price.toFixed(2)}`
    ].join(' ').toLowerCase();
    return searchableText.includes(query.toLowerCase());
}

function populateListingsCategoryFilter() {
    const categoryFilter = document.getElementById('listings-category-filter');
    if (!categoryFilter) return;

    const currentValue = categoryFilter.value || 'all';
    const categories = [...new Set(getAvailableInventoryItems().map(item => item.category))].sort();
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    categoryFilter.value = categories.includes(currentValue) ? currentValue : 'all';
}

function getListingsFilterState() {
    return {
        query: (document.getElementById('listings-search')?.value || '').trim().toLowerCase(),
        category: document.getElementById('listings-category-filter')?.value || 'all',
        price: document.getElementById('listings-price-filter')?.value || 'all',
        sort: document.getElementById('listings-sort-filter')?.value || 'featured'
    };
}

function getListingsItems() {
    const state = getListingsFilterState();
    let items = inventory
        .map((item, index) => ({ ...item, originalIndex: index }))
        .filter(isAvailableForInventory)
        .filter(item => listingsMode !== 'premium' || item.isPremium)
        .filter(item => itemMatchesQuery(item, state.query))
        .filter(item => state.category === 'all' || item.category === state.category)
        .filter(item => matchesPriceRange(item, state.price));

    return { items: sortInventoryItems(items, state.sort), state };
}

function openListingsPage(options = {}) {
    listingsMode = options.mode || 'all';
    listingsPage = 1;
    populateListingsCategoryFilter();

    const categoryFilter = document.getElementById('listings-category-filter');
    const search = document.getElementById('listings-search');
    const price = document.getElementById('listings-price-filter');
    const sort = document.getElementById('listings-sort-filter');

    if (search) search.value = '';
    if (price) price.value = 'all';
    if (sort) sort.value = listingsMode === 'premium' ? 'price-desc' : 'featured';
    if (categoryFilter) categoryFilter.value = options.category || 'all';

    showView('listings');
    renderListingsPage();
}

function clearListingsFilters() {
    const search = document.getElementById('listings-search');
    const category = document.getElementById('listings-category-filter');
    const price = document.getElementById('listings-price-filter');
    const sort = document.getElementById('listings-sort-filter');

    if (search) search.value = '';
    if (category) category.value = 'all';
    if (price) price.value = 'all';
    if (sort) sort.value = listingsMode === 'premium' ? 'price-desc' : 'featured';
    listingsPage = 1;
    renderListingsPage();
}

function applyGridPreference(grid, preference = 'comfortable') {
    if (!grid) return;
    grid.classList.remove('product-grid--compact', 'product-grid--spacious', 'product-grid--comfortable');
    grid.classList.add(`product-grid--${preference || 'comfortable'}`);
}

function getGridColumnCount(grid) {
    if (!grid) return window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const templateColumns = window.getComputedStyle(grid).gridTemplateColumns;
    const columns = templateColumns.split(' ').filter(Boolean).length;
    return columns || 1;
}

function getAutoPageSize(grid) {
    const columns = getGridColumnCount(grid);
    if (columns <= 1) return 10;
    if (columns === 2) return 14;
    if (columns === 3) return 15;
    if (columns === 4) return 16;
    return columns * 4;
}

function getSelectedPageSize(selectId, grid) {
    const value = document.getElementById(selectId)?.value || 'auto';
    if (value === 'auto') return getAutoPageSize(grid);
    return Number(value) || getAutoPageSize(grid);
}

function renderPagination(containerId, totalItems, pageSize, currentPage, onPageChange) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    const pageButtons = [];
    const addPageButton = page => {
        pageButtons.push(`<button type="button" class="pagination-page ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`);
    };

    if (totalPages <= 7) {
        for (let page = 1; page <= totalPages; page += 1) addPageButton(page);
    } else {
        addPageButton(1);
        if (currentPage > 4) pageButtons.push('<span class="pagination-ellipsis">…</span>');
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let page = start; page <= end; page += 1) addPageButton(page);
        if (currentPage < totalPages - 3) pageButtons.push('<span class="pagination-ellipsis">…</span>');
        addPageButton(totalPages);
    }

    container.innerHTML = `
        <button type="button" class="pagination-nav" data-page="${Math.max(1, currentPage - 1)}" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
        <div class="pagination-pages">${pageButtons.join('')}</div>
        <button type="button" class="pagination-nav" data-page="${Math.min(totalPages, currentPage + 1)}" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;

    container.querySelectorAll('[data-page]').forEach(button => {
        button.addEventListener('click', () => onPageChange(Number(button.dataset.page)));
    });
}

function getPageItems(items, page, pageSize) {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;
    return {
        pageItems: items.slice(start, start + pageSize),
        safePage,
        totalPages,
        start,
        end: Math.min(start + pageSize, items.length)
    };
}

function renderListingsPage() {
    const grid = document.getElementById('listings-grid');
    if (!grid) return;

    const title = document.getElementById('listings-title');
    const subtitle = document.getElementById('listings-subtitle');
    const kicker = document.getElementById('listings-kicker');
    const results = document.getElementById('listings-results');
    const gridSize = document.getElementById('listings-grid-size')?.value || 'comfortable';
    applyGridPreference(grid, gridSize);

    const { items, state } = getListingsItems();
    const pageSize = getSelectedPageSize('listings-page-size', grid);
    const pageData = getPageItems(items, listingsPage, pageSize);
    listingsPage = pageData.safePage;

    if (listingsMode === 'premium') {
        if (kicker) kicker.textContent = 'Premium Cypress, CA Offers';
        if (title) title.textContent = 'Premium Picks';
        if (subtitle) subtitle.textContent = 'All premium listings in one place, with sorting and filters so you can compare the best current offers.';
    } else {
        if (kicker) kicker.textContent = 'Cypress, CA Inventory';
        if (title) title.textContent = state.category !== 'all' ? `${state.category} Listings` : 'Current Listings';
        if (subtitle) subtitle.textContent = 'Browse every inspected item currently available from Cypress Flips.';
    }

    grid.innerHTML = '';
    if (results) {
        const productWord = items.length === 1 ? 'product' : 'products';
        results.textContent = items.length
            ? `Showing ${pageData.start + 1}-${pageData.end} of ${items.length} ${productWord}`
            : `Showing 0 ${productWord}`;
    }

    if (!items.length) {
        document.getElementById('listings-pagination').innerHTML = '';
        grid.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center col-span-full">
                <i class="fa-solid fa-magnifying-glass text-gray-400 text-4xl mb-4"></i>
                <h3 class="text-xl font-bold text-slate-900 mb-2">No listings found</h3>
                <p class="text-gray-500 mb-4">Try clearing filters or checking another category.</p>
                <button onclick="clearListingsFilters()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition">Clear Filters</button>
            </div>
        `;
        return;
    }

    pageData.pageItems.forEach(item => grid.appendChild(createProductCard(item)));
    renderPagination('listings-pagination', items.length, pageSize, listingsPage, page => {
        listingsPage = page;
        renderListingsPage();
        document.getElementById('listings-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    observeRevealElements(grid);
}

function getCategoryStats() {
    const availableItems = getAvailableInventoryItems();
    return [...new Set(availableItems.map(item => item.category))]
        .sort()
        .map(category => {
            const items = availableItems.filter(item => item.category === category);
            return {
                category,
                count: items.length,
                premiumCount: items.filter(item => item.isPremium).length,
                minPrice: Math.min(...items.map(item => item.price)),
                image: items[0]?.images?.[0] || ''
            };
        });
}

function openCategoriesPage() {
    selectedCategoryPageCategory = null;
    showView('categories');
    renderCategoriesPage();
}

function showCategoryProducts(category) {
    selectedCategoryPageCategory = category;
    categoryPage = 1;
    document.getElementById('category-products-section')?.classList.remove('hidden');
    renderCategoryProducts();
    document.getElementById('category-products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Recently added = newest items by inventory order (admin inserts new
// listings at the top of data/inventory.json), no hardcoded list to maintain.
const RECENTLY_ADDED_COUNT = 4;

function getRecentlyAddedIds() {
    return getAvailableInventoryItems().slice(0, RECENTLY_ADDED_COUNT).map(item => item.id);
}

function getRecentlyAddedItems(limitCount = RECENTLY_ADDED_COUNT) {
    return getAvailableInventoryItems().slice(0, limitCount);
}

function renderRecentlyAdded() {
    const grid = document.getElementById('recently-added-grid');
    if (!grid) return;
    grid.innerHTML = '';
    getRecentlyAddedItems(4).forEach(item => grid.appendChild(createProductCard(item)));
    observeRevealElements(grid);
}

function renderCategoriesPage() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;

    grid.innerHTML = '';
    getCategoryStats().forEach(stat => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'category-card reveal bg-white border border-gray-200 rounded-2xl p-5 text-left shadow-sm transition';
        card.innerHTML = `
            <div class="aspect-[4/3] rounded-xl bg-gray-100 overflow-hidden mb-4">
                <img src="${stat.image}" alt="${stat.category}" loading="lazy" decoding="async" class="w-full h-full object-cover">
            </div>
            <div class="text-blue-600 font-bold uppercase text-xs tracking-wider mb-1">${stat.count} ${stat.count === 1 ? 'item' : 'items'}</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">${stat.category}</h3>
            <p class="text-gray-500 text-sm">Starting around $${stat.minPrice.toFixed(2)}${stat.premiumCount ? ` • ${stat.premiumCount} premium` : ''}</p>
        `;
        card.addEventListener('click', () => showCategoryProducts(stat.category));
        grid.appendChild(card);
    });
    observeRevealElements(grid);

    if (!selectedCategoryPageCategory) {
        document.getElementById('category-products-section')?.classList.add('hidden');
    } else {
        renderCategoryProducts();
    }
}

function renderCategoryProducts() {
    const grid = document.getElementById('category-products-grid');
    if (!grid || !selectedCategoryPageCategory) return;

    const sort = document.getElementById('category-products-sort')?.value || 'featured';
    const gridSize = document.getElementById('category-grid-size')?.value || 'comfortable';
    applyGridPreference(grid, gridSize);

    const items = sortInventoryItems(
        inventory
            .map((item, index) => ({ ...item, originalIndex: index }))
            .filter(isAvailableForInventory)
            .filter(item => item.category === selectedCategoryPageCategory),
        sort
    );

    const pageSize = getSelectedPageSize('category-page-size', grid);
    const pageData = getPageItems(items, categoryPage, pageSize);
    categoryPage = pageData.safePage;

    const title = document.getElementById('category-products-title');
    const count = document.getElementById('category-products-count');
    if (title) title.textContent = selectedCategoryPageCategory;
    if (count) {
        count.textContent = items.length
            ? `Showing ${pageData.start + 1}-${pageData.end} of ${items.length} ${items.length === 1 ? 'product' : 'products'}`
            : 'No products available';
    }

    grid.innerHTML = '';
    pageData.pageItems.forEach(item => grid.appendChild(createProductCard(item)));
    renderPagination('category-products-pagination', items.length, pageSize, categoryPage, page => {
        categoryPage = page;
        renderCategoryProducts();
        document.getElementById('category-products-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    observeRevealElements(grid);
}

function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    const resultsLabel = document.getElementById('inventory-results');
    if (!grid) return;

    updateInventoryModeUI();

    // SIMPLE MODE: small inventory — one browsable grid, category chips, no hidden items.
    if (isSimpleMode()) {
        const availableItems = getAvailableInventoryItems();
        const items = simpleModeCategory === 'all'
            ? availableItems
            : availableItems.filter(item => item.category === simpleModeCategory);

        grid.innerHTML = '';
        if (resultsLabel) {
            resultsLabel.textContent = `${items.length} item${items.length === 1 ? '' : 's'}${simpleModeCategory === 'all' ? '' : ` in ${simpleModeCategory}`}`;
        }

        if (items.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center col-span-full';
            emptyState.innerHTML = `
                <h3 class="text-xl font-bold text-slate-900 mb-2">Nothing in this category right now</h3>
                <p class="text-gray-500">New finds are added often — check back soon.</p>
            `;
            grid.appendChild(emptyState);
            return;
        }

        items.forEach(item => grid.appendChild(createProductCard(item)));
        observeRevealElements(grid);
        return;
    }

    const { items, state } = getFilteredInventory();
    const premiumIdsAlreadyDisplayed = new Set(
        getFeaturedPremiumPicks().map(pick => pick.item.id)
    );
    const additionalItems = items.filter(item => !premiumIdsAlreadyDisplayed.has(item.id));
    const premiumCount = premiumIdsAlreadyDisplayed.size;
    grid.innerHTML = '';

    if (!shouldShowFullInventory(state)) {
        if (resultsLabel) {
            resultsLabel.textContent = 'Premium picks are displayed above. Turn on full inventory to browse everything else.';
        }

        const prompt = document.createElement('div');
        prompt.className = 'bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center col-span-full';
        prompt.innerHTML = `
            <h3 class="text-xl font-bold text-slate-900 mb-2">Full inventory is hidden</h3>
            <p class="text-gray-500 mb-4">Premium picks are shown first. Use search/filters above or turn on “Display entire inventory” to view the remaining listings without duplicates.</p>
            <button onclick="toggleEntireInventory(true)" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition">Display Entire Inventory</button>
        `;
        grid.appendChild(prompt);
        return;
    }

    if (items.length === 0) {
        if (resultsLabel) resultsLabel.textContent = 'No matching products found';

        const emptyState = document.createElement('div');
        emptyState.className = 'bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center col-span-full';
        emptyState.innerHTML = `
            <i class="fa-solid fa-magnifying-glass text-gray-400 text-4xl mb-4"></i>
            <h3 class="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p class="text-gray-500 mb-4">Try a different search term, category, price range, or sort option.</p>
            <button onclick="clearInventoryFilters()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition">Clear Filters</button>
        `;
        grid.appendChild(emptyState);
        return;
    }

    if (resultsLabel) {
        const additionalWord = additionalItems.length === 1 ? 'additional product' : 'additional products';
        if (hasFilteringCriteria(state)) {
            resultsLabel.textContent = `Showing ${additionalItems.length} matching ${additionalWord} below. Premium matches are already shown above.`;
        } else {
            resultsLabel.textContent = `Showing ${additionalItems.length} additional products below. ${premiumCount} premium picks are already shown above.`;
        }
    }

    if (additionalItems.length === 0) {
        const alreadyShownState = document.createElement('div');
        alreadyShownState.className = 'bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center col-span-full';
        alreadyShownState.innerHTML = `
            <i class="fa-solid fa-check-circle text-blue-500 text-4xl mb-4"></i>
            <h3 class="text-xl font-bold text-slate-900 mb-2">No duplicate listings</h3>
            <p class="text-gray-500 mb-4">Everything matching this view is already displayed in the Premium Picks section above.</p>
            <button onclick="clearInventoryFilters()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition">Clear Filters</button>
        `;
        grid.appendChild(alreadyShownState);
        return;
    }

    additionalItems.forEach(item => grid.appendChild(createProductCard(item)));
    observeRevealElements(grid);

}

function toggleEntireInventory(forceValue) {
    const toggle = document.getElementById('show-all-toggle');
    showEntireInventory = typeof forceValue === 'boolean' ? forceValue : !showEntireInventory;
    if (toggle) toggle.checked = showEntireInventory;
    renderInventory();
}

function clearInventoryFilters() {
    const search = document.getElementById('inventory-search');
    const category = document.getElementById('category-filter');
    const price = document.getElementById('price-filter');
    const sort = document.getElementById('sort-filter');
    const toggle = document.getElementById('show-all-toggle');

    if (search) search.value = '';
    if (category) category.value = 'all';
    if (price) price.value = 'all';
    if (sort) sort.value = 'featured';
    showEntireInventory = false;
    if (toggle) toggle.checked = false;

    renderInventory();
}

function setupInventoryControls() {
    populateCategoryFilter();
    populateListingsCategoryFilter();

    ['inventory-search', 'category-filter', 'price-filter', 'sort-filter', 'show-all-toggle'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener('input', renderInventory);
        if (element) element.addEventListener('change', renderInventory);
    });

    ['listings-search', 'listings-category-filter', 'listings-price-filter', 'listings-sort-filter', 'listings-grid-size', 'listings-page-size'].forEach(id => {
        const element = document.getElementById(id);
        const handler = () => {
            listingsPage = 1;
            renderListingsPage();
        };
        if (element) element.addEventListener('input', handler);
        if (element) element.addEventListener('change', handler);
    });

    const clearButton = document.getElementById('clear-filters');
    if (clearButton) clearButton.addEventListener('click', clearInventoryFilters);

    const listingsClearButton = document.getElementById('listings-clear-filters');
    if (listingsClearButton) listingsClearButton.addEventListener('click', clearListingsFilters);

    ['category-products-sort', 'category-grid-size', 'category-page-size'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener('change', () => {
            categoryPage = 1;
            renderCategoryProducts();
        });
    });

    const categoryClear = document.getElementById('category-products-clear');
    if (categoryClear) categoryClear.addEventListener('click', () => {
        selectedCategoryPageCategory = null;
        categoryPage = 1;
        document.getElementById('category-products-section')?.classList.add('hidden');
        document.getElementById('categories-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// --- PRODUCT DETAIL LOGIC ---
function setProductInquiryDetails(item, options = {}) {
    const { resetForm = true, hidePanel = true } = options;
    const subject = document.getElementById('product-inquiry-subject');
    const titleField = document.getElementById('inquiry-product-title');
    const idField = document.getElementById('inquiry-product-id');
    const categoryField = document.getElementById('inquiry-product-category');
    const priceField = document.getElementById('inquiry-product-price');
    const panel = document.getElementById('product-inquiry-panel');
    const form = document.getElementById('product-inquiry-form');
    const status = document.getElementById('product-inquiry-status');
    const intentField = document.getElementById('product-inquiry-intent');

    if (resetForm && form) form.reset();
    if (hidePanel && panel) panel.classList.add('hidden');
    if (hidePanel) document.querySelector('.product-cta-block')?.classList.remove('inquiry-open');
    if (hidePanel && status) status.classList.add('hidden');

    const inquiryPrice = getHolidaySale().active ? getSalePrice(item.price) : item.price;
    if (subject) subject.value = `Product Inquiry: ${item.title} - $${inquiryPrice.toFixed(2)}${getHolidaySale().active ? ` (${getHolidaySale().label})` : ''}`;
    if (titleField) titleField.value = item.title;
    if (idField) idField.value = item.id;
    if (categoryField) categoryField.value = item.category;
    if (priceField) priceField.value = `$${inquiryPrice.toFixed(2)}`;
    if (intentField) intentField.value = 'Question';
}

function showProductInquiryForm(intent = 'question') {
    const panel = document.getElementById('product-inquiry-panel');
    const message = document.getElementById('inquiry-message');
    const heading = document.getElementById('product-inquiry-heading');
    const intentField = document.getElementById('product-inquiry-intent');
    if (!panel) return;

    const isReserve = intent === 'reserve';
    if (heading) heading.textContent = isReserve ? 'Reserve / ask to buy this item' : 'Ask about this item';
    if (intentField) intentField.value = isReserve ? 'Reserve / Ask to Buy' : 'Question';
    if (message && !message.value) {
        message.placeholder = isReserve
            ? 'I would like to buy or reserve this item. My preferred meetup area/time is...'
            : 'Ask about availability, condition, pickup, bundle options, etc.';
    }

    trackEvent(isReserve ? 'reserve_intent_opened' : 'product_question_opened', { productId: currentProduct?.id, productTitle: currentProduct?.title });
    document.querySelector('.product-cta-block')?.classList.add('inquiry-open');
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => message?.focus(), 250);
}

function getProductShareUrl(item = currentProduct) {
    if (!item) return window.location.href;
    return `${window.location.origin}/products/${encodeURIComponent(item.id)}.html`;
}

async function shareCurrentProduct() {
    if (!currentProduct) return;
    const url = getProductShareUrl(currentProduct);
    const title = currentProduct.title;
    const text = `${title} - $${currentProduct.price.toFixed(2)} from Cypress Flips`;
    const button = document.getElementById('share-product-button');
    const original = button?.innerHTML;

    try {
        if (navigator.share) {
            await navigator.share({ title, text, url });
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(url);
            if (button) button.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Copied';
            setTimeout(() => { if (button && original) button.innerHTML = original; }, 1600);
        }
        trackEvent('product_shared', { productId: currentProduct.id, productTitle: currentProduct.title });
    } catch (error) {
        console.warn('Share cancelled or failed:', error);
    }
}

function calculateDisplayDeposit(price) {
    const productPrice = Number(price || 0);
    const rate = productPrice >= 500 ? 0.05 : productPrice > 250 ? 0.075 : 0.10;
    return Math.max(10, Math.ceil(productPrice * rate));
}

function depositsEnabled() {
    return Boolean(window.CF_SITE_SETTINGS?.enableDeposits);
}

function updateDepositButton(item) {
    const button = document.getElementById('checkout-deposit-button');
    const note = document.querySelector('.deposit-policy-note');
    if (!button) return;

    // Deposits are gated by CF_SITE_SETTINGS.enableDeposits (Stripe checkout
    // needs the Netlify function, which GitHub Pages doesn't run).
    if (!depositsEnabled()) {
        button.classList.add('hidden');
        note?.classList.add('hidden');
        return;
    }

    button.classList.remove('hidden');
    note?.classList.remove('hidden');
    if (!item) return;
    const deposit = calculateDisplayDeposit(item.price);
    button.innerHTML = `<i class="fa-solid fa-credit-card mr-2"></i>$${deposit} Deposit`;
}

function showDepositStatus(type, messageHTML) {
    const status = document.getElementById('checkout-deposit-status');
    if (!status) return;
    const styles = {
        loading: 'bg-blue-50 text-blue-700 border border-blue-200',
        success: 'bg-green-50 text-green-700 border border-green-200',
        error: 'bg-orange-50 text-orange-800 border border-orange-200'
    };
    status.className = `mt-4 rounded-xl p-4 text-sm font-medium ${styles[type] || styles.loading}`;
    status.innerHTML = messageHTML;
    status.classList.remove('hidden');
}

async function startDepositCheckout() {
    if (!depositsEnabled() || !currentProduct) return;
    const button = document.getElementById('checkout-deposit-button');
    const original = button?.innerHTML;

    try {
        if (button) {
            button.disabled = true;
            button.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Starting...';
        }
        showDepositStatus('loading', '<i class="fa-solid fa-credit-card mr-2"></i>Starting secure deposit checkout...');
        trackEvent('deposit_checkout_started', { productId: currentProduct.id, productTitle: currentProduct.title, price: currentProduct.price });

        const response = await fetch('/.netlify/functions/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productId: currentProduct.id,
                productTitle: currentProduct.title,
                productPrice: currentProduct.price
            })
        });
        const result = await response.json();
        if (!response.ok || !result.url) {
            throw new Error(result.error || 'Unable to start checkout.');
        }
        window.location.href = result.url;
    } catch (error) {
        showDepositStatus('error', `<i class="fa-solid fa-triangle-exclamation mr-2"></i>Deposit checkout is not available yet. ${error.message || ''} You can still use Reserve / Ask to Buy.`);
    } finally {
        if (button) {
            button.disabled = false;
            button.innerHTML = original || `<i class="fa-solid fa-credit-card mr-2"></i>$${calculateDisplayDeposit(currentProduct?.price)} Deposit`;
        }
    }
}

function openProduct(id, options = {}) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    const previousView = getCurrentVisibleView();
    if (previousView !== 'product') {
        lastProductReturn = { view: previousView, scrollY: window.scrollY };
    }

    currentProduct = item;
    window.CF_CURRENT_PRODUCT = item;

    document.getElementById('product-title').innerText = item.title;
    document.getElementById('product-category').innerText = item.category;
    const priceEl = document.getElementById('product-price');
    if (getHolidaySale().active && getProductStatus(item).value === 'available') {
        priceEl.innerHTML = `<span class="text-red-600">$${getSalePrice(item.price).toFixed(2)}</span>
            <span class="text-lg text-gray-400 line-through font-normal align-middle">$${item.price.toFixed(2)}</span>
            <span class="align-middle ml-1 bg-red-600 text-white text-xs font-extrabold px-2 py-1 rounded">${getHolidaySale().label} — ${getHolidaySale().percentOff}% OFF</span>`;
    } else {
        priceEl.innerText = `$${item.price.toFixed(2)}`;
    }
    document.getElementById('product-description').innerHTML = item.fullDesc;

    const metaBadges = document.getElementById('product-meta-badges');
    if (metaBadges) metaBadges.innerHTML = renderBadgeHTML(item);
    const bestFor = document.getElementById('product-best-for');
    if (bestFor) {
        bestFor.innerHTML = `<i class="fa-solid fa-bullseye mr-2"></i>${getBestFor(item)}`;
        bestFor.classList.remove('hidden');
    }
    const quickFacts = document.getElementById('product-quick-facts');
    if (quickFacts) {
        quickFacts.innerHTML = renderQuickFacts(item);
        quickFacts.classList.remove('hidden');
    }
    const reserveButton = document.getElementById('reserve-product-button');
    const productStatus = getProductStatus(item).value;
    if (reserveButton) {
        reserveButton.disabled = productStatus === 'sold' || productStatus === 'hidden' || productStatus === 'archived';
        reserveButton.classList.toggle('opacity-60', reserveButton.disabled);
        reserveButton.classList.toggle('cursor-not-allowed', reserveButton.disabled);
        reserveButton.textContent = productStatus === 'sold'
            ? 'Sold'
            : ['hold', 'pending', 'reserved'].includes(productStatus)
                ? 'Join Waitlist / Ask'
                : 'Reserve / Ask to Buy';
    }
    updateDepositButton(item);

    setProductInquiryDetails(item);
    updateProductStructuredData(item);
    trackEvent('product_view', { productId: item.id, productTitle: item.title, category: item.category, price: item.price });
    
    const mainImg = document.getElementById('main-product-image');
    const imageCounter = document.getElementById('product-image-counter');
    mainImg.src = item.images[0];
    mainImg.alt = item.title;
    if (imageCounter) imageCounter.textContent = `Image 1 of ${item.images.length}`;

    const thumbGrid = document.getElementById('thumbnail-grid');
    thumbGrid.innerHTML = '';
    item.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('div');
        thumb.className = `aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition ${index === 0 ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`;
        thumb.innerHTML = `<img src="${imgSrc}" alt="${item.title} image ${index + 1}" loading="lazy" decoding="async" class="w-full h-full object-cover">`;
        thumb.onclick = () => {
            mainImg.src = imgSrc;
            mainImg.alt = `${item.title} image ${index + 1}`;
            if (imageCounter) imageCounter.textContent = `Image ${index + 1} of ${item.images.length}`;
            // Update active thumbnail border
            Array.from(thumbGrid.children).forEach(child => child.classList.replace('border-blue-600', 'border-transparent'));
            thumb.classList.replace('border-transparent', 'border-blue-600');
        };
        thumbGrid.appendChild(thumb);
    });

    showView('product');
    if (options.updateHash !== false) {
        history.pushState({ view: 'product', productId: item.id }, '', `#product=${encodeURIComponent(item.id)}`);
    }
    window.dispatchEvent(new CustomEvent('cf:product-open', { detail: item }));
}

window.openProduct = openProduct;

// Theme Toggle: follows device preference unless the visitor chooses a theme
const THEME_STORAGE_KEY = 'cypress-flips-theme';
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-toggle-icon');
const themeText = document.getElementById('theme-toggle-text');
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getPreferredTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || (systemThemeQuery.matches ? 'dark' : 'light');
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (themeIcon) themeIcon.className = `fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`;
    if (themeText) themeText.textContent = isDark ? 'Light' : 'Dark';
    if (themeToggle) themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
}

function setupThemeToggle() {
    applyTheme(getPreferredTheme());
    document.body.classList.add('theme-transition');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            applyTheme(nextTheme);
        });
    }

    const handleSystemThemeChange = () => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            applyTheme(systemThemeQuery.matches ? 'dark' : 'light');
        }
    };

    if (systemThemeQuery.addEventListener) {
        systemThemeQuery.addEventListener('change', handleSystemThemeChange);
    } else if (systemThemeQuery.addListener) {
        systemThemeQuery.addListener(handleSystemThemeChange);
    }
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Contact forms: static-site email handling through FormSubmit
const form = document.getElementById('supplier-form');
const nextUrl = document.getElementById('form-next-url');
if (form && nextUrl) {
    form.addEventListener('submit', () => {
        nextUrl.value = `${window.location.origin}${window.location.pathname}#contact`;
    });
}

const productInquiryForm = document.getElementById('product-inquiry-form');
const productInquiryNextUrl = document.getElementById('product-inquiry-next-url');
const productInquiryStatus = document.getElementById('product-inquiry-status');

function restoreProductInquiryHiddenFields() {
    if (currentProduct) setProductInquiryDetails(currentProduct, { resetForm: false, hidePanel: false });
}

function showProductInquiryStatus(type, messageHTML) {
    if (!productInquiryStatus) return;

    const styles = {
        sending: 'bg-blue-50 text-blue-700 border border-blue-200',
        success: 'bg-green-50 text-green-700 border border-green-200',
        error: 'bg-orange-50 text-orange-800 border border-orange-200'
    };

    productInquiryStatus.className = `mt-4 rounded-xl p-4 text-sm font-medium ${styles[type] || styles.sending}`;
    productInquiryStatus.innerHTML = messageHTML;
    productInquiryStatus.classList.remove('hidden');
}

function buildErrorReportLink(errorMessage = 'Unknown product inquiry form error') {
    const productTitle = currentProduct?.title || document.getElementById('inquiry-product-title')?.value || 'Unknown product';
    const productPrice = currentProduct ? `$${currentProduct.price.toFixed(2)}` : document.getElementById('inquiry-product-price')?.value || 'Unknown price';
    const productId = currentProduct?.id || document.getElementById('inquiry-product-id')?.value || 'Unknown ID';
    const customerEmail = document.getElementById('inquiry-email')?.value || '';

    const subject = encodeURIComponent(`Cypress Flips inquiry form error - ${productTitle}`);
    const body = encodeURIComponent(
        `Hi, I tried to send a product inquiry but the website form failed.

` +
        `Product: ${productTitle}
` +
        `Product ID: ${productId}
` +
        `Price: ${productPrice}
` +
        `Customer email: ${customerEmail}
` +
        `Error: ${errorMessage}

` +
        `My question/message:
`
    );

    return `mailto:mjmorrisonusa@gmail.com?subject=${subject}&body=${body}`;
}

if (productInquiryForm && productInquiryNextUrl) {
    productInquiryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = productInquiryForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton?.textContent || 'Send Product Inquiry';
        const inquiryIntent = document.getElementById('product-inquiry-intent')?.value || 'Question';
        productInquiryNextUrl.value = `${window.location.origin}${window.location.pathname}#inventory`;

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.classList.add('opacity-75', 'cursor-wait');
        }

        showProductInquiryStatus('sending', '<i class="fa-solid fa-paper-plane mr-2"></i>Sending your message...');

        try {
            const response = await fetch(productInquiryForm.action, {
                method: 'POST',
                body: new FormData(productInquiryForm),
                headers: { 'Accept': 'application/json' }
            });

            let result = {};
            try { result = await response.json(); } catch (_) { result = {}; }

            if (!response.ok || result.success === false || result.success === 'false') {
                throw new Error(result.message || `Form service returned status ${response.status}`);
            }

            trackEvent('product_inquiry_sent', { intent: inquiryIntent, productId: currentProduct?.id, productTitle: currentProduct?.title });
            showProductInquiryStatus(
                'success',
                inquiryIntent.includes('Reserve')
                    ? '<i class="fa-solid fa-circle-check mr-2"></i>Reserve request received — thank you! I’ll confirm availability and pickup details as soon as possible.'
                    : '<i class="fa-solid fa-circle-check mr-2"></i>Message received — thank you! I’ll review your product inquiry and reply as soon as possible.'
            );
            productInquiryForm.reset();
            restoreProductInquiryHiddenFields();
        } catch (error) {
            const errorMessage = error?.message || 'Unable to send message.';
            const reportLink = buildErrorReportLink(errorMessage);
            showProductInquiryStatus(
                'error',
                `<i class="fa-solid fa-triangle-exclamation mr-2"></i>Your message could not be sent. Please try again, or <a class="underline font-bold" href="${reportLink}">send an error report by email</a>.`
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText.trim() || 'Send Product Inquiry';
                submitButton.classList.remove('opacity-75', 'cursor-wait');
            }
        }
    });
}


function getCaliforniaHourKey(date = new Date()) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hourCycle: 'h23'
    }).format(date);
}

function hashStringToIndex(value, length) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
        hash = ((hash << 5) - hash) + value.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % length;
}

function setupHourlyScripture() {
    const scripture = document.getElementById('hourly-scripture');
    if (!scripture) return;

    // Short Scripture-based reflections with references. Colossians 3:23 is weighted most heavily.
    const verses = [
        { ref: 'Colossians 3:23', text: 'Work with your whole heart, as service offered to the Lord.' },
        { ref: 'Colossians 3:23', text: 'Whatever the task, give it honest effort before God.' },
        { ref: 'Colossians 3:23', text: 'Do the work in front of you with diligence and integrity.' },
        { ref: 'Colossians 3:23', text: 'Let every task be done wholeheartedly, not half-heartedly.' },
        { ref: 'Proverbs 3:5-6', text: 'Trust the Lord, walk straight, and do not lean only on yourself.' },
        { ref: 'Micah 6:8', text: 'Act justly, love mercy, and walk humbly with God.' },
        { ref: 'Matthew 5:16', text: 'Let good work shine in a way that points beyond yourself.' },
        { ref: 'Luke 6:31', text: 'Treat others the way you would want to be treated.' },
        { ref: '1 Corinthians 16:14', text: 'Let everything be done with love.' },
        { ref: 'Galatians 6:9', text: 'Do not grow tired of doing good.' },
        { ref: 'James 1:5', text: 'Ask God for wisdom when the right path is unclear.' },
        { ref: 'John 14:27', text: 'Peace is a gift; do not let your heart be troubled.' },
        { ref: 'Romans 12:2', text: 'Be renewed in mind, not shaped by every passing trend.' },
        { ref: 'Psalm 37:5', text: 'Commit your way to the Lord and keep moving faithfully.' },
        { ref: 'Joshua 1:9', text: 'Be strong and courageous; the Lord is with you.' },
        { ref: 'Philippians 4:13', text: 'Strength is found through Christ who sustains us.' }
    ];

    const updateVerse = () => {
        const key = getCaliforniaHourKey();
        const index = hashStringToIndex(`cypress-flips-${key}`, verses.length);
        const verse = verses[index];
        scripture.textContent = `${verse.ref} — ${verse.text}`;
    };

    updateVerse();
    setInterval(updateVerse, 60 * 1000);
}

let paginationResizeTimer = null;
window.addEventListener('resize', () => {
    clearTimeout(paginationResizeTimer);
    paginationResizeTimer = setTimeout(() => {
        renderListingsPage();
        renderCategoryProducts();
    }, 180);
});

function showGeneralContactStatus(type, messageHTML) {
    const status = document.getElementById('general-contact-status');
    if (!status) return;
    const styles = {
        sending: 'bg-blue-50 text-blue-700 border border-blue-200',
        success: 'bg-green-50 text-green-700 border border-green-200',
        error: 'bg-orange-50 text-orange-800 border border-orange-200'
    };
    status.className = `mt-4 rounded-xl p-4 text-sm font-medium ${styles[type] || styles.sending}`;
    status.innerHTML = messageHTML;
    status.classList.remove('hidden');
}

function setupGeneralContactForm() {
    const form = document.getElementById('general-contact-form');
    if (!form || form.dataset.bound) return;
    form.dataset.bound = 'true';

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton?.textContent || 'Send Message';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.classList.add('opacity-75', 'cursor-wait');
        }
        showGeneralContactStatus('sending', '<i class="fa-solid fa-paper-plane mr-2"></i>Sending your message...');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            let result = {};
            try { result = await response.json(); } catch (_) { result = {}; }
            if (!response.ok || result.success === false || result.success === 'false') {
                throw new Error(result.message || `Form service returned status ${response.status}`);
            }
            form.reset();
            showGeneralContactStatus('success', '<i class="fa-solid fa-circle-check mr-2"></i>Message received — thank you. I’ll reply as soon as possible.');
        } catch (error) {
            const subject = encodeURIComponent('Cypress Flips customer contact form error');
            const body = encodeURIComponent(`Hi, I tried to contact Cypress Flips but the website form failed.\n\nError: ${error?.message || 'Unknown error'}\n\nMy message:\n`);
            showGeneralContactStatus('error', `<i class="fa-solid fa-triangle-exclamation mr-2"></i>Your message could not be sent. Please try again, or <a class="underline font-bold" href="mailto:mjmorrisonusa@gmail.com?subject=${subject}&body=${body}">email me directly</a>.`);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText.trim() || 'Send Message';
                submitButton.classList.remove('opacity-75', 'cursor-wait');
            }
        }
    });
}

function handleRouteFromHash() {
    const hash = window.location.hash || '';
    if (hash.startsWith('#product=')) {
        const id = decodeURIComponent(hash.replace('#product=', ''));
        if (id) openProduct(id, { updateHash: false });
    } else if (hash === '#about') {
        // Legacy SPA route — About is now a real static page.
        window.location.replace('about.html');
    } else if (hash === '#contact') {
        window.location.replace('contact.html');
    } else if (hash === '#policies') {
        window.location.replace('policies.html');
    } else if (hash === '#suppliers') {
        window.location.replace('sell.html');
    } else if (hash === '#categories') {
        openCategoriesPage();
    } else if (hash === '#listings') {
        openListingsPage({ mode: 'all' });
    }
}

window.addEventListener('popstate', handleRouteFromHash);

// Initial Setup
setupThemeToggle();
setupHeroMessage();
updateLocalBusinessStructuredData();
setupHeaderEffects();
setupBackToTop();
setupStaticNavigationListeners();
setupGeneralContactForm();
setupInventoryControls();
setupKeyboardShortcuts();
setupHourlyScripture();
setupScrollReveal();
renderSaleBanner();
loadGitHubManagedInventory();
