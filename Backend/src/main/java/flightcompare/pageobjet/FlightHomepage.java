package flightcompare.pageobjet;

import java.time.Month;
import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class FlightHomepage extends BaseObject {

	public FlightHomepage(WebDriver driver) {
		super(driver);
		// TODO Auto-generated constructor stub
	}
	
	@FindBy(xpath="(//div[@role='Combobox']/p)[2]")
	WebElement src;
	@FindBy(xpath="//input[contains(@id,'input-with-icon-adornment')]")
	WebElement srcname;
	@FindBy(xpath="(//div[@role='Combobox']/p)[5]")
	WebElement dest;
	@FindBy(xpath="((//ul)[2]//li)[1]")
	WebElement autosug;
	@FindBy(xpath="//div[@aria-label='Departure Date inputbox']//div[2]")
	WebElement cl;
	@FindBy(xpath="(//div[contains(@class,'react-datepicker__month-container')])[1]//div[@role='option' and not(contains(@class,'outside-month'))]//span[contains(@class,'custom-day-content ')]")
	List<WebElement> price;
	@FindBy(xpath="(//span[contains(@class,'current-month')])[1]")
	WebElement crmnt;
	@FindBy(xpath="(//button[contains(@aria-label,'Next Month')])[2]")
	WebElement nxtmnth;
	@FindBy(xpath="(//ul)[2]//li")
	WebElement txtadult;
	@FindBy(xpath="//button[normalize-space()='Search']")
	WebElement searchbtn;
	@FindBy(xpath="(//div[contains(@class,'SearchPanel')]//a[contains(@href,'hotel')]//button)[1]")
	WebElement htl;
	public void setSrc(String value) throws InterruptedException {
        src.click();
        srcname.sendKeys(value);
        Thread.sleep(1000);
        autosug.click();
    }

    public void setDest(String value) throws InterruptedException {
        dest.click();
        srcname.sendKeys(value);
        Thread.sleep(1000);
        autosug.click();
    }
public void opencalendar() {
	cl.click();
}
    public void calender(String mnth) {
        
        int tmonth=Month.valueOf(mnth.toUpperCase()).getValue();
        String crmnth=crmnt.getText().split(" ")[0];
        int crmonth=Month.valueOf(crmnth.toUpperCase()).getValue();
        while(tmonth!=crmonth) {
        	
        	
             
        	nxtmnth.click();
        	 crmnth=crmnt.getText().split(" ")[0];
             crmonth=Month.valueOf(crmnth.toUpperCase()).getValue();
        }
    }

    public void clickPrice() {
        int min=Integer.MAX_VALUE;
        WebElement k=null;
        
    	for(WebElement e:price) {
    		int price=Integer.parseInt(e.getAttribute("textContent").replaceAll("[^0-9]", "").trim());
    		
    		if(min>price) {
    			min=price;
    			k=e;
    			
    		}
    	}
    	js.executeScript("arguments[0].click();", k);
    }

   

   public void clicksearch() {
	   searchbtn.click();
   }

    public void selectTxtadult() {
        txtadult.click();
    }
    
	
}
