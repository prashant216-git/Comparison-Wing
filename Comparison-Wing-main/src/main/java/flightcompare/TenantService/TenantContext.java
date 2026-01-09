package flightcompare.TenantService;

import org.springframework.stereotype.Component;

@Component
public class TenantContext {
private static final ThreadLocal<String> currentTenant = new ThreadLocal<>();
 private static final String DEFAULT_SCHEMA="public";


	public static void setCurrentTenant(String object) {
		System.out.println("Setting tenant to: " + object);
		currentTenant.set(object);
	}

	public static String getCurrentTenant() {
		return currentTenant.get()!=null? currentTenant.get():DEFAULT_SCHEMA;
	}

	public static void clear() {
		currentTenant.remove();
	}
}
