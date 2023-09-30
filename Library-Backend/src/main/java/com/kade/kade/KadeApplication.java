package com.kade.kade;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@SpringBootApplication
@ComponentScan(basePackages = "com.kade") // Adjust package name
public class KadeApplication {

	public static void main(String[] args) {
		SpringApplication.run(KadeApplication.class, args);
	}

}
