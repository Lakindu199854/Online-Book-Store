package com.kade.kade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kade.kade.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    User findByEmail(String email);
    User save(User user);
}
