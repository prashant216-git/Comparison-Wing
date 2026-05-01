package flightcompare.controller;

import flightcompare.DTO.CartDto;
import flightcompare.service.Cartservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping
@RestController("/cart")
public class Cartcontroller {

    @Autowired
    private Cartservice cartservice;




    @GetMapping("/all")
    public ResponseEntity<List<CartDto>> getcarts() {
        List<CartDto> carts = cartservice.getallcart();

        if (carts == null || carts.isEmpty()) {
            // Returns 204 No Content - tells the client "I heard you, but there's nothing here"
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

}
