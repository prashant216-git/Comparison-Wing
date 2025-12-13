package flightcompare.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.hibernate.cfg.Environment;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

import flightcompare.multitenant.MultiTenantConnectionProviderImpl;
import flightcompare.multitenant.CurrentTenantIdentifierResolverImpl;

@Configuration

public class HibernateConfig {

    private final DataSource dataSource;

    @Autowired
    public HibernateConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public MultiTenantConnectionProvider multiTenantConnectionProvider() {
        return new MultiTenantConnectionProviderImpl(dataSource);
    }

    @Bean
    public CurrentTenantIdentifierResolver currentTenantIdentifierResolver() {
        return new CurrentTenantIdentifierResolverImpl();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder builder) {

        Map<String, Object> hibernateProps = new HashMap<>();

        // REQUIRED for Hibernate multitenancy
      
        hibernateProps.put(Environment.MULTI_TENANT_CONNECTION_PROVIDER, multiTenantConnectionProvider());
        hibernateProps.put(Environment.MULTI_TENANT_IDENTIFIER_RESOLVER, currentTenantIdentifierResolver());

     

        return builder
                .dataSource(dataSource)
                .packages("flightcompare.model")
                .properties(hibernateProps)
                .build();
    }
}
