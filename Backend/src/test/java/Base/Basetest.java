package Base;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;
public class Basetest{
    public static RequestSpecification getspecs(){
return new RequestSpecBuilder().setBaseUri("http://localhost:8080/")
        .addHeader("Content-Type","application/json").build();
    }
}

