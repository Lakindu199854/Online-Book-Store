package com.kade.kade.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kade.kade.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    User findByEmail(String email);
    User save(User user);

    Optional<User> findByUsername(String username);
    //Optional means that here user can be present or absent
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

}
