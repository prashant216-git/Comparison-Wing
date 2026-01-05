package flightcompare.service;

import java.util.List;

import flightcompare.DTO.FlightResponseDto;
import jakarta.transaction.Transactional;
import flightcompare.DTO.FlightResponseDto;
public interface FlightService {
	
 List<FlightResponseDto> createflights(String src, String dest, String month);

List<FlightResponseDto> getallFlight(String src, String dest, String month);



}
