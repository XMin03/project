package org.iesvdm.proyecto.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.iesvdm.proyecto.domain.Clase;
import org.iesvdm.proyecto.domain.Profesor;
import org.iesvdm.proyecto.exeption.NotFoundException;
import org.iesvdm.proyecto.repository.ClaseRepository;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ClaseService {
    @PersistenceContext
    EntityManager em;
    private final ClaseRepository claseRepository;
    public ClaseService(ClaseRepository claseRepository) {
        this.claseRepository = claseRepository;
    }

    public List<Clase> all(long curso,long asignatura) {
        if (curso!=-1 && asignatura!=-1)
            return this.claseRepository.findClaseByCurso_IdAndAsignatura_Id(curso, asignatura);
        else if (curso!=-1)
            return this.claseRepository.findClaseByCurso_Id(curso);
        else if(asignatura!=-1)
            return this.claseRepository.findClaseByAsignatura_Id(asignatura);
        else
            return this.claseRepository.findAll();
    }


    @Transactional
    public Clase save(Clase clase) {
        this.claseRepository.save(clase);
        this.em.refresh(clase);
        if (!clase.getProfesores().isEmpty()){
            clase.setProfesores(getProfesores(clase.getId()));
        }
        //NO PUEDO REFRESCAR COLECCION
        //this.em.refresh(clase.getProfesores());
        return clase;
    }

    public Clase one(Long id) {
        return this.claseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(id,"clase"));
    }

    public Clase replace(Long id, Clase clase) {
        return this.claseRepository.findById(id).map( c -> (id.equals(clase.getId())  ?
                        this.claseRepository.save(clase) : null))
                .orElseThrow(() -> new NotFoundException(id,"clase"));

    }
    public Clase add(Long id, Set<Profesor> profesor) {
        return this.claseRepository.findById(id).map( c -> {
                    c.getProfesores().addAll(profesor);
                    return claseRepository.save(c);
                })
                .orElseThrow(() -> new NotFoundException(id,"clase"));

    }
    public void delete(Long id) {
        this.claseRepository.findById(id).map(c -> {
                    this.claseRepository.delete(c);
                    return c;})
                .orElseThrow(() -> new NotFoundException(id,"clase"));
    }
    private HashSet<Profesor> getProfesores(long id){
        return new HashSet<>(em.createQuery("select C.profesores from Clase C where C.id = :id")
                .setParameter("id",id)
                .getResultList());
    }
}
