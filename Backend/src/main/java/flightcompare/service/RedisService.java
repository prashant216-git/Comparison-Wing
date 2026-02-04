package flightcompare.service;

import org.springframework.stereotype.Service;

@Service
public interface RedisService {

    void saveotp(String email,String otp);

    String getotp(String email);

    void deleteotp(String email);
}

