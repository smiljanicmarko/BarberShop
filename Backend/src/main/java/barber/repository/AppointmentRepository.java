package barber.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import barber.model.Appointment;


@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	Appointment findOneById(Long id);

	List<Appointment> findByDateAndBarberId (LocalDate date, Long barberId);

	

}

       