package com.dream.star;

import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

//开启dubbo配置
@EnableDubboConfiguration
@SpringBootApplication
//扫描过滤器
@ServletComponentScan("com.dream.star.web.filter")
public class Ch04StarConsumerApplication {

	public static void main(String[] args) {
		SpringApplication.run(Ch04StarConsumerApplication.class, args);
	}

}
