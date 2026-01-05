package flightcompare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import flightcompare.DTO.UserDto;
import flightcompare.repo.UserRepo;
import flightcompare.service.SignupService;

@RestController
@RequestMapping("/signup")
public class SignupController {
@Autowired
private SignupService signupService;
@Autowired
private UserRepo UserRepo;
	@PostMapping
	public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
		
		boolean isSignedUp = signupService.signup(userDto);
		if (isSignedUp) {
			return ResponseEntity.status(HttpStatus.CREATED).body("User signed up successfully");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup failed");
		}
	}
}
