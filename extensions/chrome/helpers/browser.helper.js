export class BrowserHelper{

    static documentPosition(){
        let viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        let windowX = window.screenX;
        let windowY = window.screenY;

        return {
            left: windowX + ( window.outerWidth - viewportW ),
            top: windowY + ( window.outerHeight - viewportH )
        };
    }

    static getScreenPosition({left, top, width, height}){
        let screeenPosition =  BrowserHelper.documentPosition();

        return {
            left: screeenPosition.left + left,
            top: screeenPosition.top + top,
            width,
            height
        };
    }
}