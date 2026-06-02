import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';

let initializeApp;
let getAuth;
let onAuthStateChanged;
let createUserWithEmailAndPassword;
let signInWithEmailAndPassword;
let signInWithPopup;
let GoogleAuthProvider;
let FacebookAuthProvider;
let signOut;
let updateProfile;
let getFirestore;
let doc;
let getDoc;
let getDocs;
let setDoc;
let deleteDoc;
let addDoc;
let updateDoc;
let collection;
let query;
let where;
let orderBy;
let limit;
let onSnapshot;
let serverTimestamp;
let increment;
let writeBatch;
let getStorage;
let ref;
let uploadBytes;
let getDownloadURL;

async function loadFirebaseSDKs() {
    const [appModule, authModule, firestoreModule, storageModule] = await Promise.all([
        import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js'),
        import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js'),
        import('https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js')
    ]);

    ({ initializeApp } = appModule);
    ({
        getAuth,
        onAuthStateChanged,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithPopup,
        GoogleAuthProvider,
        FacebookAuthProvider,
        signOut,
        updateProfile
    } = authModule);
    ({
        getFirestore,
        doc,
        getDoc,
        getDocs,
        setDoc,
        deleteDoc,
        addDoc,
        updateDoc,
        collection,
        query,
        where,
        orderBy,
        limit,
        onSnapshot,
        serverTimestamp,
        increment,
        writeBatch
    } = firestoreModule);
    ({ getStorage, ref, uploadBytes, getDownloadURL } = storageModule);
}

const CONTACT_EMAIL = 'mjmorrisonusa@gmail.com';
let app = null;
let auth = null;
let db = null;
let storage = null;
let currentUser = null;
let currentProfile = null;
let currentProduct = window.CF_CURRENT_PRODUCT || null;
let unsubscribeProductReviews = null;
let unsubscribeTestimonials = null;
let unsubscribeFavorite = null;
let unsubscribeProducts = null;
let unsubscribeInventorySettings = null;
let unsubscribeSiteSettings = null;
let remoteProductDocs = [];
let useFirestoreInventory = false;
let isCurrentProductFavorite = false;

function money(value) {
    return `$${Number(value || 0).toFixed(2)}`;
}

