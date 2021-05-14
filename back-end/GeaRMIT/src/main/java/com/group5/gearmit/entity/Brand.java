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
@Table(name = "brand")
public class Brand {
    @Id
    @Column
    @GeneratedValue(generator = "brand_generator")
    @GenericGenerator(
        parameters = @Parameter(name = "prefix", value = "brand"),
        name = "brand_generator",
        strategy = "com.group5.gearmit.generator.PrefixIDGenerator")
    private String id;

    @Column(unique = true)
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Brand brand = (Brand) o;
        return id.equals(brand.id) &&
                name.equals(brand.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    public void setName(String name) {
        this.name = name;
    }
}
