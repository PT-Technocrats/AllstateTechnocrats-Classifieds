package com.allstate.classifieds.abccapp;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseRepository extends MongoRepository<HouseRentals, String>{

}
