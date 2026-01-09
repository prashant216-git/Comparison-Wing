package utilities;

import java.io.*;

import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.*;

public class Excelutilities {
  public FileInputStream fi;
  public FileOutputStream fo;
  public XSSFWorkbook workbook;
  public XSSFSheet sheet;
  public XSSFRow row;
  public XSSFCell cell;
  public XSSFCellStyle style;
  String path;
   public Excelutilities(String pth) {
	   this.path=pth;
   }
   public int getrowcount(String sheetname) throws IOException {
	   fi=new FileInputStream(path);
	   workbook=new XSSFWorkbook(fi);
	   sheet=workbook.getSheet(sheetname);
	   int rowcount=sheet.getLastRowNum();
	   
	   workbook.close();
	   fi.close();
	   return rowcount;
	   
   }
   public int getcellcount(String sheetname,int rownum) throws IOException {
	   fi=new FileInputStream(path);
	   workbook=new XSSFWorkbook(fi);
	   sheet=workbook.getSheet(sheetname);
	   row=sheet.getRow(rownum);
	   int cellcount=row.getLastCellNum();
	   
	   workbook.close();
	   fi.close();
	   return cellcount;
	   }
   public String getcelldata(String sheetname,int rownum,int cellnum) throws IOException {
	   fi=new FileInputStream(path);
	   workbook=new XSSFWorkbook(fi);
	   sheet=workbook.getSheet(sheetname);
	   row=sheet.getRow(rownum);
	   cell=row.getCell(cellnum);
	   String data;
	   DataFormatter formatter=new DataFormatter();
	   try {
		   data=formatter.formatCellValue(cell);
		   
	   }catch(Exception e) {data="";}
	   workbook.close();
	   fi.close();
	   return data;
   }
   public void  setcelldata(String sheetname,int rownum,int cellnum,String data) throws IOException {
	   File xls=new File(path);
	   if(!xls.exists()) {workbook =new XSSFWorkbook();
	   fo=new FileOutputStream(path);
	   workbook.write(fo);}
	   
	   
	   fi=new FileInputStream(path);
	   workbook=new XSSFWorkbook(fi);
	   
	   if(workbook.getSheetIndex(sheetname)==-1) {
		   workbook.createSheet(sheetname);
		   sheet=workbook.getSheet(sheetname);
	   }
	   if(sheet.getRow(rownum)==null) {
		   sheet.createRow(rownum);
		   row=sheet.getRow(rownum);
		   
	   }
	   cell=row.createCell(cellnum);
	   cell.setCellValue(data);
	   fo=new FileOutputStream(path);
	   workbook.write(fo);
	   workbook.close();
	   fi.close();
	   fo.close();
		   
	   }
	   
   
   
   }