function escapeHTML(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function getInitials(userOrProfile = {}) {
    const name = userOrProfile.displayName || userOrProfile.name || userOrProfile.email || 'Guest';
    return name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
}

function isAdmin() {
    return currentProfile?.role === 'admin' || currentProfile?.isAdmin === true;
}

function canManageListings() {
    return isAdmin() || currentProfile?.role === 'moderator' || currentProfile?.isModerator === true;
}

function productIdSafe(product) {
    return product?.id || 'unknown-product';
}

function ensureCommunityUI() {
    const navActions = document.querySelector('nav .flex.items-center.gap-3');
    let accountButton = document.getElementById('account-button');

    if (navActions && !accountButton) {
        accountButton = document.createElement('button');
        accountButton.id = 'account-button';
        accountButton.type = 'button';
        accountButton.className = 'account-button border border-gray-200 bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2';
        accountButton.innerHTML = '<i class="fa-solid fa-user"></i><span class="hidden sm:inline">Sign In</span>';
        navActions.insertBefore(accountButton, navActions.firstChild);
    }

    if (accountButton && !accountButton.dataset.bound) {
        accountButton.dataset.bound = 'true';
        accountButton.addEventListener('click', () => currentUser ? openProfilePanel() : openAuthModal());
    }

    if (!document.getElementById('auth-modal')) {
        document.body.insertAdjacentHTML('beforeend', authModalHTML());
        bindAuthModalEvents();
    }

    if (!document.getElementById('profile-panel')) {
        document.body.insertAdjacentHTML('beforeend', profilePanelHTML());
        bindProfileEvents();
    }

    ensureProductCommunityContainers();
    ensureTestimonialsSection();
}

function authModalHTML() {
    return `
        <div id="auth-modal" class="community-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <div class="community-modal bg-white border border-gray-200 rounded-3xl shadow-2xl p-6">
                <div class="flex items-start justify-between gap-4 mb-5">
                    <div>
                        <h2 id="auth-title" class="text-2xl font-bold text-slate-900">Customer Account</h2>
                        <p class="text-gray-500 text-sm mt-1">Sign in to save favorites, comment, review, and manage your profile.</p>
                    </div>
                    <button type="button" class="community-close text-gray-500 hover:text-slate-900" data-close-auth aria-label="Close sign in modal">
                        <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>
                <div id="auth-config-warning" class="hidden mb-4 p-4 rounded-xl bg-orange-50 text-orange-800 border border-orange-200 text-sm">
                    Firebase is not configured yet. Add your Firebase web app config in <strong>js/firebase-config.js</strong> to activate real accounts.
                </div>
                <form id="auth-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="auth-name">Name <span class="text-gray-400">(signup only)</span></label>
                        <input id="auth-name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="auth-email">Email</label>
                        <input id="auth-email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="you@example.com">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="auth-password">Password</label>
                        <input id="auth-password" type="password" required minlength="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Minimum 6 characters">
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <button type="button" id="login-button" class="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition">Log In</button>
                        <button type="button" id="signup-button" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">Sign Up</button>
                    </div>
                </form>
                <div class="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-gray-400">
                    <span class="h-px bg-gray-200 flex-1"></span> or <span class="h-px bg-gray-200 flex-1"></span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button type="button" id="google-login" class="border border-gray-300 hover:bg-gray-50 rounded-lg py-3 font-bold transition"><i class="fa-brands fa-google mr-2"></i>Google</button>
                    <button type="button" id="facebook-login" class="border border-gray-300 hover:bg-gray-50 rounded-lg py-3 font-bold transition"><i class="fa-brands fa-facebook mr-2"></i>Facebook</button>
                </div>
                <div id="auth-status" class="hidden mt-4 p-3 rounded-xl text-sm font-medium"></div>
            </div>
        </div>
    `;
}

function profilePanelHTML() {
    return `
        <div id="profile-panel" class="community-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="profile-title">
            <div class="community-modal bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-auto">
                <div class="flex items-start justify-between gap-4 mb-5">
                    <div>
                        <h2 id="profile-title" class="text-2xl font-bold text-slate-900">Your Profile</h2>
                        <p class="text-gray-500 text-sm mt-1">Manage your profile, saved favorites, and public info.</p>
                    </div>
                    <button type="button" class="community-close text-gray-500 hover:text-slate-900" data-close-profile aria-label="Close profile panel">
                        <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>
                <div id="profile-summary" class="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-5"></div>
                <form id="profile-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="profile-display-name">Display name</label>
                        <input id="profile-display-name" name="displayName" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="profile-bio">Short bio</label>
                        <input id="profile-bio" name="bio" type="text" maxlength="140" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Collector, gamer, bargain hunter...">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="profile-about">About me</label>
                        <textarea id="profile-about" name="about" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tell the community a little about yourself."></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="profile-photo">Profile picture</label>
                        <input id="profile-photo" name="photo" type="file" accept="image/*" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <p class="text-xs text-gray-500 mt-1">Uploads to Firebase Storage when configured.</p>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">Save Profile</button>
                </form>
                <div id="profile-status" class="hidden mt-4 p-3 rounded-xl text-sm font-medium"></div>
                <div class="mt-8">
                    <h3 class="text-xl font-bold text-slate-900 mb-3">Favorite Products</h3>
                    <div id="favorites-list" class="space-y-3"></div>
                </div>
                <div id="admin-panel" class="hidden mt-8 p-4 rounded-2xl border border-orange-200 bg-orange-50">
                    <div class="bg-white border border-orange-100 rounded-2xl p-4 mb-6">
                        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <div>
                                <h3 class="text-xl font-bold text-slate-900 mb-1">Site Appearance</h3>
                                <p class="text-sm text-gray-600">Change the storefront color scheme for everyone. Use Auto for holiday switching.</p>
                            </div>
                            <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <select id="site-color-scheme-select" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option value="auto">Auto Holiday Theme</option>
                                    <option value="default">Default Cypress Flips</option>
                                    <option value="patriot">Patriot / Red White Blue</option>
                                    <option value="christmas">Christmas</option>
                                    <option value="halloween">Halloween</option>
                                    <option value="thanksgiving">Thanksgiving</option>
                                    <option value="newyear">New Year</option>
                                    <option value="valentines">Valentine's Day</option>
                                    <option value="stpatricks">St. Patrick's Day</option>
                                    <option value="easter">Easter</option>
                                    <option value="premium">Premium Luxury</option>
                                    <option value="blackout">Blackout</option>
                                    <option value="catholic">Catholic</option>
                                    <option value="lakers">Lakers</option>
                                    <option value="pacific">Pacific</option>
                                    <option value="rosewood">Rosewood</option>
                                </select>
                                <button type="button" id="save-site-theme-button" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition">Save Theme</button>
                            </div>
                        </div>
                        <div id="site-theme-status" class="hidden mt-4 p-3 rounded-xl text-sm font-medium"></div>
                    </div>
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                        <div>
                            <h3 class="text-xl font-bold text-slate-900 mb-1">Admin Listing Manager</h3>
                            <p class="text-sm text-gray-600">Add, edit, customize, or delete inventory listings from Firebase.</p>
                        </div>
                        <button type="button" id="sync-inventory-button" class="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition">
                            Sync Current Inventory
                        </button>
                    </div>
                    <div id="admin-listing-status" class="hidden mb-4 p-3 rounded-xl text-sm font-medium"></div>
                    <form id="admin-listing-form" class="admin-listing-form grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-orange-100 rounded-2xl p-4 mb-5">
                        <input type="hidden" id="listing-doc-id" value="">
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="listing-title">Title</label>
                            <input id="listing-title" required type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="listing-category">Category</label>
                            <input id="listing-category" required type="text" list="listing-category-options" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Video Games">
                            <datalist id="listing-category-options">
                                <option value="Action Figure"></option>
                                <option value="Plushie"></option>
                                <option value="Video Games"></option>
                                <option value="TCG Cards"></option>
                                <option value="Collectibles"></option>
                                <option value="Motorcycles"></option>
                            </datalist>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="listing-price">Price</label>
                            <input id="listing-price" required type="number" step="0.01" min="0" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="listing-short-desc">Short description</label>
                            <textarea id="listing-short-desc" required rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="listing-full-desc">Full description</label>
                            <textarea id="listing-full-desc" required rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="HTML like <br><br> is allowed."></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="listing-image-urls">Image URLs / paths</label>
                            <textarea id="listing-image-urls" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="One image path or URL per line. Example: images/video games/example.jpg"></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="listing-image-files">Upload images</label>
                            <input id="listing-image-files" type="file" accept="image/*" multiple class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <p class="text-xs text-gray-500 mt-1">Uploaded image URLs will be added to the listing.</p>
                        </div>
                        <label class="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <input id="listing-premium" type="checkbox" class="accent-blue-600">
                            Premium listing
                        </label>
                        <label class="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <input id="listing-visible" type="checkbox" class="accent-blue-600" checked>
                            Visible on site
                        </label>
                        <div class="md:col-span-2 flex flex-col sm:flex-row gap-3">
                            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">Save Listing</button>
                            <button type="button" id="reset-listing-form" class="flex-1 border border-gray-300 hover:bg-gray-50 font-bold py-3 rounded-lg transition">Clear Form</button>
                        </div>
                    </form>
                    <div>
                        <h4 class="font-bold text-slate-900 mb-3">Manage Current Listings</h4>
                        <div id="admin-products-list" class="space-y-3"></div>
                    </div>
                </div>
                <button type="button" id="logout-button" class="mt-8 w-full border border-gray-300 hover:bg-gray-50 font-bold py-3 rounded-lg transition">Log Out</button>
            </div>
        </div>
    `;
}

function ensureProductCommunityContainers() {
    const price = document.getElementById('product-price');
    if (price && !document.getElementById('product-community-actions')) {
        price.insertAdjacentHTML('afterend', `
            <div id="product-community-actions" class="my-5 flex flex-wrap items-center gap-3">
                <button id="favorite-product-button" type="button" class="favorite-button border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-5 py-3 rounded-xl font-bold transition">
                    <i class="fa-regular fa-heart mr-2"></i>Save Favorite
                </button>
                <button id="review-product-button" type="button" class="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-5 py-3 rounded-xl font-bold transition">
                    <i class="fa-regular fa-comment mr-2"></i>Review / Comment
                </button>
            </div>
        `);
    }

    const inquiryPanel = document.getElementById('product-inquiry-panel');
    if (inquiryPanel && !document.getElementById('product-community-section')) {
        inquiryPanel.insertAdjacentHTML('afterend', `
            <div id="product-community-section" class="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <div class="flex items-start justify-between gap-4 mb-5">
                    <div>
                        <h3 class="text-xl font-bold text-slate-900">Customer Reviews & Comments</h3>
                        <p class="text-gray-500 text-sm">Ask public questions, leave a rating, or help future buyers.</p>
                    </div>
                </div>
                <form id="review-form" class="hidden space-y-4 mb-6">
                    <input type="hidden" id="editing-review-id" value="">
                    <div class="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                        <p class="font-bold text-slate-900 mb-1">Comment or review?</p>
                        <p class="text-sm text-gray-500 mb-3">By default this posts as a public comment/question. Add a star rating only if you want to leave an actual review.</p>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <label class="inline-flex items-center gap-2 text-sm text-gray-600">
                                <input id="review-add-rating" type="checkbox" class="accent-blue-600">
                                Add star rating / make this a review
                            </label>
                            <label class="inline-flex items-center gap-2 text-sm text-gray-600">
                                <input id="review-testimonial" type="checkbox" class="accent-blue-600">
                                Allow this review to appear as a testimonial
                            </label>
                        </div>
                    </div>
                    <div id="review-rating-wrapper" class="hidden">
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="review-rating">Rating</label>
                        <select id="review-rating" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Select a rating</option>
                            <option value="5">★★★★★ 5 stars</option>
                            <option value="4">★★★★☆ 4 stars</option>
                            <option value="3">★★★☆☆ 3 stars</option>
                            <option value="2">★★☆☆☆ 2 stars</option>
                            <option value="1">★☆☆☆☆ 1 star</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="review-comment">Comment / question</label>
                        <textarea id="review-comment" rows="4" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ask a question, or write a real review if you add a rating."></textarea>
                    </div>
                    <div id="review-quality-helper" class="hidden review-quality-helper p-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm">
                        <p class="font-bold text-slate-900 mb-2">For rated reviews, please include enough detail to help another buyer.</p>
                        <p class="text-gray-500 mb-3">Mention at least two of these naturally in your review:</p>
                        <div id="review-quality-checks" class="grid grid-cols-1 sm:grid-cols-2 gap-2"></div>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">Post Comment</button>
                </form>
                <div id="review-status" class="hidden mb-4 p-3 rounded-xl text-sm font-medium"></div>
                <div id="reviews-list" class="space-y-4"></div>
            </div>
        `);
    }

    const favoriteButton = document.getElementById('favorite-product-button');
    if (favoriteButton && !favoriteButton.dataset.bound) {
        favoriteButton.dataset.bound = 'true';
        favoriteButton.addEventListener('click', toggleFavorite);
    }

    const reviewButton = document.getElementById('review-product-button');
    if (reviewButton && !reviewButton.dataset.bound) {
        reviewButton.dataset.bound = 'true';
        reviewButton.addEventListener('click', () => {
            if (!requireLogin('Please sign in to leave a comment or review.')) return;
            const form = document.getElementById('review-form');
            form?.classList.toggle('hidden');
            form?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    const reviewForm = document.getElementById('review-form');
    if (reviewForm && !reviewForm.dataset.bound) {
        reviewForm.dataset.bound = 'true';
        reviewForm.addEventListener('submit', submitReview);
        document.getElementById('review-add-rating')?.addEventListener('change', updateReviewMode);
        document.getElementById('review-testimonial')?.addEventListener('change', updateReviewMode);
        document.getElementById('review-rating')?.addEventListener('change', updateReviewMode);
        document.getElementById('review-comment')?.addEventListener('input', updateReviewMode);
        updateReviewMode();
    }
}

const PLACEHOLDER_TESTIMONIALS = [
    {
        rating: 5,
        comment: 'Placeholder example: “The listing made the condition clear before I drove out. That is exactly what I want when buying used electronics locally.”',
        displayName: 'Placeholder Customer',
        productTitle: 'Example inspected video game item'
    },
    {
        rating: 5,
        comment: 'Placeholder example: “Fair price, easy local meetup, and no pressure. I felt comfortable asking questions before buying.”',
        displayName: 'Placeholder Parent Buyer',
        productTitle: 'Example family console bundle'
    },
    {
        rating: 5,
        comment: 'Placeholder example: “The flaws were disclosed up front, which made the deal feel honest and straightforward.”',
        displayName: 'Placeholder Collector',
        productTitle: 'Example collectible figure'
    },
    {
        rating: 5,
        comment: 'Placeholder example: “I had inventory taking up space and wanted a simple cash offer. This is the kind of local liquidation option I needed.”',
        displayName: 'Placeholder Vendor',
        productTitle: 'Example bulk inventory lot'
    },
    {
        rating: 5,
        comment: 'Placeholder example: “Clear communication, accurate description, and a smooth Cypress-area meetup.”',
        displayName: 'Placeholder Local Buyer',
        productTitle: 'Example local pickup item'
    }
];

function ensureTestimonialsSection() {
    const suppliers = document.getElementById('suppliers');
    if (!suppliers) return;

    if (!document.getElementById('testimonials')) {
        suppliers.insertAdjacentHTML('beforebegin', `
            <section id="testimonials" class="py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="reveal text-center mb-12">
                        <div class="text-blue-600 font-bold uppercase text-sm tracking-wider mb-2">Community Proof</div>
                        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Customer Testimonials</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">Real approved testimonials will appear here. Until then, the cards below are clearly marked examples of the kind of feedback customers can leave.</p>
                    </div>
                    <div class="testimonial-carousel-shell">
                        <button type="button" class="testimonial-nav testimonial-nav--prev" data-testimonial-scroll="prev" aria-label="Previous testimonials">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <div id="testimonials-grid" class="testimonial-carousel" aria-label="Customer testimonials carousel"></div>
                        <button type="button" class="testimonial-nav testimonial-nav--next" data-testimonial-scroll="next" aria-label="Next testimonials">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </section>
        `);
    }

    bindTestimonialCarouselControls();
    renderPlaceholderTestimonials();
}

function bindTestimonialCarouselControls() {
    document.querySelectorAll('[data-testimonial-scroll]').forEach(button => {
        if (button.dataset.bound) return;
        button.dataset.bound = 'true';
        button.addEventListener('click', () => scrollTestimonialCarousel(button.dataset.testimonialScroll));
    });
}

function scrollTestimonialCarousel(direction) {
    const carousel = document.getElementById('testimonials-grid');
    if (!carousel) return;

    const distance = Math.max(280, carousel.clientWidth * 0.82);
    carousel.scrollBy({
        left: direction === 'prev' ? -distance : distance,
        behavior: 'smooth'
    });
}

function createTestimonialCard(review, options = {}) {
    const { placeholder = false } = options;
    const rating = Number(review.rating || 0);
    const stars = rating ? ('★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(rating)) : '';
    const card = document.createElement('article');
    card.className = `reveal testimonial-card bg-white border border-gray-200 rounded-2xl p-6 shadow-sm ${placeholder ? 'testimonial-card--placeholder' : ''}`;
    card.innerHTML = `
        <div class="flex items-start justify-between gap-3 mb-3">
            ${stars ? `<div class="text-orange-500 tracking-wider">${stars}</div>` : '<div></div>'}
            ${placeholder ? '<span class="placeholder-badge">Placeholder Example</span>' : ''}
        </div>
        <p class="text-gray-600 mb-4">${escapeHTML(review.comment)}</p>
        <div class="font-bold text-slate-900">${escapeHTML(review.displayName || 'Customer')}</div>
        <div class="text-sm text-gray-500">${escapeHTML(review.productTitle || '')}</div>
    `;
    return card;
}

function renderPlaceholderTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid || grid.dataset.live === 'true') return;

    grid.innerHTML = '';
    PLACEHOLDER_TESTIMONIALS.forEach(item => grid.appendChild(createTestimonialCard(item, { placeholder: true })));
    window.observeRevealElements?.(grid);
}

function bindAuthModalEvents() {
    document.querySelectorAll('[data-close-auth]').forEach(button => button.addEventListener('click', closeAuthModal));
    document.getElementById('login-button')?.addEventListener('click', loginWithEmail);
    document.getElementById('signup-button')?.addEventListener('click', signupWithEmail);
    document.getElementById('google-login')?.addEventListener('click', () => loginWithProvider(new GoogleAuthProvider()));
    document.getElementById('facebook-login')?.addEventListener('click', () => loginWithProvider(new FacebookAuthProvider()));
}

function bindProfileEvents() {
    document.querySelectorAll('[data-close-profile]').forEach(button => button.addEventListener('click', closeProfilePanel));
    document.getElementById('profile-form')?.addEventListener('submit', saveProfile);
    document.getElementById('admin-listing-form')?.addEventListener('submit', saveListing);
    document.getElementById('reset-listing-form')?.addEventListener('click', resetListingForm);
    document.getElementById('sync-inventory-button')?.addEventListener('click', syncDefaultInventoryToFirestore);
    document.getElementById('save-site-theme-button')?.addEventListener('click', saveSiteColorScheme);
    document.getElementById('logout-button')?.addEventListener('click', async () => {
        if (auth) await signOut(auth);
        closeProfilePanel();
    });
}

function openAuthModal(message = '') {
    ensureCommunityUI();
    document.getElementById('auth-modal')?.classList.remove('hidden');
    if (!isFirebaseConfigured()) document.getElementById('auth-config-warning')?.classList.remove('hidden');
    if (message) setAuthStatus('info', message);
}

function closeAuthModal() {
    document.getElementById('auth-modal')?.classList.add('hidden');
}

function openProfilePanel() {
    ensureCommunityUI();
    hydrateProfileForm();
    renderFavoritesList();
    document.getElementById('profile-panel')?.classList.remove('hidden');
}

function closeProfilePanel() {
    document.getElementById('profile-panel')?.classList.add('hidden');
}

function setAuthStatus(type, message) {
    const status = document.getElementById('auth-status');
    if (!status) return;
    status.className = `mt-4 p-3 rounded-xl text-sm font-medium ${type === 'error' ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`;
    status.textContent = message;
    status.classList.remove('hidden');
}

function setProfileStatus(type, message) {
    const status = document.getElementById('profile-status');
    if (!status) return;
    status.className = `mt-4 p-3 rounded-xl text-sm font-medium ${type === 'error' ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-green-50 text-green-700 border border-green-200'}`;
    status.textContent = message;
    status.classList.remove('hidden');
}

function setReviewStatus(type, message) {
    const status = document.getElementById('review-status');
    if (!status) return;
    status.className = `mb-4 p-3 rounded-xl text-sm font-medium ${type === 'error' ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-green-50 text-green-700 border border-green-200'}`;
    status.textContent = message;
    status.classList.remove('hidden');
}

function requireConfigured() {
    if (isFirebaseConfigured()) return true;
    openAuthModal('Firebase must be configured before customer accounts can be used.');
    return false;
}

function requireLogin(message = 'Please sign in to use this feature.') {
    if (currentUser) return true;
    openAuthModal(message);
    return false;
}

async function ensureProfile(user, extra = {}) {
    const profileRef = doc(db, 'profiles', user.uid);
    const snap = await getDoc(profileRef);
    const base = {
        uid: user.uid,
        email: user.email || '',
        displayName: extra.displayName || user.displayName || user.email?.split('@')[0] || 'Customer',
        photoURL: user.photoURL || '',
        bio: '',
        about: '',
        role: 'customer',
        updatedAt: serverTimestamp()
    };

    if (!snap.exists()) {
        await setDoc(profileRef, { ...base, createdAt: serverTimestamp() });
        return base;
    }

    const data = snap.data();
    await setDoc(profileRef, {
        email: user.email || data.email || '',
        displayName: data.displayName || base.displayName,
        photoURL: data.photoURL || user.photoURL || '',
        updatedAt: serverTimestamp()
    }, { merge: true });
    return { ...base, ...data };
}

async function signupWithEmail() {
    if (!requireConfigured()) return;
    const name = document.getElementById('auth-name')?.value.trim();
    const email = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value;

    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(credential.user, { displayName: name });
        await ensureProfile(credential.user, { displayName: name });
        closeAuthModal();
    } catch (error) {
        setAuthStatus('error', error.message);
    }
}

async function loginWithEmail() {
    if (!requireConfigured()) return;
    const email = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        closeAuthModal();
    } catch (error) {
        setAuthStatus('error', error.message);
    }
}

async function loginWithProvider(provider) {
    if (!requireConfigured()) return;
    try {
        await signInWithPopup(auth, provider);
        closeAuthModal();
    } catch (error) {
        setAuthStatus('error', error.message);
    }
}

function updateAccountButton() {
    const button = document.getElementById('account-button');
    if (!button) return;

    if (!currentUser) {
        button.innerHTML = '<i class="fa-solid fa-user"></i><span class="hidden sm:inline">Sign In</span>';
        return;
    }

    const photo = currentProfile?.photoURL || currentUser.photoURL;
    const label = currentProfile?.displayName || currentUser.displayName || 'Account';
    button.innerHTML = photo
        ? `<img src="${escapeHTML(photo)}" alt="${escapeHTML(label)}" class="w-6 h-6 rounded-full object-cover"><span class="hidden sm:inline">${escapeHTML(label)}</span>`
        : `<span class="account-avatar-mini">${escapeHTML(getInitials(currentProfile || currentUser))}</span><span class="hidden sm:inline">${escapeHTML(label)}</span>`;
}

function hydrateProfileForm() {
    const profile = currentProfile || {};
    document.getElementById('profile-display-name').value = profile.displayName || currentUser?.displayName || '';
    document.getElementById('profile-bio').value = profile.bio || '';
    document.getElementById('profile-about').value = profile.about || '';

    const photo = profile.photoURL || currentUser?.photoURL || '';
    const summary = document.getElementById('profile-summary');
    if (summary) {
        summary.innerHTML = `
            ${photo ? `<img src="${escapeHTML(photo)}" class="w-16 h-16 rounded-full object-cover" alt="Profile picture">` : `<div class="account-avatar-large">${escapeHTML(getInitials(profile || currentUser))}</div>`}
            <div>
                <div class="font-bold text-slate-900">${escapeHTML(profile.displayName || currentUser?.displayName || 'Customer')}</div>
                <div class="text-sm text-gray-500">${escapeHTML(currentUser?.email || '')}</div>
                <div class="text-sm text-gray-600 mt-1">${escapeHTML(profile.bio || 'No bio yet.')}</div>
            </div>
        `;
    }

    document.getElementById('admin-panel')?.classList.toggle('hidden', !canManageListings());
    const schemeSelect = document.getElementById('site-color-scheme-select');
    if (schemeSelect) schemeSelect.value = window.CF_COLOR_SCHEME_MODE || 'auto';
    if (canManageListings()) renderAdminProductsList();
}

async function saveProfile(event) {
    event.preventDefault();
    if (!requireLogin()) return;

    try {
        const displayName = document.getElementById('profile-display-name')?.value.trim() || 'Customer';
        const bio = document.getElementById('profile-bio')?.value.trim() || '';
        const about = document.getElementById('profile-about')?.value.trim() || '';
        const file = document.getElementById('profile-photo')?.files?.[0];
        let photoURL = currentProfile?.photoURL || currentUser.photoURL || '';

        if (file) {
            const imageRef = ref(storage, `profile-pictures/${currentUser.uid}/${Date.now()}-${file.name}`);
            await uploadBytes(imageRef, file);
            photoURL = await getDownloadURL(imageRef);
        }

        await setDoc(doc(db, 'profiles', currentUser.uid), {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName,
            bio,
            about,
            photoURL,
            updatedAt: serverTimestamp()
        }, { merge: true });

        await updateProfile(currentUser, { displayName, photoURL });
        currentProfile = { ...currentProfile, displayName, bio, about, photoURL };
        hydrateProfileForm();
        updateAccountButton();
        setProfileStatus('success', 'Profile updated successfully.');
    } catch (error) {
        setProfileStatus('error', error.message);
    }
}

function listenToFavorite(product) {
    if (unsubscribeFavorite) unsubscribeFavorite();
    isCurrentProductFavorite = false;
    updateFavoriteButton();

    if (!currentUser || !product) return;

    const favoriteRef = doc(db, 'favorites', `${currentUser.uid}_${product.id}`);
    unsubscribeFavorite = onSnapshot(favoriteRef, snap => {
        isCurrentProductFavorite = snap.exists();
        updateFavoriteButton();
    });
}

function updateFavoriteButton() {
    const button = document.getElementById('favorite-product-button');
    if (!button) return;

    button.innerHTML = isCurrentProductFavorite
        ? '<i class="fa-solid fa-heart mr-2"></i>Saved Favorite'
        : '<i class="fa-regular fa-heart mr-2"></i>Save Favorite';
    button.classList.toggle('favorite-active', isCurrentProductFavorite);
}

async function toggleFavorite() {
    if (!requireLogin('Please sign in to save favorite products.')) return;
    if (!currentProduct) return;

    const favoriteRef = doc(db, 'favorites', `${currentUser.uid}_${currentProduct.id}`);
    if (isCurrentProductFavorite) {
        await deleteDoc(favoriteRef);
    } else {
        await setDoc(favoriteRef, {
            uid: currentUser.uid,
            productId: currentProduct.id,
            productTitle: currentProduct.title,
            productCategory: currentProduct.category,
            productPrice: currentProduct.price,
            productImage: currentProduct.images?.[0] || '',
            createdAt: serverTimestamp()
        });
    }
}

async function renderFavoritesList() {
    const list = document.getElementById('favorites-list');
    if (!list) return;
    if (!currentUser) {
        list.innerHTML = '<p class="text-gray-500 text-sm">Sign in to save favorite products.</p>';
        return;
    }

    const favoritesQuery = query(collection(db, 'favorites'), where('uid', '==', currentUser.uid), orderBy('createdAt', 'desc'), limit(20));
    onSnapshot(favoritesQuery, snap => {
        if (snap.empty) {
            list.innerHTML = '<p class="text-gray-500 text-sm">No favorites saved yet.</p>';
            return;
        }

        list.innerHTML = '';
        snap.forEach(docSnap => {
            const fav = docSnap.data();
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'w-full flex items-center gap-3 text-left p-3 rounded-xl border border-gray-200 hover:border-blue-600 transition';
            row.innerHTML = `
                <img src="${escapeHTML(fav.productImage)}" class="w-14 h-14 rounded-lg object-cover bg-gray-100" alt="${escapeHTML(fav.productTitle)}">
                <span class="flex-1">
                    <span class="block font-bold text-slate-900">${escapeHTML(fav.productTitle)}</span>
                    <span class="block text-sm text-gray-500">${escapeHTML(fav.productCategory)} • ${money(fav.productPrice)}</span>
                </span>
            `;
            row.addEventListener('click', () => {
                closeProfilePanel();
                window.openProduct?.(fav.productId);
            });
            list.appendChild(row);
        });
    });
}

const REVIEW_QUALITY_ASPECTS = [
    { key: 'condition', label: 'Condition / accuracy', keywords: ['condition', 'accurate', 'as described', 'description', 'flaw', 'scratch', 'tested', 'working', 'quality'] },
    { key: 'value', label: 'Price / value', keywords: ['price', 'value', 'deal', 'fair', 'worth', 'affordable', 'cost'] },
    { key: 'communication', label: 'Communication', keywords: ['communication', 'communicate', 'message', 'reply', 'responsive', 'honest', 'transparent', 'answered'] },
    { key: 'pickup', label: 'Pickup / delivery', keywords: ['pickup', 'meetup', 'delivery', 'local', 'cypress', 'easy', 'smooth', 'fast'] },
    { key: 'recommend', label: 'Recommendation', keywords: ['recommend', 'again', 'trust', 'would buy', 'come back', 'future'] },
    { key: 'product', label: 'Product experience', keywords: ['product', 'item', 'console', 'game', 'plush', 'figure', 'accessory', 'gift', 'kid', 'collector'] }
];

function getReviewQualityMatches(comment = '') {
    const lower = comment.toLowerCase();
    return REVIEW_QUALITY_ASPECTS.map(aspect => ({
        ...aspect,
        matched: aspect.keywords.some(keyword => lower.includes(keyword))
    }));
}

function isReviewMode() {
    const addRating = document.getElementById('review-add-rating')?.checked || false;
    const testimonial = document.getElementById('review-testimonial')?.checked || false;
    const rating = document.getElementById('review-rating')?.value || '';
    return addRating || testimonial || Boolean(rating);
}

function updateReviewMode() {
    const addRating = document.getElementById('review-add-rating');
    const testimonial = document.getElementById('review-testimonial');
    const ratingWrapper = document.getElementById('review-rating-wrapper');
    const rating = document.getElementById('review-rating');
    const helper = document.getElementById('review-quality-helper');
    const checks = document.getElementById('review-quality-checks');
    const comment = document.getElementById('review-comment')?.value || '';
    const submit = document.querySelector('#review-form button[type="submit"]');

    if (testimonial?.checked && addRating) addRating.checked = true;

    const reviewMode = isReviewMode();
    ratingWrapper?.classList.toggle('hidden', !reviewMode);
    helper?.classList.toggle('hidden', !reviewMode);
    if (rating) rating.required = reviewMode;
    if (submit) submit.textContent = reviewMode ? 'Post Review' : 'Post Comment';

    if (checks) {
        const matches = getReviewQualityMatches(comment);
        checks.innerHTML = matches.map(aspect => `
            <div class="review-quality-chip ${aspect.matched ? 'matched' : ''}">
                <i class="fa-solid ${aspect.matched ? 'fa-check' : 'fa-circle'}"></i>
                ${escapeHTML(aspect.label)}
            </div>
        `).join('');
    }
}

function validateReviewContent(comment, rating, testimonial) {
    const reviewMode = testimonial || Boolean(rating);
    if (!comment || comment.length < 5) {
        return 'Please write a quick comment or question before posting.';
    }

    if (!reviewMode) return '';

    if (!rating) {
        return 'Please select a star rating for reviews/testimonials.';
    }

    if (comment.length < 80) {
        return 'Rated reviews should be a little more detailed — please write at least 80 characters.';
    }

    const matchedCount = getReviewQualityMatches(comment).filter(aspect => aspect.matched).length;
    if (matchedCount < 2) {
        return 'For a rated review, please mention at least two helpful details like condition, value, communication, pickup/delivery, product experience, or whether you would recommend it.';
    }

    return '';
}

async function submitReview(event) {
    event.preventDefault();
    if (!requireLogin('Please sign in to leave a comment or review.')) return;
    if (!currentProduct) return;

    const ratingValue = document.getElementById('review-rating')?.value || '';
    const rating = ratingValue ? Number(ratingValue) : null;
    const comment = document.getElementById('review-comment')?.value.trim();
    const testimonial = document.getElementById('review-testimonial')?.checked || false;
    const editingId = document.getElementById('editing-review-id')?.value;
    const validationError = validateReviewContent(comment, rating, testimonial);

    if (validationError) {
        setReviewStatus('error', validationError);
        updateReviewMode();
        return;
    }

    try {
        const reviewMode = Boolean(rating);
        const payload = {
            productId: currentProduct.id,
            productTitle: currentProduct.title,
            productPrice: currentProduct.price,
            productImage: currentProduct.images?.[0] || '',
            uid: currentUser.uid,
            displayName: currentProfile?.displayName || currentUser.displayName || 'Customer',
            photoURL: currentProfile?.photoURL || currentUser.photoURL || '',
            rating,
            comment,
            testimonial: testimonial && reviewMode,
            reviewType: reviewMode ? 'review' : 'comment',
            status: 'visible',
            updatedAt: serverTimestamp()
        };

        if (editingId) {
            await updateDoc(doc(db, 'reviews', editingId), payload);
            document.getElementById('editing-review-id').value = '';
        } else {
            await addDoc(collection(db, 'reviews'), { ...payload, createdAt: serverTimestamp(), reportCount: 0 });
        }

        const form = document.getElementById('review-form');
        form?.reset();
        document.getElementById('review-rating').value = '';
        updateReviewMode();
        form?.classList.add('hidden');
        setReviewStatus('success', reviewMode ? 'Review posted successfully. Thank you!' : 'Comment posted successfully. Thank you!');
    } catch (error) {
        setReviewStatus('error', error.message);
    }
}

function listenToProductReviews(product) {
    if (unsubscribeProductReviews) unsubscribeProductReviews();
    const list = document.getElementById('reviews-list');
    if (!list || !product || !isFirebaseConfigured()) return;

    list.innerHTML = '<p class="text-gray-500 text-sm">Loading reviews...</p>';
    const reviewsQuery = query(
        collection(db, 'reviews'),
        where('productId', '==', product.id),
        where('status', '==', 'visible'),
        orderBy('createdAt', 'desc')
    );

    unsubscribeProductReviews = onSnapshot(reviewsQuery, snap => {
        if (snap.empty) {
            list.innerHTML = '<p class="text-gray-500 text-sm">No reviews yet. Be the first to comment on this product.</p>';
            return;
        }

        list.innerHTML = '';
        snap.forEach(reviewDoc => list.appendChild(renderReviewCard(reviewDoc.id, reviewDoc.data())));
    }, error => {
        list.innerHTML = `<p class="text-orange-700 text-sm">Unable to load reviews: ${escapeHTML(error.message)}</p>`;
    });
}

function renderReviewCard(id, review) {
    const card = document.createElement('div');
    const ownReview = currentUser && review.uid === currentUser.uid;
    const hasRating = Number.isFinite(Number(review.rating)) && Number(review.rating) >= 1;
    const stars = hasRating ? ('★★★★★'.slice(0, review.rating) + '☆☆☆☆☆'.slice(review.rating)) : '';
    card.className = 'review-card p-4 rounded-2xl border border-gray-200 bg-gray-50';
    card.innerHTML = `
        <div class="flex items-start gap-3">
            ${review.photoURL ? `<img src="${escapeHTML(review.photoURL)}" class="w-10 h-10 rounded-full object-cover" alt="${escapeHTML(review.displayName)}">` : `<div class="account-avatar-small">${escapeHTML(getInitials(review))}</div>`}
            <div class="flex-1">
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <div class="font-bold text-slate-900">${escapeHTML(review.displayName || 'Customer')}</div>
                        ${hasRating ? `<div class="text-orange-500 text-sm tracking-wider">${stars}</div>` : '<div class="text-gray-500 text-xs font-bold uppercase tracking-wider">Comment / Question</div>'}
                    </div>
                    <div class="flex items-center gap-2 text-xs">
                        ${review.testimonial ? '<span class="text-blue-600 font-bold">Testimonial</span>' : ''}
                        ${ownReview ? `<button data-edit-review="${id}" class="text-blue-600 font-bold">Edit</button><button data-delete-review="${id}" class="text-orange-700 font-bold">Delete</button>` : ''}
                        <button data-report-review="${id}" class="text-gray-500 font-bold">Report</button>
                    </div>
                </div>
                <p class="text-gray-600 mt-2">${escapeHTML(review.comment)}</p>
            </div>
        </div>
    `;

    card.querySelector('[data-edit-review]')?.addEventListener('click', () => editReview(id, review));
    card.querySelector('[data-delete-review]')?.addEventListener('click', () => deleteReview(id));
    card.querySelector('[data-report-review]')?.addEventListener('click', () => reportReview(id));
    return card;
}

function editReview(id, review) {
    if (!requireLogin()) return;
    const hasRating = Number.isFinite(Number(review.rating)) && Number(review.rating) >= 1;
    document.getElementById('editing-review-id').value = id;
    document.getElementById('review-add-rating').checked = hasRating;
    document.getElementById('review-rating').value = hasRating ? review.rating : '';
    document.getElementById('review-comment').value = review.comment;
    document.getElementById('review-testimonial').checked = Boolean(review.testimonial);
    updateReviewMode();
    document.getElementById('review-form')?.classList.remove('hidden');
    document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function deleteReview(id) {
    if (!requireLogin()) return;
    if (!confirm('Delete this review?')) return;
    await deleteDoc(doc(db, 'reviews', id));
}

async function reportReview(id) {
    if (!requireLogin('Please sign in to report comments.')) return;
    await updateDoc(doc(db, 'reviews', id), { reportCount: increment(1), reportedAt: serverTimestamp() });
    setReviewStatus('success', 'Thanks — this review has been reported for moderation.');
}

function listenToTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid || !isFirebaseConfigured()) {
        renderPlaceholderTestimonials();
        return;
    }

    const testimonialsQuery = query(
        collection(db, 'reviews'),
        where('testimonial', '==', true),
        where('status', '==', 'visible'),
        orderBy('createdAt', 'desc')
    );

    if (unsubscribeTestimonials) unsubscribeTestimonials();
    unsubscribeTestimonials = onSnapshot(testimonialsQuery, snap => {
        if (snap.empty) {
            grid.dataset.live = 'false';
            renderPlaceholderTestimonials();
            return;
        }

        grid.dataset.live = 'true';
        grid.innerHTML = '';
        snap.forEach(docSnap => {
            grid.appendChild(createTestimonialCard(docSnap.data()));
        });
        window.observeRevealElements?.(grid);
    }, error => {
        grid.dataset.live = 'false';
        grid.innerHTML = `
            <div class="testimonial-card bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div class="placeholder-badge mb-3">Testimonials temporarily unavailable</div>
                <p class="text-gray-600">Unable to load live testimonials right now: ${escapeHTML(error.message)}</p>
            </div>
        `;
    });
}

