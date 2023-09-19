package com.kade.kade.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "book")

public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    private Double price;
    
    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String description;

     @Column(nullable = false)
    private String imgLink;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;


//   @ManyToMany(cascade = {CascadeType.ALL},fetch=FetchType.EAGER)
//     @JoinTable(
//         name="book_category",
//         joinColumns={@JoinColumn(name="book_id")},  //As now we are in the order entity,joint coulumn of the order entity is the order_id
//         inverseJoinColumns = {@JoinColumn(name = "category_id")} //joint column of the other entity(cart) is cart_id
//     )
//     private Set<Category> category = new HashSet<>();

  
}
