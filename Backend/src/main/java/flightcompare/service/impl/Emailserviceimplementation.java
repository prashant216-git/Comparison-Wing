package flightcompare.service.impl;

import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.MimeMessageHelper;
@Service
public class Emailserviceimplementation implements flightcompare.service.EmailService {

	@Value("${spring.mail.username}")
	private String fromEmail;
	
	@Autowired
	private JavaMailSender mailSender;
	
	
	
	@Override
	public void sendEmail(String to, String otp) {
		MimeMessage  message = mailSender.createMimeMessage();
		MimeMessageHelper helper;
		try {
		    String template = Files.readString(Path.of("src/main/resources/Templates/OTP.html"));
            String htmlContent = template.replace("{{OTP}}", otp); 
			helper = new MimeMessageHelper(message,true);
		 
		System.out.println(htmlContent);
		helper.setFrom(fromEmail);
		helper.setTo(to);
		message.setSubject("Confirm Your Registration");
		 helper.setText(htmlContent, true); 
			mailSender.send(message);}
		
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}

	
}
