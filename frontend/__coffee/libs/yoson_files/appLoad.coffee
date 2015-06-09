# *************
# *
# * yOSON appLoad
# *
# * Copyright(c) 2011 yOSON <evangelizandolaweb@gmail.com>
# * Web evangelists <evangelizandolaweb@groups.facebook.com>
# *
# * 
# * MIT Licensed
# 
modu = yOSON.module
ctrl = yOSON.controller
acti = yOSON.action

#log "==> mod: #{modu} - ctrl:#{ctrl} - acti:#{acti}"

yOSON.AppSchema.modules.allModules()
if modu is "" or not yOSON.AppSchema.modules.hasOwnProperty(modu)
	yOSON.AppSchema.modules.byDefault()
else
	yOSON.AppSchema.modules[modu].allControllers()
	if ctrl is "" or not yOSON.AppSchema.modules[modu].controllers.hasOwnProperty(ctrl)
		yOSON.AppSchema.modules[modu].controllers.byDefault()
	else
		yOSON.AppSchema.modules[modu].controllers[ctrl].allActions()
		if acti is "" or not yOSON.AppSchema.modules[modu].controllers[ctrl].actions.hasOwnProperty(acti)
			yOSON.AppSchema.modules[modu].controllers[ctrl].actions.byDefault()
		else
			yOSON.AppSchema.modules[modu].controllers[ctrl].actions[acti]()
