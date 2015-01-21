# *************
# *
# * yOSON app_load
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

yOSON.AppSchema.modules.all_modules()
if modu is "" or not yOSON.AppSchema.modules.hasOwnProperty(modu)
	yOSON.AppSchema.modules.by_default()
else
	yOSON.AppSchema.modules[modu].all_controllers()
	if ctrl is "" or not yOSON.AppSchema.modules[modu].controllers.hasOwnProperty(ctrl)
		yOSON.AppSchema.modules[modu].controllers.by_default()
	else
		yOSON.AppSchema.modules[modu].controllers[ctrl].all_actions()
		if acti is "" or not yOSON.AppSchema.modules[modu].controllers[ctrl].actions.hasOwnProperty(acti)
			yOSON.AppSchema.modules[modu].controllers[ctrl].actions.by_default()
		else
			yOSON.AppSchema.modules[modu].controllers[ctrl].actions[acti]()
