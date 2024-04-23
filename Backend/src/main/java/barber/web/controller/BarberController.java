package barber.web.controller;

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
import org.springframework.web.bind.annotation.RestController;

import barber.model.Barber;
import barber.service.BarberService;
import barber.support.BarberDtoToBarber;
import barber.support.BarberToBarberDto;
import barber.web.dto.BarberDTO;

@RestController
@RequestMapping(value = "/api/barbers", produces = MediaType.APPLICATION_JSON_VALUE)
public class BarberController {

	@Autowired 
	private BarberService barberService;
	@Autowired
	private BarberToBarberDto toDto;
	@Autowired
	private BarberDtoToBarber toKlasa;
	
	
	//  @PreAuthorize("hasAnyRole('KORISNIK', 'ADMIN')")
	 // @PreAuthorize("hasRole('ADMIN')")
	
	
	//GET ALL
	
//	@GetMapping
//	public ResponseEntity<List<KlasaDto>> getAll(
//			@RequestParam(required=false) String destinacija,
//			@RequestParam(required=false) Long prevoznikId,
//			@RequestParam(required=false) Double cenaKarteDo,
//			@RequestParam(defaultValue="0") int pageNo) {
//
//		Page<Klasa> stranice = klasaService.pretraga(destinacija, prevoznikId, cenaKarteDo, pageNo);
//
//		HttpHeaders responseHeaders = new HttpHeaders();
//		responseHeaders.set("Total-Pages", stranice.getTotalPages() + "");
//
//		return new ResponseEntity<>(toDto.convert(stranice.getContent()), responseHeaders, HttpStatus.OK);
//
//	}

	
	//GET ALL LISTA
	
		@GetMapping
		public ResponseEntity<List<BarberDTO>> getAll() {

			List<Barber> stranice = barberService.findAll();

		
			return new ResponseEntity<>(toDto.convert(stranice), HttpStatus.OK);

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

	 
	 
}



