package com.group5.gearmit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @ManyToOne(targetEntity = Image.class, fetch = FetchType.EAGER)
//    @JoinColumn(nullable = false, name = "item_id", referencedColumnName = "id" )
    @Column(name = "item_id")
    private String itemID;

    @Column(name = "image_url")
    private String imageURL;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return id.equals(image.id) &&
                itemID.equals(image.itemID) &&
                imageURL.equals(image.imageURL);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, itemID, imageURL);
    }
}
