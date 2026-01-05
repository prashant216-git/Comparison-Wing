package flightcompare.pageobjet;

import java.time.Month;
import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class Hotels extends BaseObject {

	public Hotels(WebDriver driver) {
		super(driver);
		
		// TODO Auto-generated constructor stub
	}
@FindBy(xpath="//span[contains(text(),'Hotels')]")
WebElement ht;
	@FindBy(xpath="(//p[contains(@class,'SearchInputField')])[3]")
	WebElement locationbtn;
	@FindBy(xpath="//input[contains(@class,'Input')]")
	WebElement textlocation;
	@FindBy(xpath="(//button[contains(@class,'SearchItems')])[1]")
	WebElement fstsug;
	


	@FindBy(xpath="(//button[contains(@class,'CustomDateField')])[1]")
	WebElement checkinInput;
	@FindBy(xpath="(//button[contains(@class,'CustomDateField')])[2]")
	WebElement checkoutInput;



	@FindBy(xpath="//button[normalize-space()='Search']")
	WebElement searchbtn;
	
	@FindBy(xpath="//p[text()='Price']")WebElement pricefilter;

	// Action methods
	public void clickHotels() {
		ht.click();
	}
	public void setLocation(String value) throws InterruptedException {
		
		js.executeScript("arguments[0].click();", locationbtn);
		textlocation.sendKeys(value);
		Thread.sleep(1000);
		fstsug.click();
	}

	public void openCheckinPicker() {
		checkinInput.click();
	}

	public void openCheckoutPicker() {
		checkoutInput.click();
	}



	public void clickSearch() {
		searchbtn.click();
	}
	public void clickPriceFilter() {
		pricefilter.click();
	}

}