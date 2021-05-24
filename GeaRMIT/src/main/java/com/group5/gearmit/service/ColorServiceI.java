package com.group5.gearmit.service;

import com.group5.gearmit.dao.ColorDAO;
import com.group5.gearmit.entity.Color;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ColorServiceI implements ColorService {

    @Autowired
    private ColorDAO colorDAO;

    @Override
    @Transactional
    public Color getColorByName(String colorName) {
        return colorDAO.getColorByName(colorName);
    }
}
