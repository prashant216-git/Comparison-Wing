package PageObjects;

import java.time.Month;
import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class Calender extends BaseObject {

	public Calender(WebDriver driver) {
		super(driver);
		// TODO Auto-generated constructor stub
	}
@FindBy(xpath="(//div[contains(@class,'react-datepicker__month-container')])[1]//div[@role='option' and not(contains(@class,'outside-month'))]")
List<WebElement> rtcl;
@FindBy(xpath="(//div[contains(@class,'react-datepicker__month-container')])[1]//div[@role='option' and not(contains(@class,'outside-month'))]//span[contains(@class,'custom-day-content ')]")
List<WebElement> price;
@FindBy(xpath="(//span[contains(@class,'current-month')])[1]")
WebElement crmnt;
@FindBy(xpath="(//button[contains(@aria-label,'Next Month')])[2]")
WebElement nxtmnth;
@FindBy(xpath="//button[@class='undefined ']")
WebElement dbcumnth;
@FindBy(xpath="(//div[contains(@class,'customHeader')]//span)[1]")
WebElement custommonth;

public void doublecalender(String mnth) {
   
    int tmonth=Month.valueOf(mnth.toUpperCase()).getValue();
    String crmnth=custommonth.getText().split(" ")[0];
    int crmonth=Month.valueOf(crmnth.toUpperCase()).getValue();
    while(tmonth!=crmonth) {
    	
    	
         
    	dbcumnth.click();
    	 crmnth=custommonth.getText().split(" ")[0];
         crmonth=Month.valueOf(crmnth.toUpperCase()).getValue();
    }
}

// Added: select a day (visible text) in the first month container
public void selectDay(String dayText) {
    for (WebElement d : rtcl) {
        if (d.getText().trim().equals(dayText)) {
            js.executeScript("arguments[0].click();", d);
            return;
        }
    }
    throw new RuntimeException("Requested day not found: " + dayText);
}

public void singlecalender(String mnth) {
	   
    int tmonth=Month.valueOf(mnth.toUpperCase()).getValue();
    String crmnth=crmnt.getText().split(" ")[0];
    int crmonth=Month.valueOf(crmnth.toUpperCase()).getValue();
    while(tmonth!=crmonth) {
    	
    	
         
    	nxtmnth.click();
    	 crmnth=crmnt.getText().split(" ")[0];
         crmonth=Month.valueOf(crmnth.toUpperCase()).getValue();
    }

}}