function slugifyListingTitle(title) {
    return String(title || 'listing')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80) || `listing-${Date.now()}`;
}

function normalizeProductDoc(id, data) {
    return {
        id: data.id || id,
        title: data.title || 'Untitled Listing',
        category: data.category || 'Uncategorized',
        price: Number(data.price || 0),
        shortDesc: data.shortDesc || '',
        fullDesc: data.fullDesc || data.shortDesc || '',
        images: Array.isArray(data.images) && data.images.length ? data.images : ['https://via.placeholder.com/600?text=Product'],
        isPremium: Boolean(data.isPremium),
        status: data.status || 'visible'
    };
}

function applyRemoteInventory() {
    if (useFirestoreInventory) {
        const visibleProducts = remoteProductDocs
            .filter(item => item.status !== 'hidden' && item.status !== 'archived')
            .sort((a, b) => (Number(b.isPremium) - Number(a.isPremium)) || a.title.localeCompare(b.title));
        window.CF_SET_INVENTORY?.(visibleProducts);
    } else {
        window.CF_SET_INVENTORY?.(window.CF_DEFAULT_INVENTORY || []);
    }

    renderAdminProductsList();
}

function setSiteThemeStatus(type, message) {
    const status = document.getElementById('site-theme-status');
    if (!status) return;
    status.className = `mt-4 p-3 rounded-xl text-sm font-medium ${type === 'error' ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-green-50 text-green-700 border border-green-200'}`;
    status.textContent = message;
    status.classList.remove('hidden');
}

