package flightcompare.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FlightResponseDto {
	private String flightName;
	private String source;
	private String destination;
	private String departureTime;
	private String arrivalTime;
	private String duration;
	private String price;
	
}
