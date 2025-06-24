import './style.css'
import logo from './logo.svg'

export default function main() {
    alert('Bookmarklet Manager is starting up...')
    /* remove all unneeded elements from existance */
    document.body.innerHTML = ''
    document.head.innerHTML = ''

    /* start of real script */
    var favIcon = document.createElement('link')
    favIcon.rel = 'icon'
    favIcon.href = logo
    favIcon.type = 'image/svg+xml'

    var style = document.createElement('style')
    style.innerHTML = mainStyle

    var bookmarklist = document.createElement('div')
    bookmarklist.id = 'bookmarklist'

    /* append every element here! */
    document.head.append(style,favIcon)
    document.body.append(bookmarklist)
}