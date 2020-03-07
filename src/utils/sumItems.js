const sumItems = products => {
	let count = 0;
	products.forEach(function(item) {
		count += parseInt(item.quantity)
	});
	return count;
}
export default sumItems;