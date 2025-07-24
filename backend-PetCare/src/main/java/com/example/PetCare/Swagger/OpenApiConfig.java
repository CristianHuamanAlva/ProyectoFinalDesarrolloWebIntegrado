package com.example.PetCare.Swagger;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de ProyectoModelo")
                        .version("1.0.0")
                        .description("Documentación generada automáticamente con springdoc-openapi")
                        .contact(new Contact()
                                .name("GRUPO 5- DESARROLLO WEB INTEGRADO")
                                .email("davearmandosilvalava@gmail.com")
                                .url("https://tupagina.com")
                        )
                );
    }
}
