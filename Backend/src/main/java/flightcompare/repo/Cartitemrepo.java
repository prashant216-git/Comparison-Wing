package flightcompare.repo;

import flightcompare.model.Cartitem;
import flightcompare.model.Tripcarts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Cartitemrepo extends JpaRepository<Cartitem, Long> {


}