async function saveSiteColorScheme() {
    if (!canManageListings()) return setSiteThemeStatus('error', 'You do not have permission to change the site theme.');
    const select = document.getElementById('site-color-scheme-select');
    const colorScheme = select?.value || 'auto';

    try {
        await setDoc(doc(db, 'settings', 'site'), {
            colorScheme,
            updatedBy: currentUser.uid,
            updatedAt: serverTimestamp()
        }, { merge: true });
        window.CF_APPLY_COLOR_SCHEME?.(colorScheme);
        setSiteThemeStatus('success', `Site theme saved: ${colorScheme}`);
    } catch (error) {
        setSiteThemeStatus('error', error.message);
    }
}

function listenToSiteSettings() {
    if (unsubscribeSiteSettings) unsubscribeSiteSettings();
    unsubscribeSiteSettings = onSnapshot(doc(db, 'settings', 'site'), snap => {
        const remoteScheme = snap.exists() ? snap.data()?.colorScheme : null;
        if (remoteScheme && window.CF_APPLY_COLOR_SCHEME) {
            window.CF_APPLY_COLOR_SCHEME(remoteScheme);
            const select = document.getElementById('site-color-scheme-select');
            if (select) select.value = remoteScheme;
        }
    });
}

function listenToProductListings() {
    if (unsubscribeProducts) unsubscribeProducts();
    if (unsubscribeInventorySettings) unsubscribeInventorySettings();

    unsubscribeInventorySettings = onSnapshot(doc(db, 'settings', 'inventory'), snap => {
        useFirestoreInventory = snap.exists() && snap.data()?.useFirestoreInventory === true;
        applyRemoteInventory();
    });

    unsubscribeProducts = onSnapshot(collection(db, 'products'), snap => {
        remoteProductDocs = [];
        snap.forEach(docSnap => remoteProductDocs.push(normalizeProductDoc(docSnap.id, docSnap.data())));
        applyRemoteInventory();
    });
}

