function submit() {
	var val = document.getElementById('board').value;
	window.location.href = '/' + val;
}

function newWord() {
	window.location.href = '/';
}

function checkEnter(e) {
	if (e.keyCode == 13) submit();
}