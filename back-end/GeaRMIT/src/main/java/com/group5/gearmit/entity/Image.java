package com.group5.gearmit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "image")
public class Image {
    @Id
    @Column
    @GeneratedValue(generator = "image_generator")
    @GenericGenerator(
        parameters = @Parameter(name = "prefix", value = "image"),
        name = "image_generator",
        strategy = "com.group5.gearmit.generator.PrefixIDGenerator")
    private String id;

    @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "product_id", referencedColumnName = "id" )
    private Product product;

    @Column(name = "image_name")
    private String imageName;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return Objects.equals(id, image.id) &&
                Objects.equals(product, image.product) &&
                Objects.equals(imageName, image.imageName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, product, imageName);
    }
}
