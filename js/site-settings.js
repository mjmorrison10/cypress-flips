// Cypress Flips site-wide settings.
//
// COLOR SCHEME MANUAL OVERRIDE
// Change colorScheme below, deploy, and the whole site changes.
//
// Options:
// "auto"        = automatically choose by major holiday/date in America/Los_Angeles
// "default"     = Cypress Flips orange/blue/white brand theme
// "patriot"     = red/white/blue
// "christmas"   = red/green/white
// "halloween"   = orange/black/purple
// "thanksgiving"= harvest orange/brown/gold
// "newyear"     = black/gold/silver
// "valentines"  = red/pink/white
// "stpatricks"  = green/gold/white
// "easter"      = pastel spring palette
//
// Example manual override:
// colorScheme: "patriot"
//
// To return to automatic holiday switching:
// colorScheme: "auto"

window.CF_SITE_SETTINGS = {
    colorScheme: "auto"
};

(function initializeCypressFlipsColorScheme() {
    const VALID_SCHEMES = [
        "auto",
        "default",
        "patriot",
        "christmas",
        "halloween",
        "thanksgiving",
        "newyear",
        "valentines",
        "stpatricks",
        "easter"
    ];

    function getCaliforniaDateParts(date = new Date()) {
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Los_Angeles",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            weekday: "long"
        }).formatToParts(date);

        const get = type => parts.find(part => part.type === type)?.value;
        return {
            year: Number(get("year")),
            month: Number(get("month")),
            day: Number(get("day")),
            weekday: get("weekday")
        };
    }

    function getEasterDate(year) {
        // Gregorian computus algorithm.
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        return { month, day };
    }

    function dateToDayOfYear(year, month, day) {
        return Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 86400000);
    }

    function isNthWeekdayOfMonth(parts, targetWeekday, nth) {
        return parts.weekday === targetWeekday && Math.ceil(parts.day / 7) === nth;
    }

    function isLastWeekdayOfMonth(parts, targetWeekday) {
        const nextWeek = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + 7));
        const nextParts = getCaliforniaDateParts(nextWeek);
        return parts.weekday === targetWeekday && nextParts.month !== parts.month;
    }

    function resolveAutoColorScheme(date = new Date()) {
        const parts = getCaliforniaDateParts(date);
        const { year, month, day } = parts;

        // New Year's Eve / Day
        if ((month === 12 && day === 31) || (month === 1 && day === 1)) return "newyear";

        // Valentine's shopping window
        if (month === 2 && day >= 7 && day <= 14) return "valentines";

        // St. Patrick's Day window
        if (month === 3 && day >= 10 && day <= 17) return "stpatricks";

        // Easter week
        const easter = getEasterDate(year);
        const todayNumber = dateToDayOfYear(year, month, day);
        const easterNumber = dateToDayOfYear(year, easter.month, easter.day);
        if (todayNumber >= easterNumber - 7 && todayNumber <= easterNumber) return "easter";

        // Memorial Day, Independence Day, Labor Day, Veterans Day, and September 11 use patriot colors.
        if (month === 5 && isLastWeekdayOfMonth(parts, "Monday")) return "patriot";
        if (month === 7 && day >= 1 && day <= 7) return "patriot";
        if (month === 9 && (day === 11 || isNthWeekdayOfMonth(parts, "Monday", 1))) return "patriot";
        if (month === 11 && day === 11) return "patriot";

        // Halloween day. If you want all October, change this to: month === 10
        if (month === 10 && day === 31) return "halloween";

        // Thanksgiving through the weekend after.
        if (month === 11 && parts.weekday === "Thursday" && Math.ceil(day / 7) === 4) return "thanksgiving";
        if (month === 11 && day >= 22 && day <= 30 && ["Friday", "Saturday", "Sunday"].includes(parts.weekday)) return "thanksgiving";

        // Christmas shopping season through Christmas Day.
        if (month === 12 && day >= 1 && day <= 25) return "christmas";

        return "default";
    }

    function normalizeColorScheme(scheme) {
        return VALID_SCHEMES.includes(scheme) ? scheme : "auto";
    }

    function applyColorScheme(scheme = "auto", options = {}) {
        const normalized = normalizeColorScheme(scheme);
        const resolved = normalized === "auto" ? resolveAutoColorScheme() : normalized;

        document.documentElement.dataset.colorScheme = resolved;
        document.documentElement.dataset.colorSchemeMode = normalized;
        window.CF_ACTIVE_COLOR_SCHEME = resolved;
        window.CF_COLOR_SCHEME_MODE = normalized;

        if (options.persistLocal) {
            localStorage.setItem("cypress-flips-color-scheme", normalized);
        }

        window.dispatchEvent(new CustomEvent("cf:color-scheme-change", {
            detail: { mode: normalized, resolved }
        }));

        return resolved;
    }

    const localOverride = localStorage.getItem("cypress-flips-color-scheme");
    const configured = window.CF_SITE_SETTINGS?.colorScheme || "auto";
    const initialScheme = localOverride || configured;

    window.CF_VALID_COLOR_SCHEMES = VALID_SCHEMES;
    window.CF_RESOLVE_AUTO_COLOR_SCHEME = resolveAutoColorScheme;
    window.CF_APPLY_COLOR_SCHEME = applyColorScheme;

    applyColorScheme(initialScheme);
})();
