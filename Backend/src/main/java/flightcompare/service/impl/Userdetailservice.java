package flightcompare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import flightcompare.model.SignupUser;
import flightcompare.repo.UserRepo;
@Service
public class Userdetailservice implements UserDetailsService {

	@Autowired
	UserRepo userrepo;
	@Override
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		SignupUser user= userrepo.findByUsername(username);
		return User.withUsername(user.getUsername())
				.password(user.getPassword())
				.build();
				
	}
	
	
}
