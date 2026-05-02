package Tests;


import Apis.signupapi;
import Modelclasses.Signup;
import io.restassured.response.Response;
import org.testng.annotations.Test;

public class Signuptest {
    signupapi user= new signupapi();
Signup uper= new Signup();

    @Test
    public void Signuptest()
    {
        uper.setUsername("aryan");
        uper.setPassword("123");
        uper.setEmail("aryamn@yopmail.com");
        Response resp= user.Signupp(uper);
        System.out.println(resp.getStatusCode());
        System.out.println(resp.getBody().asString());
    }
}
