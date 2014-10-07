###
Agrega funcionalidad de placeholder a navegadores que no lo soporten
@class placeholder
@main urbania-online/all
@author Ana Reyna
###
yOSON.AppCore.addModule "placeholder", (Sb) ->
  st =
      inputs    : "input, textarea"

  dom = {}
  catchDom = ->
      dom.inputs = $(st.inputs)
      return
  functions = 
    enablePlaceholder : ->
      dom.inputs.placeholder()
      return


  init: ->
    catchDom()
    functions.enablePlaceholder()
    return

, ['js/dist/libs/jquery-placeholder/jquery.placeholder.js']
