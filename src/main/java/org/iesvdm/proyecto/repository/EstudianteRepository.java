package org.iesvdm.proyecto.repository;

import org.iesvdm.proyecto.model.entity.Aula;
import org.iesvdm.proyecto.model.entity.Estudiante;
import org.iesvdm.proyecto.model.view.EstudianteRow;
import org.iesvdm.proyecto.model.view.Option;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface EstudianteRepository extends JpaRepository<Estudiante,Long> {
    @Query("SELECT e FROM Estudiante e WHERE e.blocked = false and (CONCAT(e.nombre, ' ', e.apellidos) LIKE %?1% or e.aula LIKE %?1%)")
    Page<EstudianteRow> findSearchNotBlocked(String nombreCompleto, Pageable pageable);
    @Query("SELECT e" +
            " FROM Estudiante e WHERE CONCAT(e.nombre, ' ', e.apellidos) LIKE %?1%" +
            "or e.aula LIKE %?1%")
    Page<EstudianteRow> findByNombreCompleto(String nombreCompleto, Pageable pageable);
    @Query("SELECT a FROM Aula a" +
            " WHERE a.id = ?1")
    Optional<Aula> getAula(Long estudianteId);
    @Query("SELECT a FROM Aula a JOIN a.estudiantes e" +
            " WHERE e.id = ?1 and a.eliminado=false")
    Set<Option> getAulas(Long estudianteId);
    Optional<Estudiante> findByEmail(String email);
}