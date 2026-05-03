package flightcompare.service.impl;

import flightcompare.DTO.CartDto;
import flightcompare.DTO.Cartitemdto;
import flightcompare.model.Cartitem;
import flightcompare.model.Tripcarts;
import flightcompare.repo.CartRepo;
import flightcompare.repo.Cartitemrepo;
import flightcompare.service.Cartservice;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CartServiceImpl implements Cartservice {
@Autowired
private CartRepo cartrepo;
@Autowired
private Cartitemrepo crepo;

    @Transactional
    @Override
    public void createcart(CartDto dto) {
Tripcarts tcart=toEntity(dto);
       cartrepo.save(tcart);

    }



    public List<CartDto> getallcart() {
        return cartrepo.getAllCartDetails()         // Fetch all Cart entities from DB
                .stream()                  // Start a stream for transformation
                .map(this::toDto)    // Convert each Entity to DTO
                .toList();                 // Collect into a List (Java 16+)
    }
@Transactional
    @Override
    public void  addtocart(Cartitemdto dto) {
        Tripcarts cart = cartrepo.findById(dto.getCartid())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        Cartitem item = new Cartitem();
item.setItemtype(dto.getItemtype());
item.setItemname(dto.getItemname());
item.setPriceSnapshot(dto.getPrice());



        // 🔥 Set FK (this sets cart_id)
        item.setCart(cart);

        // 3️⃣ Save
        crepo.save(item);


    }

    @Override
    public List<Cartitemdto> getcartbyid(long id){
List<Cartitem> entity =  crepo.getcartbyid(id);
List<Cartitemdto> dtos = new ArrayList<>();
dtos=entity.stream().map(this::toDtoo).toList();
return dtos;
    }



    public CartDto toDto(Tripcarts entity) {
        if (entity == null) {
            return null;
        }
        CartDto dto = new CartDto();
        dto.setId(entity.getId());
        dto.setName(entity.getCartName()); // Mapping cartName -> name
        return dto;
    }



    // Convert DTO to Entity
    public static Tripcarts toEntity(CartDto dto) {
        if (dto == null) {
            return null;
        }
        Tripcarts entity = new Tripcarts();
        entity.setId(dto.getId());
        entity.setCartName(dto.getName()); // Mapping name -> cartName
        return entity;
    }

    public Cartitemdto toDtoo(Cartitem entity) {
        Cartitemdto dto = new Cartitemdto();

        dto.setCartid(entity.getCart().getId());
        dto.setItemname(entity.getItemname());
        dto.setItemtype(entity.getItemtype());
        dto.setPrice(entity.getPriceSnapshot());

        return dto;
    }
}
