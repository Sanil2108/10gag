package in.co.sanilkhurana.tengag;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {
    // @Override
    // public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
        // registry.addResourceHandler("**.js").addResourceLocations("resources/static/**");
        // registry.addResourceHandler("/js/**").addResourceLocations("/js");
    // }
}