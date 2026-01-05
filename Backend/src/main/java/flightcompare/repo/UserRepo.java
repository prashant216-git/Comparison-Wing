package flightcompare.repo;

import java.util.List;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import flightcompare.DTO.UserDto;
import flightcompare.model.SignupUser;

public interface UserRepo extends JpaRepository<SignupUser, Long> {
 boolean existsByUsername(String username);
 boolean existsByEmail(String email);
 SignupUser findByUsername(String username);

 @Modifying
 @Query("SELECT schema_name FROM SignupUser")
 List<String> findAllSchemaNames();
 
 @Query("SELECT schema_name FROM SignupUser WHERE username = :username")
 String findschemaNameByUsername(@Param("username") String username);


}
