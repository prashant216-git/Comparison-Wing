package flightcompare.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import flightcompare.service.impl.Userdetailservice;
import flightcompare.ulitit.JwtFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	@Autowired
	private JwtFilter jwtfilter;
	@Autowired
	private Userdetailservice UserdetailService;
@Bean
	protected SecurityFilterChain securityfilterchain(HttpSecurity http) throws Exception{
	
		 http
				 .cors(Customizer.withDefaults())
				 .csrf(csrf->csrf.disable())
		.authorizeHttpRequests(request->request
				.requestMatchers("/auth/**",
			"/v3/api-docs/**",
				"/swagger-ui/**",
				"/auth",
				"/swagger-ui.html/**",
				"/favicon.ico/**",
			"/.well-known/**",
				"/signup/**",
				"/signin/**",
				"/getscheduleflights/**").permitAll()
				
				
				
				.anyRequest().authenticated())
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtfilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
	
	@Bean
	public DaoAuthenticationProvider auhenticationProvider() {
		DaoAuthenticationProvider authprovider =new DaoAuthenticationProvider();
		authprovider.setPasswordEncoder(passwordencoder());
		authprovider.setUserDetailsService(UserdetailService);
		return authprovider;
	}
	
	
	@Bean
	public PasswordEncoder passwordencoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
		return config.getAuthenticationManager();
	}
	
}
