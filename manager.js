function removeItems(querySelector) {
	var toRemove = document.querySelectorAll(querySelector);
	for (let bodyItem of toRemove) {
		bodyItem.remove()
	}
}
removeItems('body *')
removeItems('head *')
/* removes the helper function from existance */
removeItems = null

/* remove all unneeded elements from existance */
for (let removing of document.querySelectorAll('*')) {
    if (removing == document.head || removing == document.body) {
        continue
    }
}

/* start of real script */

var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = `body { background-Color: #808080}`

document.head.appendChild(style)