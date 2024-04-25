package barber.service;

import java.util.List;

import barber.model.Barber;
import barber.web.dto.BarberDTO;
import barber.web.dto.ShiftDTO;

public interface BarberServiceService {
	
	
  Barber findOneById(Long id);
	
  List<Barber> findAll();

  List<BarberDTO> findAll(String date);
  
  boolean setShifts (Long barberId, List<ShiftDTO>dto);
  
  
  
  Barber save(Barber b);

  Barber update(Barber b);

  Barber delete(Long id);

  //Page<Linija> pretraga(String destinacija, Long prevoznikId, Double cenaKarteDo, int pageNo);
  

  
	
	
//  Page<Film> findAll(Integer pageNo);
//  Page<Film> find(String naziv, Long zanrId, Integer trajanjeOd, Integer trajanjeDo, int page);
//  List<Film> findByZanrId(Long zanrId);
//  List<Linija> nadjiPoId (List<Long>ids);
}
