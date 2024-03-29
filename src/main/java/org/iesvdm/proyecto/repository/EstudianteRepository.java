package org.iesvdm.proyecto.repository;

import org.iesvdm.proyecto.domain.Estudiante;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EstudianteRepository extends JpaRepository<Estudiante,Long> {
    @Query("SELECT u FROM Usuario u WHERE CONCAT(u.nombre, ' ', u.apellido1, ' ', u.apellido2) LIKE %?1%")
    Page<Estudiante> findByNombreCompleto(String nombreCompleto, Pageable pageable);}