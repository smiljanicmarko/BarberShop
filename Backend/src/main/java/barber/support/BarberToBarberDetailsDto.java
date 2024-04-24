package barber.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import barber.model.Barber;
import barber.web.dto.BarberDetailsDTO;

@Component
public class BarberToBarberDetailsDto implements Converter<Barber, BarberDetailsDTO> {

    @Override
    public BarberDetailsDTO convert(Barber e) {
    	BarberDetailsDTO dto = new BarberDetailsDTO();
       
    	dto.setId(e.getId());
    	dto.setName(e.getName());
    	dto.setLastName(e.getLastName());
    		
    	
    	
    	
    	
        return dto;
    }

    public List<BarberDetailsDTO> convert(List<Barber> lista){
        List<BarberDetailsDTO> listaDTO = new ArrayList<>();

        for(Barber e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



