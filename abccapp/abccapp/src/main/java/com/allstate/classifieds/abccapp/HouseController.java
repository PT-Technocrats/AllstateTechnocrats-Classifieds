package com.allstate.classifieds.abccapp;

import java.io.Console;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/HouseRentals")
public class HouseController {

	private HouseRepository houseRepository;
	public HouseController(HouseRepository houseRepository)
	{
		this.houseRepository=houseRepository;
	}
	
	@GetMapping("/all")
	public List<HouseRentals> getAll()
	{
		List<HouseRentals> houses = this.houseRepository.findAll();
			return houses;
	}
	
	@PutMapping
	public void insert(@RequestBody HouseRentals house)
	{
		this.houseRepository.insert(house);
	}
	

	@PostMapping("/post")
	public void update(@RequestBody HouseRentals house)
	{
		Calendar currentDate= Calendar.getInstance();
		Date currentDt = currentDate.getTime();
		
		house.setPostedOn(currentDt);
		this.houseRepository.save(house);
	}
	
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id") String id){
		
		
	this.houseRepository.delete(id);	
	}
}
