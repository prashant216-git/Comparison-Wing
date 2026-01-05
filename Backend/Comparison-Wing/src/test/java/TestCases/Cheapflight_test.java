package TestCases;

import org.testng.annotations.Test;

import PageObjects.Flight_Listpage;
import PageObjects.FlightHomepage;

public class Cheapflight_test extends BaseTest{
@Test
void flightset() throws InterruptedException {
	FlightHomepage pg=new FlightHomepage(driver);
	pg.setSrc("mumbai");
	pg.setDest("New Delhi");
	pg.opencalendar();
	pg.calender("November");
	pg.clickPrice();
	pg.clicksearch();
	
	System.out.println("top 10 cheapest flights are");
	Flight_Listpage flp=new Flight_Listpage(driver);
	flp.clickPriceSort();
	int totalflights=Math.min(flp.flightcounts(),10);
	for(int i=0;i<totalflights-1;i++) {
		System.out.println(flp.getAirlineName(i)+"  "+ flp.getFlightTime(i)+" -> "+flp.getFlightTime(i+1)+" Duration is " +flp.getDuration(i));
	}
}
}
