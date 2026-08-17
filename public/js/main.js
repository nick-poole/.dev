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

/*=============== SCROLL-DRIVEN UI ===============*/
/* One passive listener, batched into a single rAF, instead of three
   independent handlers doing layout reads on every scroll event. */
const header = document.getElementById('header');
const scrollUpBtn = document.getElementById('scroll-up');
const sections = document.querySelectorAll('section[id]');

let ticking = false;

const onScroll = () => {
	const y = window.scrollY;

	if (header) header.classList.toggle('shadow-header', y >= 50);
	if (scrollUpBtn) scrollUpBtn.classList.toggle('show-scroll', y >= 350);

	sections.forEach((current) => {
		const sectionId = current.getAttribute('id');
		// Not every section has a matching nav link (multi-page nav) — guard against null
		const link = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');
		if (!link) return;

		const top = current.offsetTop - 58;
		link.classList.toggle('active-link', y > top && y <= top + current.offsetHeight);
	});

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
	const icon = themeButton.querySelector('i');
	if (icon) {
		icon.classList.toggle('ri-sun-line', isDark);
		icon.classList.toggle('ri-moon-line', !isDark);
	}
};

const toggleLogos = (isDark) => {
	document.querySelectorAll('.logo-light').forEach((el) => el.classList.toggle('visible', !isDark));
	document.querySelectorAll('.logo-dark').forEach((el) => el.classList.toggle('visible', isDark));
};

const applyTheme = (isDark) => {
	themeRoot.classList.toggle(darkTheme, isDark);
	syncThemeButton(isDark);
	toggleLogos(isDark);
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

/*=============== SCROLL REVEAL ANIMATION ===============*/
/* Skipped for users who have asked for reduced motion */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof ScrollReveal !== 'undefined' && !prefersReducedMotion) {
	const sr = ScrollReveal({
		origin: 'top',
		distance: '60px',
		duration: 2500,
		delay: 400,
	});

	sr.reveal(`.home__profile, .about__image, .contact__mail`, { origin: 'right' });
	sr.reveal(
		`.home__name, .home__info,
            .about__container .section__title-1, .about__info,
            .contact__social, .contact__data`,
		{ origin: 'left' }
	);
	sr.reveal(`.services__card, .projects__card`, { interval: 100 });
}
