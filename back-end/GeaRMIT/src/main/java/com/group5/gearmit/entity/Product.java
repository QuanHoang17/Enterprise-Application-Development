package com.group5.gearmit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "product")
public class Product {
    @Id
    @Column
    @GeneratedValue(generator = "category_generator")
    @GenericGenerator(
        parameters = @Parameter(name = "prefix", value = "item"),
        name = "category_generator",
        strategy = "com.group5.gearmit.generator.PrefixIDGenerator")
    private String id;

    @Column
    private String name;

    @Column
    private Long quantity;

    @Column
    private Date issueDate;

    @ManyToOne(targetEntity = Category.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "category_id", referencedColumnName = "id" )
    private Category category;

    @ManyToOne(targetEntity = Brand.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "brand_id", referencedColumnName = "id" )
    private Brand brand;

    @Column
    private Long price;

    @Column
    private String description;

//    @OneToMany(mappedBy = "product")
//    private List<Image> images;
//
//    @OneToMany(mappedBy = "productColorPK.product")
//    private List<ProductColor> colors;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(id, product.id) &&
                Objects.equals(name, product.name) &&
                Objects.equals(quantity, product.quantity) &&
                Objects.equals(issueDate, product.issueDate) &&
                Objects.equals(category, product.category) &&
                Objects.equals(brand, product.brand) &&
                Objects.equals(price, product.price) &&
                Objects.equals(description, product.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, quantity, issueDate, category, brand, price, description);
    }
}
