package flightcompare.ulitit;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import flightcompare.repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtGenerator {
	@Autowired
	private UserRepo userRepo;
	
	private final String SECRET = "THISISOUROWNPROJECTMADEBYAKASHANDPRASHANT";
	private final SecretKey key=Keys.hmacShaKeyFor(SECRET.getBytes());
	private final long expirationTime = 60*60*1000; // 1 hour in milliseconds
	
	public String generateToken(String username) {
		String schema=userRepo.findschemaNameByUsername(username);
		
		return Jwts.builder()
				.setSubject(username)
				.claim("schema", schema)
				.claim("twifa", "hello")
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expirationTime))
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();

	}
	public Claims degeneratotoken(String token) {
		 return Jwts.parserBuilder()
			        .setSigningKey(key)
			        .build()
			        .parseClaimsJws(token)
			        .getBody();
			}
	
	public boolean isTokenValid(String token) {
	    try {
	      return this.degeneratotoken(token).getExpiration().after(new Date());
	       
	    } catch (Exception e) {
	        return false;
	    }
	}
public String generateJWTOTP(String otp) {
	String token=Jwts.builder()
			.setSubject("OTPToken")
			.claim("otp", otp)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + 5 * 60 * 1000)) // 5 minutes expiration
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	System.out.println("Generated OTP Token: " + token);
	return token;
}



public String getJWTOTP(String token) {
	try {
		Claims claims=degeneratotoken(token);
		return claims.get("otp").toString();
	}catch(Exception e) {
		return null;
	}}
	
	public boolean otpvalid(String token) {
		try {
			return this.degeneratotoken(token).getExpiration().before(new Date());
		}
		catch(Exception e) {
			return false;
		}
	

}}
		

