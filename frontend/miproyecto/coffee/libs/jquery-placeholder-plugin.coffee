#jquery-placeholder-plugin
#https://github.com/andrewrjones/jquery-placeholder-plugin/blob/master/src/jquery.placeholder.js
#http://andrew-jones.com/jquery-placeholder-plugin
(($) ->
  "use strict"
  $.extend placeholder:
    settings:
      focusClass: "placeholderFocus"
      activeClass: "placeholder"
      overrideSupport: false
      preventRefreshIssues: true

  
  # check browser support for placeholder
  $.support.placeholder = "placeholder" of document.createElement("input")
  
  # Replace the val function to never return placeholders
  $.fn.plVal = $.fn.val
  $.fn.val = (value) ->
    el = undefined
    if typeof value is "undefined"
      el = $(this[0])
      return ""  if el.hasClass($.placeholder.settings.activeClass) and el.plVal() is el.attr("placeholder")
      $.fn.plVal.call this
    else
      el = $(this[0])
      currentValue = el.plVal()
      returnValue = $(this).plVal(value)
      if el.hasClass($.placeholder.settings.activeClass) and currentValue is el.attr("placeholder")
        el.removeClass $.placeholder.settings.activeClass
        return returnValue
      $.fn.plVal.call this, value

  
  # Clear placeholder values upon page reload
  $(window).bind "beforeunload.placeholder", ->
    els = $("input." + $.placeholder.settings.activeClass)
    els.val("").attr "autocomplete", "off"  if els.length > 0
    return

  
  # plugin code
  $.fn.placeholder = (opts) ->
    opts = $.extend({}, $.placeholder.settings, opts)
    
    # we don't have to do anything if the browser supports placeholder
    return this  if not opts.overrideSupport and $.support.placeholder
    @each ->
      $el = $(this)
      
      # skip if we do not have the placeholder attribute
      return  unless $el.is("[placeholder]")
      
      # we cannot do password fields, but supported browsers can
      return  if $el.is(":password")
      
      # Prevent values from being reapplied on refresh
      $el.attr "autocomplete", "off"  if opts.preventRefreshIssues
      $el.bind "focus.placeholder", ->
        $el = $(this)
        $el.val("").removeClass(opts.activeClass).addClass opts.focusClass  if @value is $el.attr("placeholder") and $el.hasClass(opts.activeClass)
        return

      $el.bind "blur.placeholder", ->
        $el = $(this)
        $el.removeClass opts.focusClass
        $($el.val($el.attr("placeholder"))).addClass opts.activeClass  if @value is ""
        return

      $el.triggerHandler "blur"
      
      # Prevent incorrect form values being posted
      $el.parents("form").submit ->
        $el.triggerHandler "focus.placeholder"
        return

      return


  return
) jQuery