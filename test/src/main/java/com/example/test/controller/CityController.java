package com.example.test.controller;

import com.example.test.model.City;
import com.example.test.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/city")
public class CityController {
    @Autowired
    private ICityService iCityService;

    @GetMapping
    public ResponseEntity<Iterable<City>> fillAll() {
        List<City> cityList = iCityService.findAll();
        if (cityList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(cityList, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<City>> findOne(@PathVariable Long id) {
        return new ResponseEntity<>(iCityService.findOne(id), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<?> createCity(@RequestBody City city) {
        iCityService.save(city);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCity(@RequestBody City city, @PathVariable Long id) {
        Optional<City> cityOptional = iCityService.findOne(id);
        if (cityOptional.isPresent()) {
            city.setId(id);
            iCityService.save(city);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletCity(@PathVariable Long id) {
        Optional<City> cityOptional = iCityService.findOne(id);
        if (cityOptional.isPresent()) {
            iCityService.delete(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
