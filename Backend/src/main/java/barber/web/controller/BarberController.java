package barber.web.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import barber.model.Barber;
import barber.model.WorkingHours;
import barber.repository.WorkingHoursRepository;
import barber.service.BarberServiceService;
import barber.support.BarberDtoToBarber;
import barber.support.BarberToBarberDetailsDto;
import barber.support.BarberToBarberDto;
import barber.web.dto.BarberDTO;
import barber.web.dto.BarberDetailsDTO;
import barber.web.dto.ShiftDTO;

@RestController
@RequestMapping(value = "/api/barbers", produces = MediaType.APPLICATION_JSON_VALUE)
public class BarberController {

	@Autowired 
	private BarberServiceService barberService;
	@Autowired
	private BarberToBarberDto toDto;
	@Autowired
	private BarberDtoToBarber toKlasa;
	@Autowired
	private BarberToBarberDetailsDto toBarberDetailsDto;
	@Autowired
	private WorkingHoursRepository whRepository;
	
	//  @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
	 // @PreAuthorize("hasRole('ADMIN')")
	
	


	
	//GET ALL LISTA
	
		@GetMapping
		public ResponseEntity<List<BarberDTO>> getBarbersWorkingHours (@RequestParam (required = false, defaultValue = "") String date) {		
			
			
			List<BarberDTO> stranice = barberService.findAll(date);

		
			return new ResponseEntity<>(stranice, HttpStatus.OK);

		}
		
		@GetMapping("/list")
		public ResponseEntity<List<BarberDetailsDTO>> getAll () {		
			
			
			List<Barber> stranice = barberService.findAll();

		
			return new ResponseEntity<>(toBarberDetailsDto.convert(stranice), HttpStatus.OK);

		}
	
	
	//GET BY ID

	@GetMapping("/{id}")
	public ResponseEntity <BarberDTO> get(@PathVariable Long id) {
		Barber obj = barberService.findOneById(id);

		if(obj != null) {
			return new ResponseEntity<>(toDto.convert(obj), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}




	//CREATE
	//@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BarberDTO> create(@Valid @RequestBody BarberDTO dto){

		Barber obj = toKlasa.convert(dto);
		Barber saved = barberService.save(obj);

		return new ResponseEntity<>(toDto.convert(saved), HttpStatus.CREATED);
	}


	//DELETE
	//@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		Barber obrisan = barberService.delete(id);

		if(obrisan != null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	//UPDATE
	//@PreAuthorize("hasRole('ADMIN')")
	 @PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<BarberDTO> update(@PathVariable Long id, @Valid @RequestBody BarberDTO dto){

	        if(!id.equals(dto.getId())) {
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }

	        Barber linija = toKlasa.convert(dto);
	        Barber saved = barberService.update(linija);

	        return new ResponseEntity<>(toDto.convert(saved),HttpStatus.OK);
	    }

	 
	 @PutMapping(value = "/{id}/setShift")
	    public ResponseEntity<BarberDTO> setShiftForBarber(@PathVariable Long id, @RequestParam Integer shift){

		 	Barber barber= barberService.findOneById(id);
		 	LocalDate today = LocalDate.now();
		 
	        if (barber == null || shift == null || shift < 0 || shift > 3) {
	        	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	        
	    
	       WorkingHours wh = new WorkingHours();
	       wh.setDate(today);
	       wh.setShift(shift);
	        
	        
	       whRepository.save(wh);
	       
	       
	       
	     List<WorkingHours>whList = new ArrayList<WorkingHours>();
	     whList.add(wh);
	     
	     barber.setWorkingHours(whList);
	        barberService.save(barber);

	        return new ResponseEntity<>(HttpStatus.OK);
	    }
	 
	 
	 
	
	 
	     @PostMapping("/{id}/set-shifts")
	     public ResponseEntity<Void> setShifts( @PathVariable Long id, @RequestBody List<ShiftDTO> shifts) {
	         // Here you can handle the shifts data
	         // For example, save it to the database or update existing records
	         
	         // Your logic to process the shifts goes here
	         System.out.println("Received shifts for barber " + id);
	         for (ShiftDTO shift : shifts) {
	             System.out.println("Date: " + shift.getDate()  + "Day: " + shift.getDay() + ", Shift: " + shift.getShift());
	         }

	         boolean success = barberService.setShifts(id, shifts);
	         
	         
	         return ResponseEntity.ok().build();
	     }
	 }
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 




