package flightcompare.pageobjet;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class Sign_in_page extends BaseObject{
	public Sign_in_page(WebDriver driver) {
		super(driver);
	}
	

	@FindBy(xpath = "//div[contains(text(),'Login / Signup')]")
	private WebElement btnsignInButton;

	@FindBy(xpath = "//input[contains(@id,'mobile-number')]")
	private WebElement txtenterEmailAddress;

	@FindBy(xpath = "//button[contains(text(),'Login')]")
	private WebElement btnlogin;

	@FindBy(xpath = "//input[contains(@id,'pass')]")
	private WebElement txtpass;

	
	
	public void clickSignInButton() throws InterruptedException {
	    wait.until(ExpectedConditions.visibilityOf(btnsignInButton));
	    
	    
	    js.executeScript("arguments[0].click()", btnsignInButton);
	}

	public void enterEmailAddress(String email) {
	    txtenterEmailAddress.sendKeys(email);
	}

	public void clicklogin() {
	    btnlogin.click();
	}

	public void enterpass(String pass) {
	    txtpass.sendKeys(pass);
	}

	
}
