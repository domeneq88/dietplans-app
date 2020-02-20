let numSquares = 6;
let colors = generateRandomColors(numSquares);
let squares = document.querySelectorAll(".square");
let pickedColor = pickColor();
let colorDisplay = document.getElementById("colorDisplay");
let message = document.getElementById('message');
let header = document.querySelector('h1');
let reset = document.getElementById('reset');
let lvlEasy = document.getElementById('lvlEasy');
let lvlHard = document.getElementById('lvlHard');
lvlHard.classList.add("selected");

lvlEasy.addEventListener('click', function() {
	lvlEasy.classList.add("selected");
	lvlHard.classList.remove("selected");
	numSquares = 3;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (let i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
})

lvlHard.addEventListener('click', function() {
	lvlHard.classList.add("selected");
	lvlEasy.classList.remove("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (let i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
	}
})

reset.addEventListener('click', function() {
	reset.textContent = "New colors";
	message.textContent = "";
	header.style.backgroundColor = "#389CB7";
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
})

colorDisplay.textContent = pickedColor;
colorDisplay.style.textTransform = "uppercase";

	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function() {
			let clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				for (let i = 0; i < squares.length; i++) {
					squares[i].style.backgroundColor = pickedColor;	
				}
				message.textContent = "Correct!";
				header.style.backgroundColor = pickedColor;
				reset.textContent = "Play again?"

			} else {
				this.style.backgroundColor = "#232323";
				message.textContent = "Try Again!";
			}
		})
	}


function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	let arr = [];
	for (let i = 0; i < num; i++) {
		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);
		let color = `rgb(${r}, ${g}, ${b})`;
		arr.push(color);
	}
	return arr;
}