package com.armageddon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ArmageddonServerApplication {
	public static final String VERSION = ArmageddonServerApplication.class.getPackage().getImplementationVersion();

	public static void main(String[] args) {
		SpringApplication.run(ArmageddonServerApplication.class, args);
	}
}
