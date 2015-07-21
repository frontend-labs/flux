###
yosonjs - Utils
@class utils
@main yosonjs/utils
###
##

window.log = () ->
    enviroment = () ->
        return /(local\.|dev\.|localhost)/gi.test(document.domain)

    if (typeof (console) != "undefined" && enviroment())
        if (typeof (console.log.apply) != "undefined")
            console.log.apply(console, arguments)
            return
        else
            console.log(Array.prototype.slice.call(arguments))
            return
    return

#Retorna el unicode humano
String::removeSigns = ->
    that = this
    table =
        ">": "Mayor de"
        "<": "Menor de"

    for esp of table
        espObj = new RegExp("[" + esp + "]", "gi")
        that = that.replace(espObj, table[esp])
    $.parseJSON "\"" + that + "\""

#remueve los acentos transformandolos a formato unicode
String::removeAccents = ->
    that = this
    espObj = null
    table =
        "ñ": "\\u00F1"
        "Ñ": "\\u00D1"
        "ç": "\\u00C7"
        ">": "Mayor de"
        "<": "Menor de"
        $: "\\u0024"
        "&": "\\u0026"
        "á": "\\u00E1"
        "à": "\\u00E0"
        "ã": "\\u00E3"
        "â": "\\u00E2"
        "ä": "\\u00E4"
        "Á": "\\u00C1"
        "À": "\\u00C0"
        "Ã": "\\u00C3"
        "Â": "\\u00C2"
        "Ä": "\\u00C4"
        "é": "\\u00E9"
        "è": "\\u00E8"
        "ë": "\\u00EB"
        "ê": "\\u00EA"
        "É": "\\u00C9"
        "È": "\\u00C8"
        "Ë": "\\u00CB"
        "Ê": "\\u00CA"
        "í": "\\u00ED"
        "ì": "\\u00EC"
        "ï": "\\u00EF"
        "î": "\\u00EE"
        "Í": "\\u00ED"
        "Ì": "\\u00EC"
        "Ï": "\\u00EF"
        "Î": "\\u00EE"
        "ó": "\\u00F3"
        "ò": "\\u00F2"
        "ö": "\\u00F6"
        "ô": "\\u00F4"
        "õ": "\\u00F5"
        "Ó": "\\u00D3"
        "Ò": "\\u00D2"
        "Ö": "\\u00D6"
        "Ô": "\\u00D4"
        "Õ": "\\u00D5"
        "ú": "\\u00FA"
        "ù": "\\u00F9"
        "ü": "\\u00FC"
        "û": "\\u00FB"
        "Ú": "\\u00DA"
        "Ù": "\\u00D9"
        "Ü": "\\u00DC"
        "Û": "\\u00DB"

    for esp of table
        espObj = new RegExp("[" + esp + "]", "gi")
        that = that.replace(espObj, table[esp])
    that

Cookie =
    create: (c, d, e) ->
        a = ""
        if e
            b = new Date()
            b.setTime b.getTime() + (e * 24 * 60 * 60 * 1000)
            a = "; expires=" + b.toGMTString()
        else
            a = ""

        #document.cookie = c + "=" + d + a + "; path=/application/busqueda/";
        document.cookie = c + "=" + d + a + "; path=/"
        this

    read: (b) ->
        e = b + "="
        a = document.cookie.split(";")
        d = 0

        while d < a.length
            f = a[d]
            f = f.substring(1, f.length)  while f.charAt(0) is " "
            return f.substring(e.length, f.length)  if f.indexOf(e) is 0
            d++
        null

    del: (a) ->
        @create a, "", -1

isArray = (element) ->
    result = false
    result = true  if Object::toString.call(element) is "[object Array]"
    result



## Browser
browser = (->
    a = ((d) ->
        d = d.toLowerCase()
        e = /(chrome)[ \/]([\w.]+)/.exec(d)
        g = /(webkit)[ \/]([\w.]+)/.exec(d)
        f = /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(d)
        i = /(msie) ([\w.]+)/.exec(d)
        c = /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(d)
        h = e or g or f or i or d.indexOf("compatible") < 0 and c or []
        brw: h[1] or ""
        ver: h[2] or "0"
    )(navigator.userAgent)
    b = {}
    if a.brw
        b[a.brw] = true
        b.version = a.ver
    if b.chrome
        b.webkit = true
    else
        b.safari = true    if b.webkit
    b
)()

if (browser.msie)
    #var ieNum = parseInt(browser.version);
    #$("html").addClass("lt-ie"+ ieNum);
    switch browser.version
        when '8.0'
            $('body').addClass('lt-ie8')
            break
        when '9.0'
            $('body').addClass('lt-ie9')
            break

##--------------------------------------------------------------------
class Utils

Utils.prototype.colorLog = (msg, color)->
    log("%c" + msg, "color:" + color + ";font-weight:bold")
    return

sourcePath = 'frontend/'

yOSON.utils = new Utils()

yOSON.utils.colorLog(' > ' + yOSON.module + ' | '+ yOSON.controller + ' | ' + yOSON.action, 'black');

yOSON.utils.colorLog(' > jade view path: ' + sourcePath + 'jadeflux/modules/'+yOSON.module + '/' + yOSON.controller+'/'+yOSON.action+'.jade', 'gray');
yOSON.utils.colorLog(' - - - - - - - - - - - - - - - - ', 'black');
