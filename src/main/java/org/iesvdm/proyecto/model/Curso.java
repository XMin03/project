package org.iesvdm.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Entity
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private long id;
    @Column(unique = true)
    private String nombre;
    @OneToMany(mappedBy = "curso",cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<Clase> clases;
}
