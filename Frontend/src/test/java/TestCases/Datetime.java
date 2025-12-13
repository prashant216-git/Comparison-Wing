package TestCases;

import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class Datetime {
	public static void main(String[] args) {
		DateTimeFormatter datepat=DateTimeFormatter.ofPattern("dd-MM-yyyy");
LocalDate now= LocalDate.parse("15-11-2025",datepat);
LocalDate earlier= LocalDate.parse("15-11-2026",datepat);
	LocalDate yesterday=now.minusDays(1);
Period dif=Period.between(now, earlier);

// zone
ZonedDateTime znc=ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
System.out.println(dif);
	}
	
	

	
}
