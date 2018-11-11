const overlayClass = 'share-inspector-share-overlay0002134';
const inspecterdelimiterClassName = 'share-inspector-dotted0002134';

let delimiters = createDelimiters();

let highlight = document.createElement('div');
highlight.className = overlayClass;
document.body.appendChild(highlight);

document.body.addEventListener("mouseover", (e) => {
    if(canHover(e.target)){
        let overlaySelector = document.querySelector(`.${overlayClass}`);
        let offset = getOffset(e.target);

        let positions = {
            left: offset.left,
            top: offset.top,
            width: e.target.clientWidth,
            height: e.target.clientHeight
        };

        setDelimitersPositions.call(delimiters,positions);
    }
});

document.body.addEventListener("mousemove", (e) => {
    moveOverlay.call(highlight, {
        top: e.pageY,
        left: e.pageX
    });
});

function canHover(elem){
    let computed = getComputedStyle(elem);
    let minWidth = 15;
    let minHeight = 15;


    return !elem.className.includes(overlayClass)
        && computed.getPropertyValue('display') !== 'static'
        && elem.clientHeight >= minHeight
        && elem.clientWidth >= minWidth;
}

function getOffset(elem){
    let offset = {
        top: 0,
        left: 0
    };

    while (elem) {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
    }

    return offset;
}

function createDelimiter(side){
    let delimiter = document.createElement('div');
    delimiter.className = `${inspecterdelimiterClassName} ${side}`;
    document.body.appendChild(delimiter);
    return delimiter;
}

function createDelimiters(){
    return {
        left: createDelimiter('side'),
        top: createDelimiter('floor'),
        right: createDelimiter('side'),
        bottom: createDelimiter('floor')
    };
}

function setDelimitersPositions({left, top, width, height}){
    this.left.style.left = `${left}px`;
    this.left.style.top = `${top}px`;
    this.left.style.height = `${height}px`;

    this.top.style.left = `${left}px`;
    this.top.style.top = `${top}px`;
    this.top.style.width = `${width}px`;

    this.right.style.left = `${left + width}px`;
    this.right.style.top = `${top}px`;
    this.right.style.height = `${height}px`;

    this.bottom.style.left = `${left}px`;
    this.bottom.style.top = `${top + height}px`;
    this.bottom.style.width = `${width}px`;
}

function moveOverlay({left, top}){
    this.style.left = `${left-5}px`;
    this.style.top = `${top-5}px`;
}





highlight.addEventListener("click", function(){
    highlight.style.display = 'none';
    console.log('clicked');
});