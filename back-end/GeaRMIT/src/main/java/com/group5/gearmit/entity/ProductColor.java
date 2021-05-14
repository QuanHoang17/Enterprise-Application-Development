package com.group5.gearmit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private ProductColorPK productColorPK;

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

    public void setProductColorPK(ProductColorPK productColorPK) {
        this.productColorPK = productColorPK;
    }


    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class ProductColorPK implements Serializable {
        @ManyToOne(targetEntity = Product.class, fetch = FetchType.EAGER)
        @JoinColumn(nullable = false, name = "product_id", referencedColumnName = "id")
        private Product product;

        @ManyToOne(targetEntity = Color.class, fetch = FetchType.EAGER)
        @JoinColumn(nullable = false, name = "color_name", referencedColumnName = "name" )
        private Color color;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ProductColorPK that = (ProductColorPK) o;
            return Objects.equals(product, that.product) && Objects.equals(color, that.color);
        }

        public Product getProduct() {
            return product;
        }

        public void setProduct(Product product) {
            this.product = product;
        }

        public Color getColor() {
            return color;
        }

        public void setColor(Color color) {
            this.color = color;
        }

        @Override
        public int hashCode() {
            return Objects.hash(product, color);
        }
    }
}
