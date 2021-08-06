export function parseQueryString(queryString: string) {
    var vars: string[] = queryString.split("&");
    var queryMap: any = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof queryMap[key] === "undefined") {
            queryMap[key] = value;
            // If second entry with this name
        } else if (typeof queryMap[key] === "string") {
            var arr = [queryMap[key], value];
            queryMap[key] = arr;
            // If third or later entry with this name
        } else {
            queryMap[key].push(value);
        }
    }
    return queryMap;
}

export function getViewportSize() {
    var doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    width = docElem.clientWidth || body.clientWidth,
    height = docElem.clientHeight|| body.clientHeight;
    return { width, height };
}