package com.api.help_desk_api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.api.help_desk_api.models.Role;
import com.api.help_desk_api.models.UserEntity;
import com.api.help_desk_api.repositories.UserEntityRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserEntityRepository userEntityRepository;

    @Autowired
    public CustomUserDetailsService(UserEntityRepository userEntityRepository) {
        this.userEntityRepository = userEntityRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    UserEntity user = userEntityRepository.findByEmail(email)
    .orElseThrow(() ->
    new UsernameNotFoundException("Invalid email or password"));

    return new User
        (
        user.getEmail(),
        user.getPassword(),
        mapRolesToAuthorities(user.getRoles())
        );
    }
    
    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles) {
        return roles.stream().map((role) -> 
        new SimpleGrantedAuthority(role.getName()))
        .collect(Collectors.toList());
    }
}
