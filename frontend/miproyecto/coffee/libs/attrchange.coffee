#
#A simple jQuery function that can add listeners on attribute change.
#http://meetselva.github.io/attrchange/
#
#About License:
#Copyright (C) 2013 Selvakumar Arumugam
#You may use attrchange plugin under the terms of the MIT Licese.
#https://github.com/meetselva/attrchange/blob/master/MIT-License.txt
#
(($) ->
  isDOMAttrModifiedSupported = ->
    p = document.createElement("p")
    flag = false
    if p.addEventListener
      p.addEventListener "DOMAttrModified", (->
        flag = true
        return
      ), false
    else if p.attachEvent
      p.attachEvent "onDOMAttrModified", ->
        flag = true
        return

    else
      return false
    p.setAttribute "id", "target"
    flag
  checkAttributes = (chkAttr, e) ->
    if chkAttr
      attributes = @data("attr-old-value")
      if e.attributeName.indexOf("style") >= 0
        attributes["style"] = {}  unless attributes["style"] #initialize
        keys = e.attributeName.split(".")
        e.attributeName = keys[0]
        e.oldValue = attributes["style"][keys[1]] #old value
        e.newValue = keys[1] + ":" + @prop("style")[$.camelCase(keys[1])] #new value
        attributes["style"][keys[1]] = e.newValue
      else
        e.oldValue = attributes[e.attributeName]
        e.newValue = @attr(e.attributeName)
        attributes[e.attributeName] = e.newValue
      @data "attr-old-value", attributes #update the old value object
    return
  
  #initialize Mutation Observer
  MutationObserver = window.MutationObserver or window.WebKitMutationObserver
  $.fn.attrchange = (a, b) ->
    if typeof a is "object" #core
      attrchangeFx._core.call this, a
    #extensions/options
    else attrchangeFx._ext.call this, a, b  if typeof a is "string"

  attrchangeFx =
    _core: (o) ->
      cfg =
        trackValues: false
        callback: $.noop

      
      #backward compatibility
      if typeof o is "function"
        cfg.callback = o
      else
        $.extend cfg, o
      if cfg.trackValues #get attributes old value
        @each (i, el) ->
          attributes = {}
          attr = undefined
          i = 0
          attrs = el.attributes
          l = attrs.length

          while i < l
            attr = attrs.item(i)
            attributes[attr.nodeName] = attr.value
            i++
          $(this).data "attr-old-value", attributes
          return

      if MutationObserver #Modern Browsers supporting MutationObserver
        mOptions =
          subtree: false
          attributes: true
          attributeOldValue: cfg.trackValues

        observer = new MutationObserver((mutations) ->
          mutations.forEach (e) ->
            _this = e.target
            
            #get new value if trackValues is true
            
            ###*
            @KNOWN_ISSUE: The new value is buggy for STYLE attribute as we don't have
            any additional information on which style is getting updated.
            ###
            e.newValue = $(_this).attr(e.attributeName)  if cfg.trackValues
            cfg.callback.call _this, e
            return

          return
        )
        return @data("attrchange-method", "Mutation Observer").data("attrchange-obs", observer).each(->
          observer.observe this, mOptions
          return
        )
      else if isDOMAttrModifiedSupported() #Opera
        #Good old Mutation Events
        return @data("attrchange-method", "DOMAttrModified").on("DOMAttrModified", (event) ->
          event = event.originalEvent  if event.originalEvent #jQuery normalization is not required
          event.attributeName = event.attrName #property names to be consistent with MutationObserver
          event.oldValue = event.prevValue #property names to be consistent with MutationObserver
          cfg.callback.call this, event
          return
        )
      else if "onpropertychange" of document.body #works only in IE
        return @data("attrchange-method", "propertychange").on("propertychange", (e) ->
          e.attributeName = window.event.propertyName
          
          #to set the attr old value
          checkAttributes.call $(this), cfg.trackValues, e
          cfg.callback.call this, e
          return
        )
      this

    _ext: (s, o) -> #attrchange option/extension
      switch s
        when "disconnect"
          @each(->
            attrchangeMethod = $(this).data("attrchange-method")
            if attrchangeMethod is "propertychange" or attrchangeMethod is "DOMAttrModified"
              $(this).off attrchangeMethod
            else $(this).data("attrchange-obs").disconnect()  if attrchangeMethod is "Mutation Observer"
            return
          ).removeData "attrchange-method"

  return
) jQuery