let changemode = (mode) => {
	if (mode != "dark") {
		document.body.style.cssText = `
                    --alarmcolor: #CB4042;
                    --primarycolor:#1f0d00;
                    --secondarycolor: #CA7A2C;
                    --backgroundcolor: #f7912b;
                    --fontcolor: #000000;
                `;
	} else {
		document.body.style.cssText = `
                    --alarmcolor: #CB4042;
                    --primarycolor: #FFB11B;
                    --secondarycolor: #1C1C1C;
                    --backgroundcolor: #1C1C1C;
                    --fontcolor: #FCFAF2;
                `;
	}
};

let setColorBt = (func1) => {
	let btn = document.getElementById("colormode_button");
	if (btn) {
		document.body.removeChild(btn);
	}
	var div = document.createElement("div");
	// set some attributes
	div.id = "colormode_button";
	div.innerHTML = `<svg
                        fill="#000000"
                        height="800px"
                        width="800px"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 285.92 285.92"
                        xml:space="preserve"
                    >
                        <g>
                            <path
                                d="M142.96,0C64.132,0,0,64.132,0,142.96s64.132,142.96,142.96,142.96s142.96-64.132,142.96-142.96S221.788,0,142.96,0z
                                M260.92,142.96c0,59.734-44.631,109.241-102.298,116.925c-3.956,0.527-7.946-0.68-10.947-3.31s-4.715-6.429-4.715-10.419V39.765
                                c0-3.987,1.722-7.779,4.72-10.407c2.998-2.628,6.989-3.849,10.942-3.322C216.289,33.719,260.92,83.226,260.92,142.96z"
                            />
                        </g>
                    </svg>`;

	div.addEventListener("click", () => {
		if (getCookie("colormode") != "dark") {
			setCookie("colormode", "dark", 7);
		} else {
			setCookie("colormode", "light", 7);
		}
		changemode(getCookie("colormode"));
		try {
			func1();
		} catch {}
	});
	// append the div to the body
	document.body.appendChild(div);

	changemode(getCookie("colormode"));
};

let daynight = "dark";
function setCookie(cname, cvalue, exdays) {
	daynight = cvalue;
	// const d = new Date();
	// d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	// let expires = "expires=" + d.toUTCString();
	// document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	return daynight;
	// let name = cname + "=";
	// let ca = document.cookie.split(";");
	// for (let i = 0; i < ca.length; i++) {
	// 	let c = ca[i];
	// 	while (c.charAt(0) == " ") {
	// 		c = c.substring(1);
	// 	}
	// 	if (c.indexOf(name) == 0) {
	// 		return c.substring(name.length, c.length);
	// 	}
	// }
	// return "";
}

window.onload = () => {
	setColorBt();
	let blocks = document.getElementsByClassName("blocks");
	blocks[0].classList.remove("hidden");

	let sdgs = document.getElementsByClassName("sdg");
	for (let i = 0; i < sdgs.length; i++) {
		setTimeout(function () {
			sdgs[i].classList.remove("hidden");
		}, i * 300);
	}
};

document.addEventListener(
	"wheel",
	function (e) {
		nextpage(e.deltaY * 0.01);
	},
	false
);

var touchPos;
document.body.ontouchstart = function (e) {
	touchPos = e.changedTouches[0].clientY;
};
document.body.ontouchmove = function (e) {
	let newTouchPos = e.changedTouches[0].clientY;
	if (newTouchPos > touchPos) {
		nextpage(-1);
		console.log("finger moving down");
	}
	if (newTouchPos < touchPos) {
		nextpage(1);
		console.log("finger moving up");
	}
};

let curr = 0;
const delay = 1000;
let lastExecution = 0;
let nextpage = (add) => {
	if (lastExecution + delay < Date.now()) {
		let blocks = document.getElementsByClassName("blocks");
		curr += add;
		if (curr < 0) {
			curr = 0;
		}
		if (curr == blocks.length) {
			curr = blocks.length - 1;
		}
		let i;
		for (i = 0; i < blocks.length; i++) {
			if (i != curr) {
				blocks[i].classList.add("hidden");
			} else {
				blocks[i].classList.remove("hidden");
			}
		}
		lastExecution = Date.now();
	}
};

let openintro = (e) => {
	if (e.classList.contains("active")) {
		setTimeout(function () {
			e.classList.remove("active");
		}, 1000);
		let txt = e.firstElementChild;
		txt.classList.add("hidden");
	} else {
		e.classList.add("active");
		let txt = e.firstElementChild;
		txt.classList.remove("hidden");
	}
};
