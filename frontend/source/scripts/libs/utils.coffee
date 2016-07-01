###
Utils
###

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