function setAdminListingStatus(type, message) {
    const status = document.getElementById('admin-listing-status');
    if (!status) return;
    status.className = `mb-4 p-3 rounded-xl text-sm font-medium ${type === 'error' ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-green-50 text-green-700 border border-green-200'}`;
    status.textContent = message;
    status.classList.remove('hidden');
}

function getAdminManageItems() {
    return useFirestoreInventory ? remoteProductDocs : (window.CF_INVENTORY || []);
}

function renderAdminProductsList() {
    const list = document.getElementById('admin-products-list');
    if (!list) return;

    if (!canManageListings()) {
        list.innerHTML = '';
        return;
    }

    const items = getAdminManageItems();
    if (!useFirestoreInventory) {
        list.innerHTML = `
            <div class="p-4 rounded-xl border border-orange-200 bg-orange-50 text-sm text-orange-800">
                Listings are currently coming from the static website inventory. Click <strong>Sync Current Inventory</strong> to copy them into Firebase, then admins/moderators can edit and delete them from this panel.
            </div>
        `;
        return;
    }

    if (!items.length) {
        list.innerHTML = '<p class="text-gray-500 text-sm">No Firebase listings yet. Add a listing or sync the current inventory.</p>';
        return;
    }

    list.innerHTML = '';
    items
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .forEach(item => {
            const row = document.createElement('div');
            row.className = 'admin-product-row flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white';
            row.innerHTML = `
                <img src="${escapeHTML(item.images?.[0] || '')}" class="w-16 h-16 rounded-lg object-cover bg-gray-100" alt="${escapeHTML(item.title)}">
                <div class="flex-1 min-w-0">
                    <div class="font-bold text-slate-900 truncate">${escapeHTML(item.title)}</div>
                    <div class="text-sm text-gray-500">${escapeHTML(item.category)} • ${money(item.price)} • ${item.isPremium ? 'Premium' : 'Standard'} • ${escapeHTML(item.status || 'visible')}</div>
                </div>
                <div class="flex flex-wrap gap-2 justify-end">
                    <button type="button" data-edit-listing="${escapeHTML(item.id)}" class="px-3 py-2 rounded-lg border border-gray-300 hover:border-blue-600 text-sm font-bold transition">Edit</button>
                    <button type="button" data-delete-listing="${escapeHTML(item.id)}" class="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition">Delete</button>
                </div>
            `;
            row.querySelector('[data-edit-listing]')?.addEventListener('click', () => editListing(item.id));
            row.querySelector('[data-delete-listing]')?.addEventListener('click', () => deleteListing(item.id));
            list.appendChild(row);
        });
}

