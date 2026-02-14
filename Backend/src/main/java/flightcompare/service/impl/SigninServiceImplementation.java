package flightcompare.service.impl;

import flightcompare.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import flightcompare.DTO.SigninDto;
import flightcompare.DTO.UserDto;
import flightcompare.model.SignupUser;
import flightcompare.repo.UserRepo;
import flightcompare.service.SigninService;
import flightcompare.ulitit.JwtGenerator;
@Service
public class SigninServiceImplementation implements SigninService {
@Autowired
private UserRepo repo;
@Autowired
private JwtGenerator jwtGenerator;
@Autowired
private RedisService redisservice;
private final PasswordEncoder passwordencoder= new BCryptPasswordEncoder();
	@Override
	public String signin(SigninDto signinDto) {
		
		SignupUser user=repo.findByUsername(signinDto.getUsername())!=null? repo.findByUsername(signinDto.getUsername()):null;
			if(user==null) {
				throw new RuntimeException("Username not found");
			}
			else {
				if(!user.getPassword().equals(passwordencoder.encode( signinDto.getPassword())) && user.getPassword()!=null) {
					throw new RuntimeException("Invalid password");
				}
				else {
					String token = jwtGenerator.generateToken(user.getUsername());


					System.out.println("saved");
					return token;
				}
			}
	
		
	}

}
