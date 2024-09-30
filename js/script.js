'use strict'

//burger menu click
document.addEventListener('click', documentClick)

function documentClick(event) {
	const targetItem = event.target

	if (targetItem.closest('.icon-menu')) {
		document.documentElement.classList.toggle('menu-opened')
	}
}

//Swiperjs
const swiper = new Swiper('.testimonials__slider', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>'
		},
		draggable: true,
	},
	autoHeight: true,
	spaceBetween: 32,
	grabCursor: true,
	loop: true,
	autoplay: {
		delay: 600,
		stopOnLastSlide: false,
		disableOnInteraction: false,
	},
	speed: 1000,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
		1060: {
			slidesPerView: 3,
		},
	},
})

const swiperCl = new Swiper('.clients__slider', {
	spaceBetween: 32,
	grabCursor: true,
	loop: true,
	autoplay: {
		delay: 0,
		stopOnLastSlide: false,
		disableOnInteraction: false,
	},
	speed: 2500,
	breakpoints: {
		320: {
			slidesPerView: 2.5,
		},
		768: {
			slidesPerView: 3.5,
		},
		1060: {
			slidesPerView: 4.5,
		},
	},
})

//Dark theme
window.addEventListener('load', windowLoad)

function windowLoad() {
	const htmlBlock = document.documentElement

	const saveUserTheme = localStorage.getItem('user-theme')

	let userTheme
	if (window.matchMedia) {
		userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	}
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', e => {
			!saveUserTheme ? changeTheme() : null
		})

	const themeButton = document.querySelector('.header__theme')
	const resetButton = document.querySelector('.header__reset')
	if (themeButton) {
		themeButton.addEventListener('click', function (e) {
			resetButton.classList.add('active')
			changeTheme(true)
		})
	}
	if (resetButton) {
		resetButton.addEventListener('click', function (e) {
			resetButton.classList.remove('active')
			localStorage.setItem('user-theme', '')
		})
	}

	function setThemeClass() {
		if (saveUserTheme) {
			htmlBlock.classList.add(saveUserTheme)
			resetButton.classList.add('active')
		} else {
			htmlBlock.classList.add(userTheme)
		}
	}

	setThemeClass()

	function changeTheme(saveTheme = false) {
		let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark'
		let newTheme

		if (currentTheme === 'light') {
			newTheme = 'dark'
		} else if (currentTheme === 'dark') {
			newTheme = 'light'
		}
		htmlBlock.classList.remove(currentTheme)
		htmlBlock.classList.add(newTheme)
		saveTheme ? localStorage.setItem('user-theme', newTheme) : null
	}
}

//Animation
const animItems = document.querySelectorAll('._anim-items')

if (animItems.length > 0) {
	function animOnScroll() {
		window.addEventListener('scroll', animOnScroll)
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index]
			const animItemHeight = animItem.offsetHeight
			const animItemOffset = offset(animItem).top
			const animStart = 4

			let animItemPoint = window.innerHeight - animItemHeight / animStart

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart
			}

			if (
				pageYOffset > animItemOffset - animItemPoint &&
				pageYOffset < animItemOffset + animItemHeight
			) {
				animItem.classList.add('_active')
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active')
				}
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	
	setTimeout(() => {
		animOnScroll()
	}, 300)
}
