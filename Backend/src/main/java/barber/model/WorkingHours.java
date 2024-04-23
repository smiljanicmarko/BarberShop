package barber.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class WorkingHours {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDate date;

	private Integer shift;

	@ElementCollection
	private List<String> hours = new ArrayList<String>();

	
	@ManyToMany(mappedBy = "workingHours")
	private Set<Barber> barbers;
	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Integer getShift() {
		return shift;
	}

	public void setShift(Integer shift) {
		this.shift = shift;
		updateHoursBasedOnShift();
	}

	public List<String> getHours() {
		return hours;
	}

	public void setHours(List<String> hours) {
		this.hours = hours;
	}

	private void updateHoursBasedOnShift() {
		if (shift == null || shift == 0) {
			hours.clear();
		} else if (shift == 1) {
			this.hours = ScheduleTemplate.getTimeSlotsFirstShift();
		} else if (shift == 2) {
			this.hours = ScheduleTemplate.getTimeSlotsSecondShift(); 
		}else if (shift == 3) {
			this.hours = new ArrayList<String>(); 
		}   else {
			hours.clear();
		}
	}

}
