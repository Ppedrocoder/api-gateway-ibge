package com.ibge_gateway.ibgegateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class IbgegatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(IbgegatewayApplication.class, args);
	}

}
