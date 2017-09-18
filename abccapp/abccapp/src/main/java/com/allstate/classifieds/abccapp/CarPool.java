package com.allstate.classifieds.abccapp;



import java.util.*;

import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.*;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@Document(collection = "HouseRentals")
public class CarPool {
	@Id
	private String id;
	private String userName;
	private String serviceType;
	private String destination;
	private String startTime;
	private int availableSeats;
	private String poolId;
	private String requestedBy;
	private String offeredBy;
	private String status;
	private String remarks;
	
	
	
	protected CarPool()
	{}
	
	public CarPool(String userName,String serviceType,String destination, String startTime, int availableSeats, String poolId,String requestedBy,String offeredBy,String status,String remarks)
	{
		this.userName=userName;
		this.serviceType=serviceType;
		this.destination=destination;
		this.startTime=startTime;
		this.availableSeats=availableSeats;
		this.poolId=poolId;
		this.requestedBy=requestedBy;
		this.offeredBy=offeredBy;
		this.status=status;
		this.remarks=remarks;
		
		
	}

}
