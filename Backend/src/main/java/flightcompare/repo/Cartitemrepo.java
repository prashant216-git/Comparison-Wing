package flightcompare.repo;

import flightcompare.model.Cartitem;
import flightcompare.model.Tripcarts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Cartitemrepo extends JpaRepository<Cartitem, Long> {

    List<Cartitem> findBycart_id(long id);

}
