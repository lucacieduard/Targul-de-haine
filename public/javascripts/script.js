"use strict";

// NAV
const burger = document.getElementById("burger");
const nav = document.getElementById("nav-ul");

burger.addEventListener("click", () => {
	if (nav.classList.contains("nav-ul-toggle")) {
		burger.setAttribute("src", "/images/menu-burger.svg");
		nav.classList.toggle("nav-ul-toggle");
	} else {
		burger.setAttribute("src", "/images/cross.svg");
		nav.classList.toggle("nav-ul-toggle");
	}
});

// filter category
const choise = document.getElementById("choise");
const choise_button = document.getElementById("choise-button");

choise.addEventListener("click", (e) => {
	choise_button.setAttribute("href", `/haine/${choise.value}`);
});

// filter price
const filter_price = document.getElementById("filter-price");
const filter_button = document.getElementById("submit-filter");

filter_price.addEventListener("click", (e) => {
	let str = window.location.pathname.split("/");
	const location = str[2];

	filter_button.setAttribute(
		"href",
		`/haine/${location}/sort-price/${filter_price.value}`
	);
});

// filter category

const buttonN = document.getElementById("cat-cl");
const filter_cat = document.getElementById("category-clothes-choise");
filter_cat.addEventListener("click", () => {
	let str = window.location.pathname.split("/");
	const location = str[2];
	buttonN.setAttribute(
		"href",
		`/haine/${location}/sort-category/${filter_cat.value}`
	);
});
