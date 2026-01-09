package TestCases;

import org.testng.annotations.Test;

import PageObjects.Calender;

public class Hotels extends BaseTest {

    @Test
    public void searchHotels() throws InterruptedException {
        // use fully-qualified name to avoid conflict with this class name
        PageObjects.Hotels hotels = new PageObjects.Hotels(driver);
        Calender cal = new Calender(driver);
hotels.clickHotels();
Thread.sleep(2000);
        // Set location to New Delhi
        hotels.setLocation("New Delhi");

        // Open check-in and select date (example: 15th of next month)
        hotels.openCheckinPicker();
        cal.doublecalender("December"); // change month as needed
        cal.selectDay("15");

        // Open check-out and select date (example: 20th of next month)
       
        cal.selectDay("20");

        // Perform search
        hotels.clickSearch();
        hotels.clickPriceFilter();
    }

}