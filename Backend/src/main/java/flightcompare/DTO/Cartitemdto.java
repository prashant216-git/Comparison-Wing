package flightcompare.DTO;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Cartitemdto {

long cartid;
String itemname;
String itemtype;
BigDecimal price;


}
