package com.kade.kade.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "subcategory")
@Data

public class Subcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;


    @Column(nullable = false)
    private String description;


    // @ManyToMany(mappedBy = "subcategory")
    // private Set<Category> category = new HashSet<>();

    

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

        

}
 