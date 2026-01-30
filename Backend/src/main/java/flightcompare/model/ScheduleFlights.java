package flightcompare.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "ScheduleFlights" ,schema="public",
indexes= {@Index(name="idx_source",columnList="source"),
		@Index(name="idx_destination",columnList="destination")}
)
public class ScheduleFlights {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private long id;
@Column(nullable = true)
private String flightName;
@Column(nullable = true)
private String source;
@Column(nullable = true)
private String destination;
@Column(nullable = true)
private String arrivalTime;
@Column(nullable = true)
private String departureTime;

@Column(nullable = true)
private String price;
@Column(nullable = true)
private String duration;
@CreationTimestamp
@Column(nullable = true)
private LocalDateTime created_at;
@UpdateTimestamp
@Column(nullable = true)
private LocalDateTime updated_at;

}