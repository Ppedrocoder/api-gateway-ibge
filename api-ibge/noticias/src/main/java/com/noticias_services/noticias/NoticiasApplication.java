package com.noticias_services.noticias;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class NoticiasApplication {

	public static void main(String[] args) {
		SpringApplication.run(NoticiasApplication.class, args);
	}

}
