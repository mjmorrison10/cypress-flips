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
        increment
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
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Admin Moderation</h3>
                    <p class="text-sm text-gray-600">Reviews with reports or hidden status can be moderated from Firestore. Admin-only UI hooks are included for future expansion.</p>
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
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="review-rating">Rating</label>
                        <select id="review-rating" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="5">★★★★★ 5 stars</option>
                            <option value="4">★★★★☆ 4 stars</option>
                            <option value="3">★★★☆☆ 3 stars</option>
                            <option value="2">★★☆☆☆ 2 stars</option>
                            <option value="1">★☆☆☆☆ 1 star</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1" for="review-comment">Comment / review</label>
                        <textarea id="review-comment" rows="4" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Share your thoughts or ask a public question about this product."></textarea>
                    </div>
                    <label class="inline-flex items-center gap-2 text-sm text-gray-600">
                        <input id="review-testimonial" type="checkbox" class="accent-blue-600">
                        Allow this review to appear as a testimonial
                    </label>
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">Post Review</button>
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
    }
}

function ensureTestimonialsSection() {
    const suppliers = document.getElementById('suppliers');
    if (!suppliers || document.getElementById('testimonials')) return;

    suppliers.insertAdjacentHTML('beforebegin', `
        <section id="testimonials" class="py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="reveal text-center mb-12">
                    <div class="text-blue-600 font-bold uppercase text-sm tracking-wider mb-2">Community Proof</div>
                    <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Customer Testimonials</h2>
                    <p class="text-gray-600 max-w-xl mx-auto">Real comments and product reviews from Cypress Flips customers.</p>
                </div>
                <div id="testimonials-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
            </div>
        </section>
    `);
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

    document.getElementById('admin-panel')?.classList.toggle('hidden', !isAdmin());
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

async function submitReview(event) {
    event.preventDefault();
    if (!requireLogin('Please sign in to leave a review.')) return;
    if (!currentProduct) return;

    const rating = Number(document.getElementById('review-rating')?.value || 5);
    const comment = document.getElementById('review-comment')?.value.trim();
    const testimonial = document.getElementById('review-testimonial')?.checked || false;
    const editingId = document.getElementById('editing-review-id')?.value;

    if (!comment) return;

    try {
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
            testimonial,
            status: 'visible',
            updatedAt: serverTimestamp()
        };

        if (editingId) {
            await updateDoc(doc(db, 'reviews', editingId), payload);
            document.getElementById('editing-review-id').value = '';
        } else {
            await addDoc(collection(db, 'reviews'), { ...payload, createdAt: serverTimestamp(), reportCount: 0 });
        }

        document.getElementById('review-form')?.reset();
        document.getElementById('review-form')?.classList.add('hidden');
        setReviewStatus('success', 'Review posted successfully. Thank you!');
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
    const stars = '★★★★★'.slice(0, review.rating) + '☆☆☆☆☆'.slice(review.rating);
    card.className = 'review-card p-4 rounded-2xl border border-gray-200 bg-gray-50';
    card.innerHTML = `
        <div class="flex items-start gap-3">
            ${review.photoURL ? `<img src="${escapeHTML(review.photoURL)}" class="w-10 h-10 rounded-full object-cover" alt="${escapeHTML(review.displayName)}">` : `<div class="account-avatar-small">${escapeHTML(getInitials(review))}</div>`}
            <div class="flex-1">
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <div class="font-bold text-slate-900">${escapeHTML(review.displayName || 'Customer')}</div>
                        <div class="text-orange-500 text-sm tracking-wider">${stars}</div>
                    </div>
                    <div class="flex items-center gap-2 text-xs">
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
    document.getElementById('editing-review-id').value = id;
    document.getElementById('review-rating').value = review.rating;
    document.getElementById('review-comment').value = review.comment;
    document.getElementById('review-testimonial').checked = Boolean(review.testimonial);
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
    if (!grid || !isFirebaseConfigured()) return;

    const testimonialsQuery = query(
        collection(db, 'reviews'),
        where('testimonial', '==', true),
        where('status', '==', 'visible'),
        orderBy('createdAt', 'desc'),
        limit(3)
    );

    unsubscribeTestimonials = onSnapshot(testimonialsQuery, snap => {
        if (snap.empty) {
            grid.innerHTML = `
                <div class="md:col-span-3 text-center bg-white border border-gray-200 rounded-2xl p-8 text-gray-500">
                    Customer testimonials will appear here once reviews are submitted.
                </div>
            `;
            return;
        }

        grid.innerHTML = '';
        snap.forEach(docSnap => {
            const review = docSnap.data();
            const stars = '★★★★★'.slice(0, review.rating) + '☆☆☆☆☆'.slice(review.rating);
            const card = document.createElement('div');
            card.className = 'reveal bg-white border border-gray-200 rounded-2xl p-6 shadow-sm';
            card.innerHTML = `
                <div class="text-orange-500 mb-3">${stars}</div>
                <p class="text-gray-600 mb-4">“${escapeHTML(review.comment)}”</p>
                <div class="font-bold text-slate-900">${escapeHTML(review.displayName || 'Customer')}</div>
                <div class="text-sm text-gray-500">${escapeHTML(review.productTitle || '')}</div>
            `;
            grid.appendChild(card);
        });
        window.observeRevealElements?.(grid);
    });
}

function updateProductCommunity(product) {
    currentProduct = product;
    ensureProductCommunityContainers();
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
}

window.addEventListener('cf:product-open', event => updateProductCommunity(event.detail));
window.openAuthModal = openAuthModal;
window.openProfilePanel = openProfilePanel;

initializeFirebaseCommunity();
