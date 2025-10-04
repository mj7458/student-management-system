package com.studentManagementApp.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI attendanceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Student Attendance API")
                        .description("API for managing student attendance")
                        .version("1.0.0"));
    }

}
