package flightcompare.service;


import flightcompare.DTO.CartDto;
import flightcompare.DTO.Cartitemdto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface Cartservice {

    void createcart(CartDto name);



    public List<CartDto> getallcart();


    void  addtocart(Cartitemdto dto);
}
