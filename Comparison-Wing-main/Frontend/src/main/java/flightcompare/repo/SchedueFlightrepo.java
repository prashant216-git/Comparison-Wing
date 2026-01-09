package flightcompare.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import flightcompare.model.ScheduleFlights;

public interface SchedueFlightrepo extends JpaRepository<ScheduleFlights,Long> {
	
	

}
