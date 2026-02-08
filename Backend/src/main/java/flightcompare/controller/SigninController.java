package flightcompare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import flightcompare.DTO.SigninDto;
import flightcompare.DTO.UserDto;
import flightcompare.service.SigninService;
import flightcompare.ulitit.JwtGenerator;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/auth")
public class SigninController {
	@Autowired
	private SigninService signinService;
	@Autowired
	private JwtGenerator jwtGenerator;
@Autowired
private AuthenticationManager authenticationmanager;
	
	  @PostMapping("/signin")
	  public ResponseEntity<String> signin(@RequestBody SigninDto
	  userDto) {
	  System.out.println("SigninController: Received signin request for user: " +userDto.getUsername());

	  authenticationmanager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getUsername(),userDto.getPassword()));
	  String token=jwtGenerator.generateToken(userDto.getUsername());

	  return ResponseEntity.status(HttpStatus.OK).body(token); }
	 
	


}
