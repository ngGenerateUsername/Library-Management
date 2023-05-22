package com.example.workspace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.workspace.dao.AdminRepository;
import com.example.workspace.models.Admin;

@SpringBootApplication
public class SpringProjectApplication implements ApplicationRunner{
	
	@Autowired
	private AdminRepository _ormAdmin;

	@Autowired
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	public static void main(String[] args) {
		SpringApplication.run(SpringProjectApplication.class, args);
		
	}

	//create init instance for admin with login username:admin password:admin
	@Override
	public void run(ApplicationArguments args) throws Exception {
	
		 try {
			if(_ormAdmin.findAll().isEmpty())
			{
				// PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
				var admin = Admin.builder().email("ahmed@gmail.com").username("admin").password(passwordEncoder.encode("admin")).build();
				_ormAdmin.save(admin);
			}
		
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}
	}

}
//commentaire