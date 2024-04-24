package barber.web.dto;

public class BarberDetailsDTO {

	private Long id;
	   
    private String name;	    
    
    private String lastName;
    
//    private Integer shift;

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

//	public Integer getShift() {
//		return shift;
//	}
//
//	public void setShift(Integer shift) {
//		this.shift = shift;
//	}
    
    
	
}
