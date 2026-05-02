package flightcompare.controller;

import flightcompare.service.RedisService;
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
	private RedisService redis;
@Autowired
private UserRepo UserRepo;
	@PostMapping
	public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
		String otp = redis.getotp(userDto.getEmail());
		if (otp == null) {
			return ResponseEntity.status(400).body("OTP Expired");
		} else if(userDto.getEmail().isEmpty() && !userDto.getOtp().isEmpty() &&otp.equals(userDto.getOtp())) {
			boolean isSignedUp = signupService.signup(userDto);

			redis.deleteotp(userDto.getEmail());
			if (isSignedUp) {
				return ResponseEntity.status(HttpStatus.CREATED).body("User signed up successfully");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup failed");
			}

		}
		else {
			return ResponseEntity.status(400).body("Invalid Otp");
		}


	}
}
