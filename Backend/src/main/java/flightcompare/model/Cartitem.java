package flightcompare.model;

import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.bind.annotation.GetMapping;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="cartitems")
@Getter
@Setter
public class Cartitem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

@Column(nullable = false)
    private String itemname;

    @Column(nullable = false)
    private BigDecimal priceSnapshot;

    @Column(nullable = false)
    private String itemtype;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false) // This creates the Foreign Key
    private Tripcarts cart;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updated_at;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime created_at;



}
