package com.kade.kade.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="orders")
@Getter
@Setter
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdAt;    //To automatically get the time of the created order
    private LocalDateTime updatedAt;    //To automatically get the time of the updated order

      @Column(nullable = false)
    private String status;  //This shows if the order is packing,delivering or preocessing
    
    @Column(nullable = false)
    private String name;  //This shows if the order is packing,delivering or preocessing

     @Column(nullable = false)
    private String address;  //This shows if the order is packing,delivering or preocessing

     @Column(nullable = false)
    private String phone;  //This shows if the order is packing,delivering or preocessing

     @Column(nullable = false)
    private String email;  //This shows if the order is packing,delivering or preocessing

    @PrePersist //This can run code lines before comminting(The code lines within this annotation runs before saving data to the data base)
    protected void onCreate(){
        this.createdAt=LocalDateTime.now();
        this.updatedAt=LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt=LocalDateTime.now();
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")  //Foreign key of user entity
    private User user;

}
  