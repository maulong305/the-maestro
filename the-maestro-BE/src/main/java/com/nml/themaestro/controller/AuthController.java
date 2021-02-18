package com.nml.themaestro.controller;

import com.nml.themaestro.model.*;
import com.nml.themaestro.service.JwtService;
import com.nml.themaestro.service.UserDetailServiceImpl;
import com.nml.themaestro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@CrossOrigin("*")
@RestController
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    UserDetailServiceImpl userDetailServiceImpl;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody User user){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt =jwtService.generateAccessToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user1 = userService.findByUserName(user.getUsername());
        return ResponseEntity.ok(new JwtResponse(user1.getId(), jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }
    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public  ResponseEntity<String> getProfile(){
        return new ResponseEntity<>("profile", HttpStatus.OK);
    }
    @PostMapping("/register")
    public ResponseEntity<Customer> register(@RequestBody Customer customer){
        if (customer != null){
            User user = new User();
            UserDetail userDetail = new UserDetail();
            Set<Role> roleSet = new HashSet<>();
            roleSet.add(new Role(1L,"ROLE_USER"));
            user.setRoles(roleSet);
            user.setUsername(customer.getUserName());
            user.setPassword(passwordEncoder.encode(customer.getPassword()));
            userDetail.setAddress(customer.getAddress());
            userDetail.setEmail(customer.getEmail());
            userDetail.setName(customer.getName());
            userDetail.setPhoneNumber(customer.getPhoneNumber());
            userDetailServiceImpl.save(userDetail);
            userService.save(user);
            User user1 = userService.findByUserName(customer.getUserName());
            userDetail.setUser(user1);
            userDetail.setAvatar("https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png");
            userDetailServiceImpl.save(userDetail);
            UserDetail userDetail1 = userDetailServiceImpl.getUserDetailByUser(user1);
            user1.setUserDetail(userDetail1);
            userService.save(user1);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping("/register")
    public ResponseEntity<Iterable<User>> getAll(){
        return new ResponseEntity<>(userService.findAll(),HttpStatus.OK);
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<UserDetail> getProfile(@PathVariable String username){
        User user = userService.findByUserName(username);
        UserDetail userDetail = userDetailServiceImpl.getUserDetailByUser(user);
        return new ResponseEntity<>(userDetail, HttpStatus.OK);
    }

    @PutMapping("/profile/{username}")
    public ResponseEntity<UserDetail> editProfile(@PathVariable String username, @RequestBody Customer customer){
        User user = userService.findByUserName(username);
        UserDetail userDetailOld = userDetailServiceImpl.getUserDetailByUser(user);
        userDetailOld.setName(customer.getName());
        userDetailOld.setPhoneNumber(customer.getPhoneNumber());
        userDetailOld.setEmail(customer.getEmail());
        userDetailOld.setAddress(customer.getAddress());
        userDetailOld.setAvatar(customer.getAvatar());
        if (customer.getPassword() != null){
            user.setPassword(passwordEncoder.encode(customer.getPassword()));
            userService.save(user);
        }else {
            userDetailServiceImpl.save(userDetailOld);
        }
        return new ResponseEntity<>(userDetailOld, HttpStatus.OK);
    }
}
