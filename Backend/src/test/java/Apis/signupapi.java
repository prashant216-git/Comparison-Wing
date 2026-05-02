package Apis;

import Base.Basetest;
import Modelclasses.Signup;
import io.restassured.RestAssured;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class signupapi{

    public Response Signupp(Signup body){
        return  given()
                .spec(Basetest.getspecs())
                .body(body)
                .when()
                .post(" /signup");
    }


}