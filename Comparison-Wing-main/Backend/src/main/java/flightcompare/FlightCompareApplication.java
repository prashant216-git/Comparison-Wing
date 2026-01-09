package flightcompare;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import flightcompare.TenantService.FlywayMigration;
import flightcompare.repo.UserRepo;
import jakarta.annotation.PostConstruct;
@EnableScheduling
@SpringBootApplication
public class FlightCompareApplication {
	@Autowired
	private UserRepo UserRepo;
	@Autowired
	private FlywayMigration flywayMigration;
@PostConstruct
void init() {
	List<String> schemas=UserRepo.findAllSchemaNames();
	for(String schema:schemas) {
		flywayMigration.migratetenant(schemas);
	}
	System.out.println("Application started successfully.");
}
public static void main(String[] args) {
	SpringApplication.run(FlightCompareApplication.class, args)	;
	
	
	
	
}
}

