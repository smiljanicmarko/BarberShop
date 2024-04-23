package barber.web.dto;

import java.util.ArrayList;
import java.util.List;

public class BarberDTO {
	
	 	private Long id;
	   
	    private String name;	    
	    
	    private String lastName;
	    
	    private String nickname;
	    
	    private String picture;
	    
	    private String aboutMe; 
	    
	    private Long workingHoursId;
	    
	    private List<String> hours = new ArrayList<String>();
	   
	    private Integer shift;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getNickname() {
			return nickname;
		}

		public void setNickname(String nickname) {
			this.nickname = nickname;
		}

		public String getPicture() {
			return picture;
		}

		public void setPicture(String picture) {
			this.picture = picture;
		}

		public String getAboutMe() {
			return aboutMe;
		}

		public void setAboutMe(String aboutMe) {
			this.aboutMe = aboutMe;
		}

		public Long getWorkingHoursId() {
			return workingHoursId;
		}

		public void setWorkingHoursId(Long workingHoursId) {
			this.workingHoursId = workingHoursId;
		}

		public List<String> getHours() {
			return hours;
		}

		public void setHours(List<String> hours) {
			this.hours = hours;
		}

		public Integer getShift() {
			return shift;
		}

		public void setShift(Integer shift) {
			this.shift = shift;
		}
	    
	
	  
	    
	  
	
	
	
}
