package barber.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import barber.model.Barber;


@Repository
public interface BarberRepository extends JpaRepository<Barber, Long> {

	Barber findOneById(Long id);




}