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

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Component;
@Component
public class Cheapflights {

public List<FlightResponseDto> flightset(String src,String dest,String month) throws InterruptedException, IOException {
	ChromeOptions options=new ChromeOptions();
	   
	   options.addArguments("--disable-blink-features=AutomationControlled");
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
        options.setExperimentalOption("useAutomationExtension", false);
        options.addArguments("--start-maximized");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-infobars");
        options.addArguments("--disable-popup-blocking");
	options.addArguments("--force-device-scale-factor=0.67");
        
	FileReader fl = new FileReader("./src/main/resources/config.properties")  ;
	WebDriver driver=new ChromeDriver(options);
	driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
	driver.manage().window().maximize();
	JavascriptExecutor js = (JavascriptExecutor) driver;
	js.executeScript("document.body.style.zoom='67%'");
	Properties prop=new Properties();
	prop=new Properties();
	prop.load(fl);
	driver.get(prop.getProperty("Url"));
	FlightHomepage pg=new FlightHomepage(driver);
	Thread.sleep(2000);
//	driver.findElement(By.xpath("//button[@name='close']")).click();
	try {pg.closelogin();}catch (Exception e){
		pg.setSrc(src);
		pg.setDest(dest);
		pg.opencalendar();
		pg.calender(month);
		pg.clickPrice();
		pg.clicksearch();
	}
	System.out.println("top 10 cheapest flights are");
	Flight_Listpage flp=new Flight_Listpage(driver);
	try{flp.clickPriceSort();}
	catch(Exception e){System.out.println(e);}
	Thread.sleep(2000);

	int totalflights=Math.min(flp.flightcounts(),10);
	
	List<FlightResponseDto> flightList=new ArrayList<>();
	for(int i=0;i<totalflights-1;i++) {
		FlightResponseDto flightResponseDto=new FlightResponseDto();
		flightResponseDto.setFlightName(flp.getAirlineName(i));
		flightResponseDto.setArrivalTime(flp.getFlightTime(i));
		flightResponseDto.setDepartureTime(flp.getFlightTime(i+1));
		flightResponseDto.setDuration(flp.getDuration(i));
		flightResponseDto.setPrice(flp.getPrice(i));
		flightResponseDto.setSource(src);
		flightResponseDto.setDestination(dest);
		
		flightList.add(flightResponseDto);
		System.out.println(flightResponseDto.getFlightName()+"  "+ flightResponseDto.getArrivalTime()+" -> "+flightResponseDto.getDepartureTime()+" Duration is " +flightResponseDto.getDuration()+flightResponseDto.getPrice());
	}
	
	driver.quit();
	return flightList;
}
}
