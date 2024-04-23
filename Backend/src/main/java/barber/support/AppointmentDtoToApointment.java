package barber.support;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import barber.model.Appointment;
import barber.service.AppointmentService;
import barber.service.BarberService;
import barber.service.ServiceService;
import barber.web.dto.AppointmentDTO;

@Component
public class AppointmentDtoToApointment implements Converter<AppointmentDTO, Appointment> {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private BarberService barberService;
    
    @Autowired
    private ServiceService serviceService;
//    @Autowired
//    private ZanrService zanrService;

    @Override
    public Appointment convert(AppointmentDTO dto) {

    	Appointment e;

        if(dto.getId() == null) {
            e = new Appointment();
        }else {
            e = appointmentService.findOneById(dto.getId());
        }

        if(e != null) {
         e.setBarber(barberService.findOneById(dto.getId()));
         e.setCustomerEmail(dto.getCustomerEmail());
         e.setCustomerName(dto.getCustomerName());
         e.setCustomerPhone(dto.getCustomerPhone());
         e.setId(dto.getId());
         e.setService(serviceService.findOneById(dto.getServiceId()));
        }

        return e;
    }
}