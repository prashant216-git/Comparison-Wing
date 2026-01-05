package flightcompare.service;

import org.springframework.stereotype.Service;


import flightcompare.DTO.SigninDto;
import flightcompare.DTO.UserDto;
@Service
public interface SigninService {
String signin(SigninDto signinDto);
}
