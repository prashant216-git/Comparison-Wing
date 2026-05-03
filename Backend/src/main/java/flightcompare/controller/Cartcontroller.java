package flightcompare.controller;

import flightcompare.DTO.CartDto;
import flightcompare.DTO.Cartitemdto;
import flightcompare.model.Cartitem;
import flightcompare.service.Cartservice;
import io.lettuce.core.dynamic.annotation.Param;
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

    @GetMapping("/byid")
    public ResponseEntity<List<Cartitemdto>> getbyid(@RequestParam long id){
       List< Cartitemdto> dto= cartservice.getcartbyid(id);
       if (dto == null || dto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }
       else{
           return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
       }
    }

}
