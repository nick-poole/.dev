/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
	navToggle = document.getElementById('nav-toggle'),
	navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
	navToggle.addEventListener('click', () => {
		navMenu.classList.add('show-menu');
	});

	// Add keyboard support for a11y
	navToggle.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			navToggle.click();
		}
	});
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
	navClose.addEventListener('click', () => {
		navMenu.classList.remove('show-menu');
	});

	// Adds keyboard support for a11y
	navClose.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			navClose.click();
		}
	});
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
	const navMenu = document.getElementById('nav-menu');
	// When we click on each nav__link, we remove the show-menu class
	navMenu.classList.remove('show-menu');
};
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
	const header = document.getElementById('header');
	// When the scroll is greater than 50 viewport height, add the shadow-header class to the header tag
	this.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header');
};
window.addEventListener('scroll', shadowHeader);

/*=============== EMAIL JS ===============*/
// const contactForm = document.getElementById('contact-form'),
// 	contactMessage = document.getElementById('contact-message');

// const sendEmail = (e) => {
// 	e.preventDefault();

// 	// serviceID - templateID - #form - publicKey
// 	emailjs.sendForm('', '', '#contact-form', '').then(
// 		() => {
// 			// Show sent message
// 			contactMessage.textContent = 'Message sent successfully ✅';

// 			// Remove message after five seconds
// 			setTimeout(() => {
// 				contactMessage.textContent = '';
// 			}, 5000);

// 			// Clear input fields
// 			contactForm.reset();
// 		},
// 		() => {
// 			// Show error message
// 			contactMessage.textContent = 'Message not sent (service error) ❌';
// 		}
// 	);
// };

// contactForm.addEventListener('submit', sendEmail);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');
	// When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
	const scrollDown = window.scrollY;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight,
			sectionTop = current.offsetTop - 58,
			sectionId = current.getAttribute('id'),
			sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

		if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
			sectionsClass.classList.add('active-link');
		} else {
			sectionsClass.classList.remove('active-link');
		}
	});
};
window.addEventListener('scroll', scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';
//grab light and and dark logo
const logoLight = document.getElementsByClassName('logo-light');
const logoDark = document.getElementsByClassName('logo-dark');

// Keyboard support for accessibility
themeButton.addEventListener('keydown', (e) => {
	if (e.key === 'Enter' || e.key === ' ') {
		e.preventDefault();
		themeButton.click();
	}
});

// Theme functions
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');

const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line');

// Load previous preference
if (selectedTheme) {
	document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
	themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);

	// Update aria-pressed on load
	const isDark = selectedTheme === 'dark';
	themeButton.setAttribute('aria-pressed', isDark.toString());
}

// Logo Toggle
const toggleLogos = (isDark) => {
	document.querySelectorAll('.logo-light').forEach((el) => el.classList.toggle('visible', !isDark));
	document.querySelectorAll('.logo-dark').forEach((el) => el.classList.toggle('visible', isDark));
};
// Toggle theme on click
themeButton.addEventListener('click', () => {
	const isDark = document.body.classList.toggle(darkTheme);
	themeButton.classList.toggle(iconTheme);
	// Store choice
	localStorage.setItem('selected-theme', getCurrentTheme());
	localStorage.setItem('selected-icon', getCurrentIcon());
	// Update aria-pressed for screen readers
	themeButton.setAttribute('aria-pressed', isDark.toString());

	toggleLogos(isDark);
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
	origin: 'top',
	distance: '60px',
	duration: 2500,
	delay: 400,
	// reset: true // Animations repeat
});

sr.reveal(`.home__profile, .about__image, .contact__mail`, { origin: 'right' });
sr.reveal(
	`.home__name, .home__info,
            .about__container .section__title-1, .about__info,
            .contact__social, .contact__data`,
	{ origin: 'left' }
);
sr.reveal(`.services__card, .projects__card`, { interval: 100 });

/*==================== FORM CLEAR ====================*/
// Enhanced form handling
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
	contactForm.addEventListener('submit', function (e) {
		// Show loading state
		const submitBtn = this.querySelector('button[type="submit"]');
		const originalText = submitBtn.innerHTML;
		submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
		submitBtn.disabled = true;

		// Clear previous messages
		contactMessage.textContent = '';

		// Let Netlify handle the actual submission
		// The form will redirect to thank-you.html on success
	});
}
