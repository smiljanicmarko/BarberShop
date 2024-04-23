package barber.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import barber.repository.ServiceRepository;
import barber.service.ServiceService;

@Service
public class JpaServiceService implements ServiceService {

	@Autowired
	private ServiceRepository repository;
	
	@Override
	public barber.model.Service findOneById(Long id) {
		// TODO Auto-generated method stub
		return repository.findOneById(id);
	}

	@Override
	public List<barber.model.Service> findAll() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	
}
