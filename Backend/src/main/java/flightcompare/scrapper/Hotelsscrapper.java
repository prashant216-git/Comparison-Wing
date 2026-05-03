package flightcompare.scrapper;

import flightcompare.DTO.HotelDto;
import flightcompare.pageobjet.FlightHomepage;
import flightcompare.pageobjet.Hotels;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
@Component
public class Hotelsscrapper  {

        public List<HotelDto>  scrapper(String city, String frommonth,String fromdate , String tomonth,String todate) throws InterruptedException, IOException {
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

        FileReader fl = null;
        try {
            fl = new FileReader("./src/main/resources/config.properties");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        WebDriver driver=new ChromeDriver(options);
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
            driver.manage().window().maximize();
            Properties prop=new Properties();
            prop=new Properties();
        try {
            prop.load(fl);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        driver.get(prop.getProperty("Url"));
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("document.body.style.zoom='67%'");
            Hotels hotelspage = new Hotels(driver);
            FlightHomepage hm = new FlightHomepage(driver);

            //hm.closelogin();
            hotelspage.clickHotels();
        try {
            hotelspage.setLocation(city);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        hotelspage.openCheckinPicker();
            hotelspage.cal(frommonth,fromdate);
            hotelspage.cal(tomonth,todate);
            hotelspage.clickSearch();
            hotelspage.clickPriceFilter();
            hotelspage.printnamewithprice();
            int count=Math.min(hotelspage.getcount(),10);
            List<HotelDto> dtos=new ArrayList<>();
            for(int i=0;i<count;i++){
                HotelDto dto=new HotelDto();
                dto.setHotelname(hotelspage.getHotelName(i));
                dto.setPrice(hotelspage.pricegetprice(i));
                dtos.add(dto);
            }


            return dtos;











        }




    }

