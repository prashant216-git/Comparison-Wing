package flightcompare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import flightcompare.DTO.FlightResponseDto;
import flightcompare.service.FlightService;

@RestController
@RequestMapping("/flights")
public class FlightController {
@Autowired
private FlightService flightService;

@GetMapping("/all")
public ResponseEntity<List<FlightResponseDto>> getAllFlights(@RequestParam(required = true) String source,
											@RequestParam(required = true) String destination,@RequestParam(required = true) String month) {
	System.out.println("FlightController: Received request to get all flights from " + source + " to " + destination + " for month " + month);
	List<FlightResponseDto> flights = flightService.getallFlight(source, destination, month);
	return ResponseEntity.ok(flights);
	//
	
}

@PostMapping("/create")
public ResponseEntity<List<FlightResponseDto>> getFlightService() {
	System.out.println("FlightController: Received request to create flights");
	List<FlightResponseDto> flt=flightService.createflights("DEL","BOM","january");

	return ResponseEntity
			.status(HttpStatus.CREATED)
			.body(flt);
}
}
