package barber.web.dto;

public class BarberDTO {
	
	 	private Long id;
	   
	    private String name;	    
	    
	    private String lastName;
	    
	    private String nickname;
	    
	    private String picture;
	    
	    private String aboutMe;

	    
	    
	    
	    
		public BarberDTO(Long id, String name, String lastName, String nickname, String picture, String aboutMe) {
			super();
			this.id = id;
			this.name = name;
			this.lastName = lastName;
			this.nickname = nickname;
			this.picture = picture;
			this.aboutMe = aboutMe;
		}

		public BarberDTO() {
			super();
		}

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
	
	
	
}
