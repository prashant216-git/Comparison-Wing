package TestCases;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

public class BrokenlinkTest extends BaseTest {
@Test
void brokencheck()   {
	List<WebElement> links=driver.findElements(By.tagName("a"));
	int brk=0;
	System.out.println(links.size());
	for (WebElement e: links) {
		String href = e.getAttribute("href");

		System.out.println(e.getAttribute("href"));
		if(href==null || href.isEmpty()) {brk++;}
		try {	
			HttpClient client = HttpClient.newBuilder()
			        .connectTimeout(Duration.ofSeconds(5))
			        .followRedirects(HttpClient.Redirect.NORMAL)
			        .build();

			HttpRequest request = HttpRequest.newBuilder()
			        .uri(URI.create(href))
			        .timeout(Duration.ofSeconds(5))
			        .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36")
			        .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
			        .GET()
			        .build();

			HttpResponse<Void> response = client.send(request, HttpResponse.BodyHandlers.discarding());
			System.out.println(href + " → " + response.statusCode());
		System.out.println("yes here");
		
		
	}
	catch(Exception ex){
		System.out.println(ex);
	}	
	}
	System.out.println("broken links ="+brk);
}
}
