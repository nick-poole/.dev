/*=============== NAV MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
	navToggle = document.getElementById('nav-toggle'),
	navClose = document.getElementById('nav-close');

const openMenu = () => {
	if (!navMenu) return;
	navMenu.classList.add('show-menu');
	if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
	if (navClose) navClose.focus();
};

const closeMenu = ({ restoreFocus = false } = {}) => {
	if (!navMenu) return;
	navMenu.classList.remove('show-menu');
	if (navToggle) {
		navToggle.setAttribute('aria-expanded', 'false');
		if (restoreFocus) navToggle.focus();
	}
};

if (navToggle) navToggle.addEventListener('click', openMenu);
if (navClose) navClose.addEventListener('click', () => closeMenu({ restoreFocus: true }));

/* Escape closes the menu and hands focus back to the control that opened it */
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
		closeMenu({ restoreFocus: true });
	}
});

/* Any nav link dismisses the mobile menu */
document.querySelectorAll('.nav__link').forEach((link) => link.addEventListener('click', () => closeMenu()));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/*=============== SCROLL-DRIVEN UI ===============*/
/* One passive listener batched into a single rAF. It only reads window.scrollY:
   no element geometry is touched here, so toggling these classes cannot force a
   synchronous layout the way reading offsetTop mid-scroll did. */
const header = document.getElementById('header');
const scrollUpBtn = document.getElementById('scroll-up');

let ticking = false;

const onScroll = () => {
	const y = window.scrollY;
	if (header) header.classList.toggle('shadow-header', y >= 50);
	if (scrollUpBtn) scrollUpBtn.classList.toggle('show-scroll', y >= 350);
	ticking = false;
};

window.addEventListener(
	'scroll',
	() => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(onScroll);
	},
	{ passive: true }
);
onScroll();

/*=============== SCROLL SPY ===============*/
/* The browser reports which section is under the header for us. The old version
   read offsetTop and offsetHeight for every section on every scroll frame, which
   is what PageSpeed was flagging as a forced reflow. */
const sectionLinks = new Map();
document.querySelectorAll('section[id]').forEach((section) => {
	const link = document.querySelector('.nav__menu a[href="#' + section.id + '"]');
	if (link) sectionLinks.set(section, link);
});

if (sectionLinks.size && 'IntersectionObserver' in window) {
	const spy = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const link = sectionLinks.get(entry.target);
				if (link) link.classList.toggle('active-link', entry.isIntersecting);
			});
		},
		/* Active band: just under the fixed header, down to 30% of the viewport */
		{ rootMargin: '-58px 0px -70% 0px' }
	);
	sectionLinks.forEach((_link, section) => spy.observe(section));
}

/*=============== DARK / LIGHT THEME ===============*/
/* The class lives on <html> so the inline script in each page's <head> can
   apply it before first paint. This block only handles the toggle. */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const themeRoot = document.documentElement;

const syncThemeButton = (isDark) => {
	if (!themeButton) return;
	themeButton.setAttribute('aria-pressed', String(isDark));
	themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
	const icon = themeButton.querySelector('use');
	if (icon) icon.setAttribute('href', isDark ? '#i-sun-line' : '#i-moon-line');
};

const applyTheme = (isDark) => {
	themeRoot.classList.toggle(darkTheme, isDark);
	syncThemeButton(isDark);
};

applyTheme(themeRoot.classList.contains(darkTheme));

if (themeButton) {
	themeButton.addEventListener('click', () => {
		const isDark = !themeRoot.classList.contains(darkTheme);
		applyTheme(isDark);
		try {
			localStorage.setItem('selected-theme', isDark ? 'dark' : 'light');
		} catch (e) {
			/* storage blocked (private mode) — the toggle still works for this session */
		}
	});
}

/*=============== ENTRANCE REVEAL ===============*/
/* Was ScrollReveal, a 16.6 KB dependency animating three elements on one page.
   Skipped for users who have asked for reduced motion. */
const revealTargets = document.querySelectorAll('.reveal');

if (revealTargets.length) {
	if (prefersReducedMotion || !('IntersectionObserver' in window)) {
		revealTargets.forEach((el) => el.classList.add('is-visible'));
	} else {
		const reveal = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				});
			},
			{ rootMargin: '0px 0px -12% 0px' }
		);
		revealTargets.forEach((el) => reveal.observe(el));
	}
}