function resetListingForm() {
    const form = document.getElementById('admin-listing-form');
    form?.reset();
    document.getElementById('listing-doc-id').value = '';
    document.getElementById('listing-visible').checked = true;
}

function editListing(id) {
    if (!canManageListings()) return;
    const item = remoteProductDocs.find(product => product.id === id) || (window.CF_INVENTORY || []).find(product => product.id === id);
    if (!item) return;

    document.getElementById('listing-doc-id').value = item.id;
    document.getElementById('listing-title').value = item.title || '';
    document.getElementById('listing-category').value = item.category || '';
    document.getElementById('listing-price').value = Number(item.price || 0).toFixed(2);
    document.getElementById('listing-short-desc').value = item.shortDesc || '';
    document.getElementById('listing-full-desc').value = item.fullDesc || '';
    document.getElementById('listing-image-urls').value = (item.images || []).join('\n');
    document.getElementById('listing-premium').checked = Boolean(item.isPremium);
    document.getElementById('listing-visible').checked = item.status !== 'hidden' && item.status !== 'archived';
    document.getElementById('admin-listing-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function uploadListingImages(id) {
    const fileInput = document.getElementById('listing-image-files');
    const files = Array.from(fileInput?.files || []);
    const uploaded = [];

    for (const file of files) {
        const imageRef = ref(storage, `product-images/${id}/${Date.now()}-${file.name}`);
        await uploadBytes(imageRef, file);
        uploaded.push(await getDownloadURL(imageRef));
    }

    return uploaded;
}

function getListingFormData() {
    const existingId = document.getElementById('listing-doc-id')?.value.trim();
    const title = document.getElementById('listing-title')?.value.trim();
    const id = existingId || slugifyListingTitle(title);
    const imageUrls = (document.getElementById('listing-image-urls')?.value || '')
        .split('\n')
        .map(value => value.trim())
        .filter(Boolean);

    return {
        id,
        title,
        category: document.getElementById('listing-category')?.value.trim(),
        price: Number(document.getElementById('listing-price')?.value || 0),
        shortDesc: document.getElementById('listing-short-desc')?.value.trim(),
        fullDesc: document.getElementById('listing-full-desc')?.value.trim(),
        images: imageUrls,
        isPremium: document.getElementById('listing-premium')?.checked || false,
        status: document.getElementById('listing-visible')?.checked ? 'visible' : 'hidden'
    };
}

async function saveListing(event) {
    event.preventDefault();
    if (!canManageListings()) return setAdminListingStatus('error', 'You do not have permission to manage listings.');

    try {
        const data = getListingFormData();
        if (!data.title || !data.category || !data.shortDesc || !data.fullDesc) {
            return setAdminListingStatus('error', 'Please complete the title, category, short description, and full description.');
        }

        const uploadedImages = await uploadListingImages(data.id);
        const images = [...data.images, ...uploadedImages];
        if (!images.length) {
            return setAdminListingStatus('error', 'Please add at least one image URL/path or upload an image.');
        }

        await setDoc(doc(db, 'products', data.id), {
            ...data,
            images,
            updatedBy: currentUser.uid,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        }, { merge: true });
        await setDoc(doc(db, 'settings', 'inventory'), { useFirestoreInventory: true, updatedAt: serverTimestamp() }, { merge: true });
        useFirestoreInventory = true;
        resetListingForm();
        setAdminListingStatus('success', 'Listing saved successfully.');
    } catch (error) {
        setAdminListingStatus('error', error.message);
    }
}

async function deleteListing(id) {
    if (!canManageListings()) return setAdminListingStatus('error', 'You do not have permission to delete listings.');
    if (!confirm('Delete this listing from Firebase inventory?')) return;

    try {
        await deleteDoc(doc(db, 'products', id));
        await setDoc(doc(db, 'settings', 'inventory'), { useFirestoreInventory: true, updatedAt: serverTimestamp() }, { merge: true });
        setAdminListingStatus('success', 'Listing deleted.');
    } catch (error) {
        setAdminListingStatus('error', error.message);
    }
}

async function syncDefaultInventoryToFirestore() {
    if (!canManageListings()) return setAdminListingStatus('error', 'You do not have permission to sync inventory.');
    if (!confirm('Copy the current website inventory into Firebase? Existing Firebase product documents with the same IDs will be updated.')) return;

    try {
        const batch = writeBatch(db);
        const source = window.CF_DEFAULT_INVENTORY || window.CF_INVENTORY || [];
        source.forEach(item => {
            const id = item.id || slugifyListingTitle(item.title);
            batch.set(doc(db, 'products', id), {
                ...item,
                id,
                status: item.status || 'visible',
                updatedBy: currentUser.uid,
                updatedAt: serverTimestamp(),
                createdAt: serverTimestamp()
            }, { merge: true });
        });
        batch.set(doc(db, 'settings', 'inventory'), { useFirestoreInventory: true, updatedAt: serverTimestamp() }, { merge: true });
        await batch.commit();
        useFirestoreInventory = true;
        setAdminListingStatus('success', 'Current inventory synced to Firebase. You can now edit/delete listings here.');
    } catch (error) {
        setAdminListingStatus('error', error.message);
    }
}

function resetProductReviewUI() {
    const form = document.getElementById('review-form');
    const status = document.getElementById('review-status');
    const editingId = document.getElementById('editing-review-id');
    const rating = document.getElementById('review-rating');
    const addRating = document.getElementById('review-add-rating');
    const testimonial = document.getElementById('review-testimonial');

    form?.reset();
    form?.classList.add('hidden');
    if (editingId) editingId.value = '';
    if (rating) rating.value = '';
    if (addRating) addRating.checked = false;
    if (testimonial) testimonial.checked = false;
    if (status) status.classList.add('hidden');
    updateReviewMode();
}

function updateProductCommunity(product) {
    currentProduct = product;
    ensureProductCommunityContainers();
    resetProductReviewUI();
    listenToFavorite(product);
    listenToProductReviews(product);
}

async function initializeFirebaseCommunity() {
    ensureCommunityUI();

    if (!isFirebaseConfigured()) {
        document.getElementById('reviews-list')?.replaceChildren();
        return;
    }

    try {
        await loadFirebaseSDKs();
    } catch (error) {
        console.error('Firebase SDK failed to load:', error);
        const warning = document.getElementById('auth-config-warning');
        if (warning) {
            warning.classList.remove('hidden');
            warning.innerHTML = 'Firebase is configured, but the Firebase SDK could not load. If you are using the Arena preview or opening the file directly, try testing from your deployed site or a local web server with internet access.';
        }
        return;
    }

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    onAuthStateChanged(auth, async user => {
        currentUser = user;
        currentProfile = null;

        if (user) {
            currentProfile = await ensureProfile(user);
            closeAuthModal();
        }

        updateAccountButton();
        if (currentProduct) updateProductCommunity(currentProduct);
        listenToTestimonials();
    });

    listenToTestimonials();
    listenToSiteSettings();
    listenToProductListings();
}

window.addEventListener('cf:product-open', event => updateProductCommunity(event.detail));
window.openAuthModal = openAuthModal;
window.openProfilePanel = openProfilePanel;

initializeFirebaseCommunity();
