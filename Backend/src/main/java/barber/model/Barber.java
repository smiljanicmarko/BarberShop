package barber.model;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Barber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String lastName;
    
    private String nickname;
    
    private String picture;
    
    private String aboutMe;
    @OneToMany(mappedBy = "barber", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Appointment> appointments = new ArrayList<Appointment>();
    
    
    
    @ManyToMany
	@JoinTable(name = "barber_working_hours",
	joinColumns = @JoinColumn(name = "barber_id"),
	inverseJoinColumns = @JoinColumn(name = "working_hours_id"))	
   private List<WorkingHours> workingHours = new ArrayList<WorkingHours>();
    
    
	public Barber(Long id, String name, String lastName, String nickname, String picture, String aboutMe,
			List<Appointment> appointments) {
		super();
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.nickname = nickname;
		this.picture = picture;
		this.aboutMe = aboutMe;
		this.appointments = appointments;
	}

	public Barber() {
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

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}

	public List<WorkingHours> getWorkingHours() {
		return workingHours;
	}

	public void setWorkingHours(List<WorkingHours> workingHours) {
		this.workingHours = workingHours;
	}
    
    

   


    
}
