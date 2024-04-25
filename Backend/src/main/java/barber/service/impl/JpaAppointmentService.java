package barber.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import barber.model.Appointment;
import barber.model.Barber;
import barber.model.BarberService;
import barber.repository.AppointmentRepository;
import barber.repository.BarberRepository;
import barber.repository.BarberServiceRepository;
import barber.service.AppointmentService;
import barber.support.AppointmentDtoToApointment;
import barber.web.dto.AppointmentDTO;

@Service
public class JpaAppointmentService implements AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	@Autowired
	private BarberRepository barberRepository;
	@Autowired
	private BarberServiceRepository serviceRepository;
	@Autowired
	private AppointmentDtoToApointment toAppointment;

	@Override
	public Appointment findOneById(Long id) {

		return appointmentRepository.findOneById(id);
	}

	@Override
	public List<Appointment> findAll() {
		
		return appointmentRepository.findAll();
	}

	@Override
	public Appointment save(Appointment a) {
		
		return appointmentRepository.save(a);
	}

	@Override
	public Appointment update(Appointment a) {
		
		return appointmentRepository.save(a);
	}

	@Override
	public Appointment delete(Long id) {
		Appointment ap = appointmentRepository.findOneById(id);
		if (ap != null) {
			appointmentRepository.deleteById(id);	
		}
		return ap;
	}

	@Override
	public Appointment bookAppointment(AppointmentDTO dto) {

		Barber barber = barberRepository.findOneById(dto.getBarberId());
		BarberService service = serviceRepository.findOneById(dto.getServiceId());
		System.out.println("IZ SERVISAAA: ");
		
		if (barber == null || service == null) {
					
			return null;
		}
		
		Appointment appointment = appointmentRepository.save(toAppointment.convert(dto));
		
		barber.addAppointment(appointment);
		barberRepository.save(barber);
		System.out.println("da li je appointment null?" + appointment==null? true : false);
		return appointment;
	}

}
