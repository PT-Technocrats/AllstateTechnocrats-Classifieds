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
public class HouseRentals {
	@Id
	private String id;
	
	private long phoneNumber;
	private String postedBy;
	private String emailId;
	
	@Indexed(direction = IndexDirection.ASCENDING)
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private Date postedOn;
	private String postDesc;
	
	protected HouseRentals()
	{}
	
	public HouseRentals(long phoneNumber,String postedBy,String emailId,Date postedOn, String postDesc)
	{
		this.phoneNumber=phoneNumber;
		this.postedBy=postedBy;
		this.emailId=emailId;
		this.postedOn=postedOn;
		this.postDesc=postDesc;
	}
	
	public String getId()
	{
		return id;
	}
	
	public void setId(String id)
	{
		this.id=id;
	}
	public long getPhoneNumber()
	{
		return phoneNumber;
	}
	public void setPhoneNumber(long phoneNumber)
	{
		this.phoneNumber= phoneNumber;
	}
	
	
	public String getPostedBy()
	{
		return postedBy;
	}
	public void setPostedBy(String postedBy)
	{
		this.postedBy= postedBy;
	}
	
	
	public String getEmailId()
	{
		return emailId;
	}
	public void setEmailId(String emailId)
	{
		this.emailId= emailId;
	}
	
	
	public Date getPostedOn()
	{
		return postedOn;
	}
	public void setPostedOn(Date postedOn)
	{
		this.postedOn= postedOn;
	}
	
	
	public String getPostDesc()
	{
		return postDesc;
	}
	public void setPostDesc(String postDesc)
	{
		this.postDesc= postDesc;
	}
	
}
