package flightcompare.TenantService;

import java.util.List;

import javax.sql.DataSource;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;



@Service
public class FlywayMigration {

	@Autowired
	private DataSource dataSource;
	
	
	public void migratetenant(List<String> schemanames) {
		for(String schema:schemanames) {
			Flyway flyway=Flyway.configure()
					.dataSource(dataSource)
					.schemas(schema)
					.baselineOnMigrate(true)
					.locations("classpath:db/migration")
					.load();
			flyway.migrate();
		}
		
	} 
}
