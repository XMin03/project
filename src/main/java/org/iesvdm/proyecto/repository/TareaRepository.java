package org.iesvdm.proyecto.repository;

import org.iesvdm.proyecto.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea,Long> {
}
