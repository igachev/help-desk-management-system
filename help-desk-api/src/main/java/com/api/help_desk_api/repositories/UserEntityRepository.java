package com.api.help_desk_api.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.help_desk_api.models.UserEntity;

@Repository
public interface UserEntityRepository extends JpaRepository<UserEntity,Integer> {
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
}
