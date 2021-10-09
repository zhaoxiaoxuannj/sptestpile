package datdtestspringboot.sptestpile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class SptestpileApplication {

    public static void main(String[] args) {
        SpringApplication.run(SptestpileApplication.class, args);
    }

}
