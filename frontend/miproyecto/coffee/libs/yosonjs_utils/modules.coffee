yOSON.AppSchema.modules =
    "my_module":
        "controllers":
            "account":
                "actions":
                    "login": () ->
                        yOSON.AppCore.runModule "forgot_pin"
                        return
                    "by_default": () ->
                        return
                "all_actions": () ->
                    return
            "game":
                "actions":
                    "index": () ->
                        yOSON.AppCore.runModule "aladino"
                        yOSON.AppCore.runModule "timer"
                        return
                    "by_default": () ->
                        return
                "all_actions": () ->
                    return
            "affiliation":
                "actions":
                    "affiliation_step_1": () ->
                        yOSON.AppCore.runModule "expiry"
                        return
                    "affiliation_step_3": () ->
                        yOSON.AppCore.runModule "countdown"
                        return
                    "by_default": () ->
                        return
                "all_actions": () ->
                    return
            "by_default": () ->
                return
        "all_controllers": () ->
            return
    "by_default": () ->
        return
    "all_modules": () ->
        yOSON.AppCore.runModule "picker"
        yOSON.AppCore.runModule "table_striped"
        yOSON.AppCore.runModule "add_msie"
        yOSON.AppCore.runModule "reload_selectivizr"
        return