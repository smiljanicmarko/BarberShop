package barber.support;


import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import barber.model.Appointment;
import barber.web.dto.AppointmentDTO;

@Component
public class AppointmentToAppointmentDto implements Converter<Appointment, AppointmentDTO> {

    @Override
    public AppointmentDTO convert(Appointment e) {
    	AppointmentDTO dto = new AppointmentDTO();
       
    	dto.setBarberId(e.getBarber().getId());
    	dto.setBarberNickname(e.getBarber().getNickname());
    	dto.setCustomerEmail(e.getCustomerEmail());
    	dto.setCustomerName(e.getCustomerName());
    	dto.setCustomerPhone(e.getCustomerPhone());
    	dto.setDate(e.getDate());
    	dto.setId(e.getId());
    	dto.setService(e.getService().getName());
    	dto.setServiceId(e.getService().getId());
    	dto.setTime(e.getTime());    	
        return dto;
    }

    public List<AppointmentDTO> convert(List<Appointment> lista){
        List<AppointmentDTO> listaDTO = new ArrayList<>();

        for(Appointment e : lista) {
            listaDTO.add(convert(e));
        }

        return listaDTO;
    }

}



