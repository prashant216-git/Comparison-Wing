package flightcompare.model;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;

@Entity
@Table(name="Cartitems")
@Getter
@Setter
public class Cartitem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

@Column(nullable = false)
    private String itemname;

    @Column(nullable = false)
    private String itemprice;

    @Column(nullable = false)
    private String itemtype;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false) // This creates the Foreign Key
    private Tripcarts cart;

    @Column(nullable = false)
    @Timestamp
    private LocalDateTime updated_at;

    @Column(nullable = false)
    @Timestamp
    private LocalDateTime created_at;



}
