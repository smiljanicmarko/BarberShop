package barber.service;

import java.util.List;

import barber.model.Service;

public interface ServiceService {
	
	
  Service findOneById(Long id);
	
  List<Service> findAll();

//  Appointment save(Appointment a);
//
//  Appointment update(Appointment a);
//
//  Appointment delete(Long id);

  //Page<Linija> pretraga(String destinacija, Long prevoznikId, Double cenaKarteDo, int pageNo);
  

  
	
	
//  Page<Film> findAll(Integer pageNo);
//  Page<Film> find(String naziv, Long zanrId, Integer trajanjeOd, Integer trajanjeDo, int page);
//  List<Film> findByZanrId(Long zanrId);
//  List<Linija> nadjiPoId (List<Long>ids);
}
