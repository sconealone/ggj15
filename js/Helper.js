function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOrder(o) {
    for (var i = o.length - 1; i >= 0; --i) {
        var randomIndex = this.getRandomInt(0, i);
        // swap
        var tmp = o[i];
        o[i] = o[randomIndex];
        o[randomIndex] = tmp;
    }
    return o;
}