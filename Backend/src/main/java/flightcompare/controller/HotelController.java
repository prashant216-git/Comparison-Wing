package flightcompare.controller;

import flightcompare.DTO.HotelDto;
import flightcompare.DTO.Hotelreqdto;
import flightcompare.scrapper.Hotelsscrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/Hotel")
public class HotelController {

    @Autowired
    private Hotelsscrapper hotelsscrapper;
@PostMapping("/search")
    public ResponseEntity<List<HotelDto>> Hotel(@RequestBody Hotelreqdto dtoo) throws IOException, InterruptedException {
        Hotelsscrapper ht=new Hotelsscrapper();
        List<HotelDto> list = hotelsscrapper.scrapper(dtoo.getCity(), dtoo.getFrommonth() , dtoo.getFromdate(), dtoo.getTomonth(),dtoo.getTodate());
        return ResponseEntity.ok(list);


    }
}
