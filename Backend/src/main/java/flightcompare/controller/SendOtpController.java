package flightcompare.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import flightcompare.service.RedisService;
import flightcompare.service.impl.Redisimpl;
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
	@Autowired
	private RedisService redis;

	@PostMapping("/send-otp")
	public ResponseEntity<String> sendOtp(@RequestBody SendOtpDto otpa) {
		if (UserRepo.existsByEmail(otpa.getEmail())) {
			return ResponseEntity.status(409).body("Email Already Exist");
		} else if (otpa.getEmail() != null && !otpa.getEmail().isEmpty()) {
			String otp = otpService.generateOTP();


			emailService.sendEmail(otpa.getEmail(), otp);
			redis.saveotp(otpa.getEmail(), otp);
			System.out.println("Sending OTP " + otp + " to email " + otpa.getEmail());
			return ResponseEntity.status(200).body("Otp Sent Successfully");

		} else {
			return ResponseEntity.status(400).body("otp sent failed because mail is blank or null");
		}
	}

	@PostMapping("/verify-otp")
	public ResponseEntity<String> verifyOtp(@RequestBody VerifyDto otpdto) {
		String otp = redis.getotp(otpdto.getMail());
		if (otp == null) {
			return ResponseEntity.status(400).body("OTP Expired");
		} else if(!otpdto.getMail().isEmpty() && !otpdto.getOtp().isEmpty() &&otp.equals(otpdto.getOtp())) {
			redis.deleteotp(otpdto.getMail());
			return ResponseEntity.ok("OTP verified successfully");
		}
		else {
			return ResponseEntity.status(400).body("Invalid Otp");
		}
	}
}
