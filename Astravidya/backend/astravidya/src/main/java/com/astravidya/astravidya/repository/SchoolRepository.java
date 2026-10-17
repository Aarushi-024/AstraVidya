package com.astravidya.astravidya.repository;
import com.astravidya.astravidya.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School,Long>{
    Optional<School>
    findBySchoolCode(String schoolcode);

    boolean existsBySchoolCode(String schoolcode);
}
