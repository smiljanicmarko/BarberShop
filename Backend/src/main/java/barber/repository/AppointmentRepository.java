package barber.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import barber.model.Appointment;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	Appointment findOneById(Long id);



	

}

       