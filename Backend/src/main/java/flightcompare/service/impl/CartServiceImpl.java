package flightcompare.service.impl;

import flightcompare.DTO.CartDto;
import flightcompare.model.Tripcarts;
import flightcompare.repo.CartRepo;
import flightcompare.service.Cartservice;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service

public class CartServiceImpl implements Cartservice {
@Autowired
private CartRepo cartrepo;

    @Override
    @Transactional
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
}
