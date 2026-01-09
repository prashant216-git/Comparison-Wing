package flightcompare.pageobjet;

import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class Flight_Listpage extends BaseObject {

	public Flight_Listpage(WebDriver driver) {
		super(driver);
		// TODO Auto-generated constructor stub
	}
@FindBy(xpath="//p[contains(@aria-label,'Adult')]")
WebElement pricesort;

@FindBy(xpath="//div[contains(@class,'airline-name')]")
List<WebElement> ariname;

@FindBy(xpath="//p[contains(@class,'mob-duration')]")
List<WebElement> duration;

@FindBy(xpath="//p[contains(@class,'mob-time')]")
List<WebElement> times;

@FindBy(xpath="//div[contains(@class,'branded-fares-con')]//div[contains(@class,'selected')]//p[contains(@class,'fare-price')]")
List<WebElement> price;
public void clickPriceSort() {
 pricesort.click();
 
}

public int flightcounts() {
	return ariname.size();
}
public String getAirlineName(int index) {
 return ariname.get(index).getText().trim();
}


public String getDuration(int index) {
 return duration.get(index).getText().trim();
}


public String getFlightTime(int index) {
 return times.get(index).getText().trim();
 
}
public String getPrice(int index) {
 return price.get(index).getText().trim();



}

}
