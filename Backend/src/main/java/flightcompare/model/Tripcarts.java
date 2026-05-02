package flightcompare.model;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="tripcarts")
@Getter
@Setter
public class Tripcarts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String cartName;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cartitem> items;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updated_at;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime created_at;

}
