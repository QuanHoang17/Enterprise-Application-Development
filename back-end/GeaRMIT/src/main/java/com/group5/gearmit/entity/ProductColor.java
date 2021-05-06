package com.group5.gearmit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "product_color")
public class ProductColor {
    @EmbeddedId
    ProductColorPK productColorPK;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductColor that = (ProductColor) o;
        return Objects.equals(productColorPK, that.productColorPK);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productColorPK);
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    private static class ProductColorPK implements Serializable {
        @ManyToOne(targetEntity = Product.class, fetch = FetchType.LAZY)
        @JoinColumn(nullable = false, name = "product_id", referencedColumnName = "id")
        private Product product;

        @ManyToOne(targetEntity = Color.class, fetch = FetchType.LAZY)
        @JoinColumn(nullable = false, name = "color_name", referencedColumnName = "name" )
        private Color color;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ProductColorPK that = (ProductColorPK) o;
            return Objects.equals(product, that.product) && Objects.equals(color, that.color);
        }

        @Override
        public int hashCode() {
            return Objects.hash(product, color);
        }
    }
}
