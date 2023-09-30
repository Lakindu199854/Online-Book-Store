package com.kade.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kade.kade.entity.User;
import com.kade.kade.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findByUsername(username).orElse(null);
        //We cant convert a optional user to user,thus we have to put an orElse
        if(user ==null){
            throw new UsernameNotFoundException("Username not found with the given username");
        }
        //If we just call User.builder then "import com.kade.kade.entity.User;" this will be refferd,But
       //here what we want to use is the User builder in spring security core.Thus we have to 
       //define the full path
        return org.springframework.security.core.userdetails.User.builder().username(user.getUsername())
            .username(user.getUsername())
            .password(user.getPassword())
            .build();
      
    }
    
}
