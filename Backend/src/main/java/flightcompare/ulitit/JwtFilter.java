package flightcompare.ulitit;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import flightcompare.TenantService.TenantContext;
import flightcompare.service.impl.Userdetailservice;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtGenerator jwtUtil;
	@Autowired
	private Userdetailservice userservice;
	
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String path = request.getRequestURI();
		System.out.println("JwtFilter: Checking if filtering is required for path: " + path);
		return  path.startsWith("/signin") ||
	            path.startsWith("/signup") ||
	            path.startsWith("/auth") ||
	            path.startsWith("/getscheduleflights") ||

	            // Swagger 100% full exclude
	            path.equals("/swagger-ui.html") ||
	            path.startsWith("/swagger-ui") ||
	            path.startsWith("/v3/api-docs") ||

	            // Static swagger resources
	            path.contains("swagger-ui") ||

	            // Chrome devtools noise
	            path.startsWith("/.well-known") ||
	            path.startsWith("/favicon.ico");
	}
	          
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String username=null;
		String jwt=null;
		try {
			
			String authHeader = request.getHeader("Authorization");
			
			
			// Proceed with the next filter in the chain
			
			System.out.println("JwtFilter: Processing request with Authorization header: " + authHeader);
			if (authHeader != null && authHeader.startsWith("Bearer ")) {
				
				System.out.println("JwtFilter: Processing request with Authorization header: " + authHeader);
				 jwt = authHeader.substring(7);
				username=jwtUtil.degeneratotoken(jwt).getSubject().toString();
				System.out.println("JwtFilter: Processing request with Authorization header: " + jwt+"end" +jwtUtil.degeneratotoken(jwt).get("schema").toString());
				TenantContext.setCurrentTenant(jwtUtil.degeneratotoken(jwt).get("schema").toString());
				System.out.println("JwtFilter: Processing request with Authorization header: " + authHeader);
				
				
			} else {
				System.out.println("JwtFilter: No JWT found in the Authorization header.");
			}
			
			UserDetails userDetails=userservice.loadUserByUsername(username);
			if(jwtUtil.isTokenValid(jwt)) {
				UsernamePasswordAuthenticationToken authtoken= new UsernamePasswordAuthenticationToken(userDetails,null,new ArrayList<>());
				authtoken.setDetails( new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authtoken);
			}

try {
			filterChain.doFilter(request, response);
			System.out.println("JwtFilter: Successfully processed filter chain.");
		}
catch(Exception e) {
			System.out.println("JwtFilter: Exception occurred while processing filter chain: " + e.getMessage());
		}
		}
		catch(Exception e) {
			System.out.println("JwtFilter: Exception occurred during filtering: " + e.getMessage());
		}
		finally {
			System.out.println("JwtFilter: Clearing tenant context.");
			TenantContext.clear();
		}
		
		
		
	}


	
}
