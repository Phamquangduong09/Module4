package com.example.test.controller;

import com.example.test.model.City;
import com.example.test.model.Nation;
import com.example.test.service.ICityService;
import com.example.test.service.INationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/nation")
public class NationController {
    @Autowired
    private INationService iCityService;

    @GetMapping
    public ResponseEntity<Iterable<Nation>> fillAll() {
        List<Nation> cityList = iCityService.findAll();
        if (cityList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(cityList, HttpStatus.OK);
    }


}
