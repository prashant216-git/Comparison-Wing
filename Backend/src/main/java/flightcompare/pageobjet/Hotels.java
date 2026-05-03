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

    @FindBy(xpath="(//div[contains(@class,'CustomDatePicker_customHeader')])[1]//span")WebElement curmonth;
    @FindBy(xpath="(//button[contains(@class,'CustomDatePicker')])[3]//following-sibling::button") WebElement next;
    @FindBy(xpath="//div[contains(@role,'option') and not(contains(@class,'outside'))]") List<WebElement> date;

    @FindBy(xpath="//h2[contains(@class,'totalPrice')]") List<WebElement> price;
    @FindBy(xpath="//h2[contains(@class,'hotelName')]") List<WebElement> hotelname;
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
        js.executeScript("arguments[0].click();", checkoutInput);
    }



    public void clickSearch() {
        searchbtn.click();
    }
    public void clickPriceFilter() {
        pricefilter.click();
    }
    public void cal(String month,String day){
        int tmonth=Month.valueOf(month.toUpperCase()).getValue();
        String crmnth=curmonth.getText().split(" ")[0];
        int crmonth=Month.valueOf(crmnth.toUpperCase()).getValue();
        while(tmonth!=crmonth) {



            js.executeScript("arguments[0].click();", next);
            crmnth=curmonth.getText().split(" ")[0];
            crmonth=Month.valueOf(crmnth.toUpperCase()).getValue();


        }
        for(WebElement element:date) {
            if(element.getText().equals(day)) {
                element.click();
                break;
            }
        }


    }
    public void printnamewithprice(){

        for(int i=0;i<hotelname.size();i++){
            System.out.println(hotelname.get(i).getText() +"->"+price.get(i).getText());
        }
    }

    public String getHotelName(int i){
        return hotelname.get(i).getText();
    }

    public String pricegetprice(int i){
        return price.get(i).getText();
    }

    public int getcount(){
        return price.size();
    }
}