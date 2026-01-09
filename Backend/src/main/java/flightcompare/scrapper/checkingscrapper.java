package flightcompare.scrapper;



import flightcompare.DTO.FlightResponseDto;
import flightcompare.pageobjet.Flight_Listpage;
import flightcompare.pageobjet.FlightHomepage;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Component;
@Component
public class checkingscrapper {

public static void main(String []args) throws InterruptedException, IOException {
	ChromeOptions options=new ChromeOptions();
	   
	   options.addArguments("--disable-blink-features=AutomationControlled");
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
        options.setExperimentalOption("useAutomationExtension", false);
        options.addArguments("--start-maximized");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-infobars");
        options.addArguments("--disable-popup-blocking");
        
        
	FileReader fl = new FileReader("./src/main/resources/config.properties")  ;
	WebDriver driver=new ChromeDriver(options);
	driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
	driver.manage().window().maximize();
	Properties prop=new Properties();
	prop=new Properties();
	prop.load(fl);
	driver.get(prop.getProperty("Url"));
	FlightHomepage pg=new FlightHomepage(driver);
	pg.closelogin();
	pg.setSrc("Chennai");
	pg.setDest("Jaipur");
	pg.opencalendar();
	pg.calender("January");
	pg.clickPrice();
	pg.clicksearch();
	
	System.out.println("top 10 cheapest flights are");
	Flight_Listpage flp=new Flight_Listpage(driver);
	flp.clickPriceSort();
	Thread.sleep(2000);
	int totalflights=Math.min(flp.flightcounts(),10);
	
	
	for(int i=0;i<totalflights-1;i++) {
		
		System.out.println(flp.getPrice(i));
	}
	
	driver.quit();
	
}
}
