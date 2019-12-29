package in.co.sanilkhurana.tengag.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebsiteController {

    @RequestMapping(value = "/**/{path:[^\\.]*}", method = RequestMethod.GET)
    public String something() {
        return "index.html";
    }

}