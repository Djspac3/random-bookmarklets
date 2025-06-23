/* you can hide this part (copy manager.style.css into this template litteral before commit!) */
var mainStyle = `/* this file is embeded into manager.js (why: uh its easy to edit here then in litteral string form */
/* remember to copy this before commit into the first few lines of manager.js */
body {
    background-color: #505050;
    overflow: hidden;
}

div #bookmarklist {
    background-image:repeating-linear-gradient(
            45deg,
            #606dbc,
            #606dbc 10px,
            #465298 10px,
            #465298 20px
        );
    overflow-y: scroll;
}`

/* remove all unneeded elements from existance */
for (let removing of document.querySelectorAll('body *')) {
    removing.remove()
}
for (let removing of document.querySelectorAll('head *')) {
    removing.remove()
}

/* start of real script */
var favIcon = document.createElement('link')
favIcon.rel = 'icon'
/* sorry about long icon uri its just modrinth.com's */
favIcon.href = "data:image/png;base64,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"

var style = document.createElement('style')
style.innerHTML = mainStyle

var bookmarklist = document.createElement('div')
bookmarklist.id = 'bookmarklist'

/* append every element here! */
document.head.append(style,favIcon)
document.body.append(bookmarklist)