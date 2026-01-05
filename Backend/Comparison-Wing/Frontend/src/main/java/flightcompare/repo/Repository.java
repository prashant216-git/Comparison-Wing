package flightcompare.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import flightcompare.model.Flight;

public interface Repository extends JpaRepository<Flight, Long> {

}
