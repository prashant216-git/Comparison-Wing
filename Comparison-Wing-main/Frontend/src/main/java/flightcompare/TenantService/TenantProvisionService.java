package flightcompare.TenantService;
import org.flywaydb.core.Flyway;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

import javax.sql.DataSource;

@Service
public class TenantProvisionService {

    private final DataSource dataSource; // main datasource (connects to DB)

    public TenantProvisionService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void provisionTenant(String schemaName) {
        // 1) create schema (JDBC)
        try (var conn = dataSource.getConnection(); var stmt = conn.createStatement()) {
            stmt.execute("CREATE SCHEMA IF NOT EXISTS " + schemaName);
        } catch (SQLException e) {
            throw new RuntimeException("Cannot create schema " + schemaName, e);
        }

        // 2) run Flyway migrations for this schema
        Flyway flyway = Flyway.configure()
            .dataSource(this.dataSource)
            .schemas(schemaName)                     // important: run in tenant schema
            .locations("classpath:db/migration") 
            // where your tenant scripts live
            .baselineOnMigrate(true) // optional: helpful if schema contains objects already
            .load();

        flyway.migrate();
    }
}
