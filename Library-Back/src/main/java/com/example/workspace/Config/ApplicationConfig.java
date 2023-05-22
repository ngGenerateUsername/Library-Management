package com.example.workspace.Config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.workspace.dao.AdminRepository;

import lombok.RequiredArgsConstructor;
@Configuration
@RequiredArgsConstructor 
public class ApplicationConfig {
    

    private final AdminRepository repository;
    @Bean
    public UserDetailsService userDetailsService()
    {
        return username -> repository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user Not Found"));
        
    }

    //this is same format without lambda expression we can instanciate interface in same time define methodes inside it 
    // @Bean
    // public UserDetailsService userDetailsService()
    // {
    //     return new UserDetailsService() {
    //         @Override
    //         public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    //             // TODO Auto-generated method stub
    //             return null;
    //         }
    //     };
        
    // }

    //data access object responsible to fetch userDetails,encode password...
    @Bean
    public AuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider authProvier = new DaoAuthenticationProvider();
        authProvier.setUserDetailsService(userDetailsService());

        authProvier.setPasswordEncoder(passwordEncoder());
        return authProvier;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
    {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

}
