package flightcompare.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import flightcompare.DTO.SendOtpDto;
import flightcompare.DTO.VerifyDto;
import flightcompare.repo.UserRepo;
import flightcompare.service.EmailService;
import flightcompare.service.OTPService;
import flightcompare.ulitit.JwtGenerator;

@RestController
@RequestMapping("/auth")
public class SendOtpController {
@Autowired
	private OTPService otpService;
@Autowired
private JwtGenerator jwtUtil;
@Autowired
private UserRepo UserRepo;
@Autowired
private EmailService emailService;
@PostMapping("/send-otp")
	public ResponseEntity<String> sendOtp(@RequestBody SendOtpDto otpa){ 
		if(UserRepo.existsByEmail(otpa.getEmail())){
			return ResponseEntity.status(409).body("Email Already Exist");
		}
	else if(otpa.getEmail()!=null && !otpa.getEmail().isEmpty()) {
		String otp = otpService.generateOTP();
		


		emailService.sendEmail(otpa.getEmail(),otp);
		System.out.println("Sending OTP " + otp + " to email " + otpa.getEmail());
		
		String token=jwtUtil.generateJWTOTP(otp);
		System.out.println("Generated OTP token: " + token);
		return ResponseEntity.ok(token+ otp);
	}
	else {
		return ResponseEntity.status(400).body("otp sent failed because mail is blank or null");
	}
}
@PostMapping("/verify-otp")
public ResponseEntity<String> verifyOtp(@RequestBody VerifyDto otpdto){
	if(jwtUtil.isTokenValid(otpdto.getToken())) {
		String jwtotp=jwtUtil.degeneratotoken(otpdto.getToken()).get("otp",String.class);
		System.out.println("Extracted OTP from token: " + jwtotp);
		if(jwtotp.equals(otpdto.getOtp())) {
			return ResponseEntity.ok("OTP verified successfully");
		}
		else {
			return ResponseEntity.status(400).body("Invalid OTP");
		}
	}
	else {
	return ResponseEntity.status(400).body("Invalid or expired OTP");}
	}
	
}
