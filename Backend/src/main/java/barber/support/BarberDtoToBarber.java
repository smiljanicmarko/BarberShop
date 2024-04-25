package barber.support;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import barber.model.Barber;
import barber.service.BarberServiceService;
import barber.web.dto.BarberDTO;

@Component
public class BarberDtoToBarber implements Converter<BarberDTO, Barber> {

    @Autowired
    private BarberServiceService barberService;

//    @Autowired
//    private ZanrService zanrService;

    @Override
    public Barber convert(BarberDTO dto) {

    	Barber e;

        if(dto.getId() == null) {
            e = new Barber();
        }else {
            e = barberService.findOneById(dto.getId());
        }

        if(e != null) {
           e.setAboutMe(dto.getAboutMe());
           e.setId(dto.getId());
           e.setLastName(dto.getLastName());
           e.setName(dto.getName());
           e.setNickname(dto.getNickname());
           e.setPicture(dto.getPicture());
        }

        return e;
    }
}