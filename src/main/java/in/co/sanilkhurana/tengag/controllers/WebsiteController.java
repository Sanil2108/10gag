package in.co.sanilkhurana.tengag.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebsiteController {

    // TODO: Fix regex
    // @RequestMapping(value = "^(?!api)/.+", method = RequestMethod.GET)
    @RequestMapping(value = {"*", "/user/**", "/post/**", "/createPost/**", "/settings/**"}, method = RequestMethod.GET)
    // @RequestMapping(value = "/**", method = RequestMethod.GET)
    public String getWebsite() {
        return "index";
    }

}