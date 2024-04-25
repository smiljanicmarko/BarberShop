package barber.service;

import java.util.List;

import barber.model.Appointment;
import barber.web.dto.AppointmentDTO;

public interface AppointmentService {
	
	
  Appointment findOneById(Long id);
	
  List<Appointment> findAll();

  Appointment save(Appointment a);

  Appointment update(Appointment a);

  Appointment delete(Long id);

  Appointment bookAppointment (AppointmentDTO dto);

  
	
	
//  Page<Film> findAll(Integer pageNo);
//  Page<Film> find(String naziv, Long zanrId, Integer trajanjeOd, Integer trajanjeDo, int page);
//  List<Film> findByZanrId(Long zanrId);
//  List<Linija> nadjiPoId (List<Long>ids);
}
