package org.iesvdm.proyecto.repository;

import org.iesvdm.proyecto.domain.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso,Long> {
}
