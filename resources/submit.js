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

var vowels = ['a','a','a','a','a','a','a','a','a','e','e','e','e','e','e','e','e','e','e','e','e','i','i','i','i','i','i','i','i','i','o','o','o','o','o','o','o','o','u','u','u','u'];
var consonants = ['b','b','c','c','d','d','d','d','f','f','g','g','g','h','h','j','k','l','l','l','l','m','m','n','n','n','n','n','n','p','p','q','r','r','r','r','r','r','s','s','s','s','t','t','t','t','t','t','v','v','w','w','x','y','y','z'];

function reset() {
	createAnagram();
	document.getElementById('results').innerHTML = '<p>Hit solve to find out!</p>';
}

function createAnagram() {
	var numberOfLetters = 9;
	var numberOfVowels = Math.floor((Math.random() * 2) + 3);
	var numberOfConsonants = numberOfLetters - numberOfVowels;
	var anagram = [];
	for (var i = 0; i < numberOfConsonants; i++) {
		anagram.push(getRandomElement(consonants));
	}
	for (var i = 0; i < numberOfVowels; i++) {
		anagram.push(getRandomElement(vowels));
	}
	anagram = shuffle(anagram).join('');
	document.getElementById('board').value = anagram;
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "/cache/"+anagram, true);
	xhttp.send();
}

function getRandomElement(array) {
	var index = Math.floor(Math.random() * array.length);
	return array[index];
}

function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

if (document.getElementById('board').value === '') createAnagram();
