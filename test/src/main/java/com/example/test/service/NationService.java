package com.example.test.service;

import com.example.test.model.Nation;
import com.example.test.repository.INationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NationService implements INationService {
    @Autowired
    private INationRepository iNationRepository;

    @Override
    public List<Nation> findAll() {
        return iNationRepository.findAll();
    }

    @Override
    public Optional<Nation> findOne(Long aLong) {
        return iNationRepository.findById(aLong);
    }

    @Override
    public void save(Nation nation) {
        iNationRepository.save(nation);
    }

    @Override
    public void delete(Long aLong) {
        iNationRepository.deleteById(aLong);
    }
}
