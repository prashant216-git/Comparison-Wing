package TestCases;

import org.testng.annotations.Test;

import PageObjects.Sign_in_page;

public class Signintest extends BaseTest {
@Test
void SignupTestt() throws InterruptedException {
	Sign_in_page sg=new Sign_in_page(driver);
	sg.clickSignInButton();
	sg.enterEmailAddress(prop.getProperty("email"));
	sg.clicklogin();
	sg.enterpass(prop.getProperty("pass"));
	sg.clicklogin();
}
}
