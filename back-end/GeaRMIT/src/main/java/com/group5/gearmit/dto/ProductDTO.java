package com.group5.gearmit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductDTO {
    private String id;
    private String name;
    private Long quantity;
    private Date issueDate;
    private String categoryName;
    private String brandName;
    private Long price;
    private String description;
}
