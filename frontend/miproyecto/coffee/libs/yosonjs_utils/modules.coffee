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
        yOSON.AppCore.runModule "select"
        yOSON.AppCore.runModule "validating_cel"
        yOSON.AppCore.runModule "make_numeric_keypad"
        yOSON.AppCore.runModule "vertical_align_middle"
        yOSON.AppCore.runModule "delegate_width_buttons"
        yOSON.AppCore.runModule "equaling_heights"
        yOSON.AppCore.runModule "picker"
        yOSON.AppCore.runModule "call_fancybox"
        yOSON.AppCore.runModule "parsley_validation"
        yOSON.AppCore.runModule "table_striped"
        yOSON.AppCore.runModule "accordion"
        yOSON.AppCore.runModule "add_msie"
        yOSON.AppCore.runModule "init_attr_change"
        yOSON.AppCore.runModule "reload_selectivizr"
        return