var Cookie, isArray;

window.log = function () {
    var enviroment;
    return enviroment = function () {
        return /(local\.|dev\.|localhost)/gi.test(document.domain)
    }, "undefined" != typeof console && enviroment() ? "undefined" != typeof console.log.apply ? void console.log.apply(console, arguments) : void console.log(Array.prototype.slice.call(arguments)) : void 0
}, String.prototype.removeSigns = function () {
    var esp, espObj, table, that;
    that = this, table = {
        ">": "Mayor de",
        "<": "Menor de"
    };
    for (esp in table) espObj = new RegExp("[" + esp + "]", "gi"), that = that.replace(espObj, table[esp]);
    return $.parseJSON('"' + that + '"')
}, String.prototype.removeAccents = function () {
    var esp, espObj, table, that;
    that = this, espObj = null, table = {
        "ñ": "\\u00F1",
        "Ñ": "\\u00D1",
        "ç": "\\u00C7",
        ">": "Mayor de",
        "<": "Menor de",
        $: "\\u0024",
        "&": "\\u0026",
        "á": "\\u00E1",
        "à": "\\u00E0",
        "ã": "\\u00E3",
        "â": "\\u00E2",
        "ä": "\\u00E4",
        "Á": "\\u00C1",
        "À": "\\u00C0",
        "Ã": "\\u00C3",
        "Â": "\\u00C2",
        "Ä": "\\u00C4",
        "é": "\\u00E9",
        "è": "\\u00E8",
        "ë": "\\u00EB",
        "ê": "\\u00EA",
        "É": "\\u00C9",
        "È": "\\u00C8",
        "Ë": "\\u00CB",
        "Ê": "\\u00CA",
        "í": "\\u00ED",
        "ì": "\\u00EC",
        "ï": "\\u00EF",
        "î": "\\u00EE",
        "Í": "\\u00ED",
        "Ì": "\\u00EC",
        "Ï": "\\u00EF",
        "Î": "\\u00EE",
        "ó": "\\u00F3",
        "ò": "\\u00F2",
        "ö": "\\u00F6",
        "ô": "\\u00F4",
        "õ": "\\u00F5",
        "Ó": "\\u00D3",
        "Ò": "\\u00D2",
        "Ö": "\\u00D6",
        "Ô": "\\u00D4",
        "Õ": "\\u00D5",
        "ú": "\\u00FA",
        "ù": "\\u00F9",
        "ü": "\\u00FC",
        "û": "\\u00FB",
        "Ú": "\\u00DA",
        "Ù": "\\u00D9",
        "Ü": "\\u00DC",
        "Û": "\\u00DB"
    };
    for (esp in table) espObj = new RegExp("[" + esp + "]", "gi"), that = that.replace(espObj, table[esp]);
    return that
}, Cookie = {
    create: function (c, d, e) {
        var a, b;
        return a = "", e ? (b = new Date, b.setTime(b.getTime() + 24 * e * 60 * 60 * 1e3), a = "; expires=" + b.toGMTString()) : a = "", document.cookie = c + "=" + d + a + "; path=/", this
    },
    read: function (b) {
        var a, d, e, f;
        for (e = b + "=", a = document.cookie.split(";"), d = 0; d < a.length;) {
            for (f = a[d];
                " " === f.charAt(0) ;) f = f.substring(1, f.length);
            if (0 === f.indexOf(e)) return f.substring(e.length, f.length);
            d++
        }
        return null
    },
    del: function (a) {
        return this.create(a, "", -1)
    }
}, isArray = function (element) {
    var result;
    return result = !1, "[object Array]" === Object.prototype.toString.call(element) && (result = !0), result


};