package flightcompare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import flightcompare.DTO.FlightResponseDto;

@Service
public interface Top10dailycheap {
 void TopCheap(String src,String dest,String month); 
 List<FlightResponseDto> getscheduleflights();
 }

