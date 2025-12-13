package utilities;

import java.io.IOException;

import org.testng.annotations.DataProvider;
import utilities.Excelutilities;
public class Dataproviders {
@DataProvider(name="LoginData")
	public String[][] getdata() throws IOException{
		
	String path=".\\testdata\\cred.xlsx";
	Excelutilities excel=new Excelutilities(path);
	int totalrows=excel.getrowcount("Sheet1");
	System.out.println(totalrows);
	int totalcell=excel.getcellcount("Sheet1", 1);
	System.out.println(totalcell);
	String[][] data=new String[totalrows][totalcell];
	for(int i=1;i<=totalrows;i++) {
		for (int j=0;j<totalcell;j++) {
			data[i-1][j]=excel.getcelldata("Sheet1", i, j);
			System.out.println("single data"+data);
		}
	}
	System.out.println("this data"+data);
	
	return data;
	
}
	

}
