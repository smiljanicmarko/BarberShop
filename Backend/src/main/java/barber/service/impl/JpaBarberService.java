package barber.service.impl;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import barber.model.Barber;
import barber.model.WorkingHours;
import barber.repository.BarberRepository;
import barber.repository.WorkingHoursRepository;
import barber.service.BarberService;
import barber.support.BarberToBarberDto;
import barber.web.dto.BarberDTO;
import barber.web.dto.ShiftDTO;

@Service
public class JpaBarberService implements BarberService {

	
	@Autowired
	private BarberRepository barberRepository;

	@Autowired
	private BarberToBarberDto toDto;
	@Autowired
	private WorkingHoursRepository whRepository;
	
	@Override
	public Barber findOneById(Long id) {
		
		return barberRepository.findOneById(id);
	}

	@Override
	public List<Barber> findAll() {
		
		return barberRepository.findAll();
	}

	@Override
	public Barber save(Barber b) {
		
		return barberRepository.save(b);
	}

	@Override
	public Barber update(Barber b) {
		
		return barberRepository.save(b);
	}

	@Override
	public Barber delete(Long id) {
		Barber barber = barberRepository.findOneById(id);
		if (barber != null) {
			barberRepository.deleteById(id);
		}
		
		return barber;
	}

	@Override
	public List<BarberDTO> findAll(String date) {
		LocalDate dateD;
		
	if (date.isBlank()) {
		dateD = LocalDate.now();
	}else {
		try {
			 dateD = LocalDate.parse(date);
		} catch (Exception e) {
			System.out.println("DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATUUUUUUUUUUUUUUUUUUUUM U SERVISU");
			return null;
		}
	}
		
		
		List<Barber>barbers = barberRepository.findAll();
		
		List<BarberDTO>result = new ArrayList<BarberDTO>();
		
		for (Barber b : barbers) {
			
			BarberDTO dto = toDto.convert(b);
			
			
			for (WorkingHours wh : b.getWorkingHours()) {
				if (wh.getDate().equals(dateD)) {
					dto.setHours(wh.getHours());
					dto.setShift(wh.getShift());
					dto.setWorkingHoursId(wh.getId());
				}
			}
			
			result.add(dto);
		}
		
		
		
		return result;
	}
			//problem kod parsiranja datuma, promeniti ga  na frontu, ili parsirati preko NOVOG formatera
	@Override
	public boolean setShifts(Long barberId, List<ShiftDTO> dto) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM/dd/yyyy");
		
		Barber barber = barberRepository.findOneById(barberId);
		if (barber == null) {
			return false;
		}
		List<WorkingHours> whList = new ArrayList<WorkingHours>();
		for (ShiftDTO s : dto) {			
			if (s.getShift()==null) {
				continue;
			}
			WorkingHours wh = new WorkingHours();
			LocalDate parsedDate = LocalDate.parse(s.getDate(), dtf);
			wh.setDate(parsedDate);
			wh.setShift(s.getShift());
			WorkingHours saved = whRepository.save(wh);
			
			whList.add(saved);
		}
		
		barber.setWorkingHours(whList);
		barberRepository.save(barber);
		
		
		return true;
	}
   
}
