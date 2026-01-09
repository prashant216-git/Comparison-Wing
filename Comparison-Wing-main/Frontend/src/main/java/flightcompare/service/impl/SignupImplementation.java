package flightcompare.service.impl;

import java.sql.Connection;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import flightcompare.DTO.UserDto;
import flightcompare.TenantService.TenantProvisionService;
import flightcompare.model.SignupUser;
import flightcompare.repo.UserRepo;
import flightcompare.service.SignupService;
import jakarta.transaction.Transactional;
@Service
public class SignupImplementation implements SignupService {

	@Autowired
	private UserRepo repo;
	@Autowired
	private TenantProvisionService tenantProvisionService;
	
	private final PasswordEncoder passwordencoder= new BCryptPasswordEncoder();
	@Override
	@Transactional
	public boolean signup(UserDto userDto) {
		if(repo.existsByUsername(userDto.getUsername())) {
			throw new RuntimeException("Username already exists");
		}
		if(repo.existsByEmail(userDto.getEmail())) {
			throw new RuntimeException("Email already exists");
		}
		
		SignupUser users=new SignupUser();
		String Schema="user_"+userDto.getUsername().toLowerCase();
		users.setUsername(userDto.getUsername());
		users.setEmail(userDto.getEmail());
		users.setPassword(passwordencoder.encode(userDto.getPassword()));
		users.setSchema_name(Schema);
		
		repo.save(users);
		tenantProvisionService.provisionTenant(Schema);
		return true;
	}


}
