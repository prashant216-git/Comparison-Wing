package flightcompare.service.impl;

import java.util.Random;

import org.springframework.stereotype.Service;

import flightcompare.service.OTPService;
@Service
public class OTPImpletation implements OTPService {

	@Override
	public String generateOTP() {
		Random random = new Random();
		int OTP=  random.nextInt(900000) + 100000;
		return Integer.toString(OTP);
	}

}
