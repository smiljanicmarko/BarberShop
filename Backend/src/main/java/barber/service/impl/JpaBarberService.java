package barber.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import barber.model.Barber;
import barber.repository.BarberRepository;
import barber.service.BarberService;

@Service
public class JpaBarberService implements BarberService {

	@Autowired
	private BarberRepository barberRepository;

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
   
}
