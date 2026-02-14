package flightcompare.service.impl;

import flightcompare.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;
@Service
public class Redisimpl implements RedisService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    private static final int OTP_TTL = 300;
    @Override
    public void saveotp(String email, String otp) {
        redisTemplate.opsForValue().set(email,otp,OTP_TTL, TimeUnit.SECONDS);

    }

    @Override
    public String getotp(String email){
        return redisTemplate.opsForValue().get(email);
    }



    @Override
    public void deleteotp(String email) {
redisTemplate.delete(email);
    }

    @Override
    public void savejwt(String jwt){
        redisTemplate.opsForValue().set(jwt,"1",3600,TimeUnit.SECONDS);
    }
@Override
    public void deletejwt(String jwt){
        redisTemplate.delete(jwt);
}

@Override
    public boolean getjwt(String jwt){
        if(redisTemplate.opsForValue().get(jwt)!=null && redisTemplate.opsForValue().get(jwt).equalsIgnoreCase("1")){

            return true;
        }
    else{
        return false;
    }
}
}
