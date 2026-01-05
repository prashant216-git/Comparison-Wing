package flightcompare.Scheduler;//package flightcompare.Scheduler;
//
//import java.io.IOException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import flightcompare.scrapper.Cheapflights;
//import flightcompare.service.Top10dailycheap;
//
//@Component
//public class DailyScheduler {
//	@Autowired
//	private Top10dailycheap tp10;
//@Scheduled(cron="* */2 * * * ?")
//	public void Topflights() throws InterruptedException, IOException {
//		System.out.println("scheduler running");
//		
//		tp10.TopCheap("Chennai", "New Delhi", "January");
//		System.out.println("saved");
//	}
//}
