package flightcompare.multitenant;

import org.checkerframework.checker.initialization.qual.Initialized;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.checkerframework.checker.nullness.qual.Nullable;
import org.checkerframework.checker.nullness.qual.UnknownKeyFor;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import flightcompare.TenantService.TenantContext;
@Component
public class CurrentTenantIdentifierResolverImpl implements CurrentTenantIdentifierResolver {

	
	  
	  
	 

	@Override
	public String resolveCurrentTenantIdentifier() {
		// TODO Auto-generated method stub
		System.out.println("Resolving tenant identifier...  switch to tenant: " + TenantContext.getCurrentTenant());
			return TenantContext.getCurrentTenant();
		
	}

	@Override
	public @UnknownKeyFor @NonNull @Initialized boolean validateExistingCurrentSessions() {
		// TODO Auto-generated method stub
		return false;
	}

	

}
