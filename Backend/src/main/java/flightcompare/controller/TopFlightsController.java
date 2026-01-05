package flightcompare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import flightcompare.DTO.FlightResponseDto;
import flightcompare.service.Top10dailycheap;

@RestController
@RequestMapping("/getscheduleflights")
public class TopFlightsController {
@Autowired
private Top10dailycheap cheap;
@GetMapping
public ResponseEntity<List<FlightResponseDto>> getscheduleflights(){
	
	
	return ResponseEntity.ok(cheap.getscheduleflights());
} 
}
