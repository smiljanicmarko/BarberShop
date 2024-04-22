package barber.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import barber.model.Barber;
import barber.web.dto.BarberDTO;

@Component
public class BarberToBarberDto implements Converter<Barber, BarberDTO> {

    @Override
    public BarberDTO convert(Barber e) {
    	BarberDTO dto = new BarberDTO();
       
    	dto.setId(e.getId());
    	dto.setName(e.getName());
    	dto.setLastName(e.getLastName());
    	dto.setNickname(e.getNickname());
    	dto.setPicture(e.getPicture());
    	dto.setAboutMe(e.getAboutMe());
    	
        return dto;
    }

    public List<BarberDTO> convert(List<Barber> lista){
        List<BarberDTO> listaDTO = new ArrayList<>();

        for(Barber e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



