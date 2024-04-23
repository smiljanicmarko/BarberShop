package barber.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import barber.model.Appointment;
import barber.repository.AppointmentRepository;
import barber.service.AppointmentService;

@Service
public class JpaAppointmentService implements AppointmentService {

	@Autowired
	private AppointmentRepository repository;

	@Override
	public Appointment findOneById(Long id) {

		return repository.findOneById(id);
	}

	@Override
	public List<Appointment> findAll() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Appointment save(Appointment a) {
		// TODO Auto-generated method stub
		return repository.save(a);
	}

	@Override
	public Appointment update(Appointment a) {
		// TODO Auto-generated method stub
		return repository.save(a);
	}

	@Override
	public Appointment delete(Long id) {
		Appointment ap = repository.findOneById(id);
		if (ap != null) {
			repository.deleteById(id);	
		}
		return ap;
	}

}
