import logo from './logo.svg';
import styleSheet from './style.css'

export function addElements() {
    var pageIcon = document.createElement('link');
    pageIcon.rel = 'icon';
    pageIcon.type = 'image/png';
    pageIcon.href = logo;
    document.head.appendChild(pageIcon);
    var logoElement = document.createElement('img');
    logoElement.src = logo;
    logoElement.id = 'logo';
    logoElement.style.width = '100px';
    document.body.appendChild(logoElement);

    var styleElement = document.createElement('style');
    styleElement.textContent = styleSheet;
    document.head.appendChild(styleElement);
}

export function main() {

}