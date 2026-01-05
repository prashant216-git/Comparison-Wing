package flightcompare.service.impl;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import flightcompare.DTO.FlightResponseDto;
import flightcompare.scrapper.Cheapflights;
import flightcompare.model.Flight;

import flightcompare.service.FlightService;
import jakarta.transaction.Transactional;
@Service
public class FlightServiceImplementation implements FlightService {
@Autowired
private flightcompare.repo.Repository repository;
@Autowired
private Cheapflights chf;

	@Override
	public List<FlightResponseDto> getallFlight(String src, String dest, String month) {
		
		System.out.println("Service Implementation: Fetching flights from " + src + " to " + dest + " for month: " + month);
		
		  try {
		        return chf.flightset(src,dest,month);    // return the list directly
		    } 
		    catch (Exception e) {
		        e.printStackTrace();
		        return Collections.emptyList();
		    }
	}
	
	
	private Flight convertToEntity(FlightResponseDto dto) {
		Flight flight=new Flight();
		flight.setFlightName(dto.getFlightName());
		flight.setSource(dto.getSource());
		flight.setDestination(dto.getDestination());
		flight.setDepartureTime(dto.getDepartureTime());
		flight.setArrivalTime(dto.getArrivalTime());
		flight.setDuration(dto.getDuration());
		flight.setPrice(dto.getPrice());
		return flight;
	}
	
	private FlightResponseDto convertToDto(Flight flight) {
		FlightResponseDto dto=new FlightResponseDto();
		dto.setFlightName(flight.getFlightName());
		dto.setSource(flight.getSource());
		dto.setDestination(flight.getDestination());
		dto.setDepartureTime(flight.getDepartureTime());
		dto.setArrivalTime(flight.getArrivalTime());
		dto.setDuration(flight.getDuration());
		dto.setPrice(flight.getPrice());
		return dto;
	}


	@Transactional
	public List<FlightResponseDto> createflights(String src, String dest, String month) {
		
		List<FlightResponseDto> flightDtos=null;
		System.out.println("Reached before TRY block");

		try {
		
			flightDtos=chf.flightset(src,dest,month);
			System.out.println("flights fetched from scrapper");
			List<Flight> flight=flightDtos.stream()
					.map(this::convertToEntity)
					.toList();
			System.out.println("saving flights to database");
			repository.saveAll(flight);
			return flightDtos;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("error in fetching flights from scrapper"+e.getMessage());
		}
		return flightDtos;
		
		
		
		
	}







	

}
