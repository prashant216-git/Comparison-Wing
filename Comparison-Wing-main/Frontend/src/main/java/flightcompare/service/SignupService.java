package flightcompare.service;

import org.springframework.stereotype.Service;

import flightcompare.DTO.UserDto;

@Service
public interface SignupService {
	boolean signup(UserDto userDto);
}
