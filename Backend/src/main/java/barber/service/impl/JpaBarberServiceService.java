package barber.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import barber.repository.BarberServiceRepository;
import barber.service.ServiceService;

@Service
public class JpaBarberServiceService implements ServiceService {

	@Autowired
	private BarberServiceRepository repository;
	
	@Override
	public barber.model.BarberService findOneById(Long id) {
		// TODO Auto-generated method stub
		return repository.findOneById(id);
	}

	@Override
	public List<barber.model.BarberService> findAll() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	
}
