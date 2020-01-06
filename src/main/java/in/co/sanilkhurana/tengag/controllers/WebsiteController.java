package in.co.sanilkhurana.tengag.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebsiteController {

    // TODO: Fix regex
    @RequestMapping(value = "(api[/\\A-Za-z0-9._-]*)", method = RequestMethod.GET)
    public String something() {
        return "index.html";
    }

}