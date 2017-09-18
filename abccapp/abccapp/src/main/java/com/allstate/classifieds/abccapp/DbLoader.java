package com.allstate.classifieds.abccapp;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.*;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DbLoader implements CommandLineRunner{

	private HouseRepository houseRepository;
	
	public DbLoader(HouseRepository houseRepository)
	{
		this.houseRepository=houseRepository;
	}
	
	@Override
	public void run(String... strings)throws Exception{
		
		/*Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, 2017);
		calendar.set(Calendar.MONTH, 5);
		calendar.set(Calendar.DATE, 20);
		Date now = calendar.getTime();
		HouseRentals house1 = new HouseRentals(new Long("8867437535"),"chetan","ccha7@allstate.com", now ,"Flat 101, BEML layout, Marathahalli");
		
		Calendar calendar1 = Calendar.getInstance();
		Date now1 = calendar1.getTime();
		HouseRentals house2 = new HouseRentals(new Long("9999999999"),"Aditya","adtiya@allstate.com", now1,"Flat 100, Kormangala, Bangalore");
		*/
		
		//this.houseRepository.deleteAll();
		
		//List<HouseRentals> houses = Arrays.asList(house1,house2);
		//this.houseRepository.save(houses);
		
	}
}
