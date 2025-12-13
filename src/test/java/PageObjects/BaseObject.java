package PageObjects;

import java.time.Duration;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;


public class BaseObject {
	WebDriver driver;
	WebDriverWait wait;
	JavascriptExecutor js;
	Actions act;
public BaseObject(WebDriver driver) {
	this.driver=driver;
	this.act=new Actions(driver);
	this.wait=new WebDriverWait(driver,Duration.ofSeconds(5));
	this.js=(JavascriptExecutor) driver;
	PageFactory.initElements(driver,this);
}

}
