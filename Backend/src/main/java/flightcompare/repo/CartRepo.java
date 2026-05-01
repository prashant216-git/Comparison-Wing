package flightcompare.repo;

import flightcompare.model.Tripcarts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Tripcarts, Long> {

    @Query("SELECT c FROM Tripcarts c")
    List<Tripcarts> getAllCartDetails();


}
