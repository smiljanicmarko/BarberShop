package barber.model;

import java.util.ArrayList;
import java.util.List;

public class ScheduleTemplate {	


	    public static List<String> getTimeSlotsFirstShift() {
	        List<String> timeSlots = new ArrayList<>();
	        int startHour = 9;
	        int startMinute = 0;

	        while (startHour < 15) {
	            String time = String.format("%02d:%02d", startHour, startMinute);
	            timeSlots.add(time);

	            startMinute += 20;
	            if (startMinute >= 60) {
	                startMinute = 0;
	                startHour += 1;
	            }
	        }

	        return timeSlots;
	    }
	    
	    
	    public static List<String> getTimeSlotsSecondShift() {
	        List<String> timeSlots = new ArrayList<>();
	        int startHour = 15;
	        int startMinute = 0;

	        while (startHour < 21) {
	            String time = String.format("%02d:%02d", startHour, startMinute);
	            timeSlots.add(time);

	            startMinute += 20;
	            if (startMinute >= 60) {
	                startMinute = 0;
	                startHour += 1;
	            }
	        }

	        return timeSlots;
	    }
	    
	    
	}
	
	

	

