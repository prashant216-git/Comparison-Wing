package flightcompare.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import flightcompare.DTO.FlightResponseDto;
import flightcompare.model.Flight;
import flightcompare.model.ScheduleFlights;
import flightcompare.repo.SchedueFlightrepo;
import flightcompare.scrapper.Cheapflights;
import flightcompare.service.Top10dailycheap;
import jakarta.transaction.Transactional;

@Service
public class TOp10dailycheapimplementation implements Top10dailycheap {
@Autowired
private SchedueFlightrepo sfr;
	@Transactional
	@Override
	public void TopCheap(String src, String dest, String month) {
		Cheapflights flight=new Cheapflights();
		List<FlightResponseDto> fldtos =new ArrayList<>();
		try {
			System.out.println("reached scrapper");
			 fldtos=flight.flightset(src, dest, month);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		List<ScheduleFlights> flg=fldtos.stream().map(this::convertToEntity).toList();
		System.out.println("saving");
		sfr.deleteAllInBatch();
		sfr.saveAll(flg);
		
	}
	@Transactional
	public List<FlightResponseDto> getscheduleflights() {
		List<ScheduleFlights> flg= sfr.findAll();
		List<FlightResponseDto> dto=flg.stream().map(this::convertToDto).toList();
		return dto;
	}
	
	private ScheduleFlights convertToEntity(FlightResponseDto dto) {
		ScheduleFlights flight=new ScheduleFlights();
		flight.setFlightName(dto.getFlightName());
		flight.setSource(dto.getSource());
		flight.setDestination(dto.getDestination());
		flight.setDepartureTime(dto.getDepartureTime());
		flight.setArrivalTime(dto.getArrivalTime());
		flight.setDuration(dto.getDuration());
		flight.setPrice(dto.getPrice());
		return flight;
	}
	private FlightResponseDto convertToDto(ScheduleFlights flight) {
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
	

}
