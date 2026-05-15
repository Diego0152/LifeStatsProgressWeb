package com.diegorr.objectives.dto;

import com.diegorr.objectives.models.EstadoSalud;
import lombok.Data;
import java.util.List;

@Data
public class BiometriaDTO {
    private int edad;
    private List<EstadoSalud> estadosSalud;
}