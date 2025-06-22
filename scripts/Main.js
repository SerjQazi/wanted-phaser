import { CONFIG } from './Globals.js';
import Game from './Game.js';

window.addEventListener('load', () => {
	// Initialize the game
	window.game = new Game(CONFIG);

	// Create footer
	const footer = document.createElement('footer');
	footer.innerHTML = `
		<p>
			&copy; 2025 Serj. Built with
			<i class="fa-brands fa-js" style="color: #000222"></i> Phaser.js
		</p>
		<p class="mt-2">
			<a href="https://serjqazi.com/" target="_blank">Portfolio</a> ·
			<a href="mailto:sirajum.qazi@torontofilmschool.ca">Email</a> ·
			<a href="https://github.com/SerjQazi" target="_blank">GitHub</a> ·
			<a href="https://www.linkedin.com/in/serjqazi/" target="_blank">LinkedIn</a>
		</p>
	`;

	// Apply styles
	Object.assign(footer.style, {
		textAlign: 'center',
		fontSize: '20px',
		fontFamily: 'sans-serif',
		letterSpacing: '5px',
		color: '#black',
		marginTop: '12px',
		paddingBottom: '20px'
	});

	// Hover effect for links
	footer.querySelectorAll('a').forEach(link => {
		link.style.color = 'black';
		link.style.textDecoration = 'none';
		link.addEventListener('mouseover', () => (link.style.color = '#fff'));
		link.addEventListener('mouseout', () => (link.style.color = 'black'));
	});

	// Append to document body
	document.body.appendChild(footer);
});
