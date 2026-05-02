package Apis;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static java.lang.Thread.sleep;

public class TEst {
    public static void main(String[] args) throws Exception {

        WebDriver driver =new ChromeDriver();
        driver.get("https://g.zuche.com/self-drive");
        sleep(5000);
driver.findElement(By.xpath("//button[contains(.,'Log')]")).click();
sleep(15000);
while(true){

Thread.sleep(70000);
            driver.findElement(By.xpath("//button[contains(.,'Resend')]")).click();


        } }
}
