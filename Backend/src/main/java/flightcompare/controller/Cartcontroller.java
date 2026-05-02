package flightcompare.controller;

import flightcompare.DTO.CartDto;
import flightcompare.DTO.Cartitemdto;
import flightcompare.service.Cartservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
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

    @PostMapping("/Create")
    public ResponseEntity<String> create(@RequestBody CartDto cartDto) {
        cartservice.createcart(cartDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Cart created successfully");
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Cartitemdto cartDto) {
        cartservice.addtocart(cartDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Cart created successfully");
    }

}
