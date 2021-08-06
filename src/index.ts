import "./index.css";
import { designSizes, SizeType } from "./size";
import { getViewportSize, parseQueryString } from "./utils";

const elementIFrame = document.getElementById("iframe") as HTMLIFrameElement;
var queryString = location.search.substring(1);
var result = parseQueryString(queryString);
var str = typeof result.src === "string" ? result.src : null;
if (str) {
    elementIFrame.src = str;
}

//Init size
const sizeType = Number(localStorage.getItem("size-type") || "") as SizeType;
const designSize = designSizes[sizeType];
const viewportSize = getViewportSize();
const scale = Math.min((viewportSize.width - 10) / designSize.width, (viewportSize.height - 10) / designSize.height);
elementIFrame.width = String(Math.round(designSize.width * scale));
elementIFrame.height = String(Math.round(designSize.height * scale));

//Register click event handlers
document.getElementById("btn-normal").onclick = function() {
    switchSize(SizeType.NORMAL);
}

document.getElementById("btn-ipad").onclick = function() {
    switchSize(SizeType.IPAD);
}

document.getElementById("btn-iphonex").onclick = function() {
    switchSize(SizeType.IPHONEX);
}

function switchSize(sizeType: SizeType) {
    localStorage.setItem("size-type", String(sizeType));
    window.history.go();
}


