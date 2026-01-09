package TestCases;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WindowType;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.*;

public class BaseTest {
//Setup 
public WebDriver driver;
public WebDriverWait wait;
public JavascriptExecutor js;
public Actions act;
public Logger logger;
Properties prop;
	@BeforeTest
	public void Setup() throws IOException {
		ChromeOptions options=new ChromeOptions();
		
		   options.addArguments("--user-data-dir=C:\\SeleniumProfilee");
		   options.addArguments("--disable-blink-features=AutomationControlled");
	        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
	        options.setExperimentalOption("useAutomationExtension", false);
	        options.addArguments("--start-maximized");
	        options.addArguments("--no-sandbox");
	        options.addArguments("--disable-dev-shm-usage");
	        options.addArguments("--disable-infobars");
	        options.addArguments("--disable-popup-blocking");
	        
		
		 driver = new ChromeDriver(options);
		
		logger =LogManager.getLogger(this.getClass());
		logger.info("Maximizing");
		
		logger.info("Setting up");
		
		FileReader fl = new FileReader("./src/main/resources/config.properties")  ;
		prop=new Properties();
		prop.load(fl);
		logger.info("opening info");
		driver.get(prop.getProperty("url"));
	}
	
	
	
	
	
	
	
	
	
	
	
	String mail() {
		String mail;
		driver.switchTo().newWindow(WindowType.TAB);
		driver.navigate().to("https://yopmail.com/en/email-generator");
		
		
		try {
			 mail=driver.findElement(By.xpath("//div[@id='egen']//span[1]")).getText();
			}
			catch(Exception e){
				driver.navigate().refresh();
				 mail=driver.findElement(By.xpath("//div[@id='egen']//span[1]")).getText();
			}
		Set<String> handles=driver.getWindowHandles();
		List<String> handles1=new ArrayList<String>(handles);
		driver.switchTo().window(handles1.get(0));
		return mail;
	}
	
String otp() {
	Set<String> handles=driver.getWindowHandles();
	List<String> handles1=new ArrayList<String>(handles);
	driver.switchTo().window(handles1.get(1));
	try {
	driver.findElement(By.xpath("//button[@onclick='egengo();']//span")).click();}
	catch(Exception e){
		driver.navigate().refresh();
		driver.findElement(By.xpath("//button[@onclick='egengo();']//span")).click();
	}
	driver.findElement(By.xpath("//button[@id='refresh']")).click();
	driver.switchTo().frame(0);
	String str=driver.findElement(By.xpath("//p[2]//b[1]")).getText();
	return str.substring(6);
	
}
	
public WebDriver getdriver() {
	return driver;
}
	
}
