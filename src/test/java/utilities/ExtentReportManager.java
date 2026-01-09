package utilities;

import static org.testng.Assert.fail;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.slf4j.helpers.Reporter;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import org.testng.TestListenerAdapter;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;

import testcases.BaseTest;

public class ExtentReportManager implements ITestListener {

	public ExtentSparkReporter reporter;
	public ExtentReports extent;
	public ExtentTest test;
	 public void onStart(ITestContext context) {
	        // Spark Reporter
		 String timestamp=new SimpleDateFormat("dd.MM.yyyy_HH.mm.ss").format(new Date());
	System.out.println("ok");
	        reporter = new ExtentSparkReporter(System.getProperty("user.dir")+"/reports/SparkReport"+timestamp+".html");
	        reporter.config().setDocumentTitle("Automation Report");
	        reporter.config().setReportName("Selenium Test Suite");
	        reporter.config().setTheme(Theme.STANDARD);

	        extent = new ExtentReports();
	        extent.attachReporter(reporter);

	        // Add environment info
	        extent.setSystemInfo("OS", context.getCurrentXmlTest().getParameter("os"));
	        extent.setSystemInfo("Browser", "Chrome");
	        extent.setSystemInfo("Tester", "Prashant");
	
}
	 
	 public void onTestSuccess(ITestResult result) {
	       test=extent.createTest(result.getName());
	       test.log(Status.PASS, "Passed");}
	      
	 
	 @Override
	    public void onTestFailure(ITestResult result) {
		 test=extent.createTest(result.getName());
	       test.log(Status.FAIL, "failed");
	       test.log(Status.FAIL,"cause is"+result.getThrowable());
	       Object testClass = result.getInstance();
	       WebDriver driver = ((BaseTest) testClass).getdriver();
	       
String screenshotPath=new String();
	       try {
			 screenshotPath = ((BaseTest) testClass).capturescreenshot(result.getName());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	       test.addScreenCaptureFromPath(screenshotPath);
	    }

	    @Override
	    public void onTestSkipped(ITestResult result) {
	    	test=extent.createTest(result.getName());
	    	test.log(Status.FAIL, "skipped");
	    }
	    @Override
	    public void onFinish(ITestContext result) {
	    	extent.flush();
	    	System.out.println("Extent report flushed.");
	    }
}
