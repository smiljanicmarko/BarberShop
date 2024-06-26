package barber.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import barber.enumerations.KorisnickaUloga;

@Entity
public class Korisnik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String korisnickoIme;

    @Column( unique = true, nullable = false)
    private String eMail;

    @Column
    private String ime;

    @Column
    private String prezime;

    @Column(nullable = false)
    private String lozinka;

    @Enumerated(EnumType.STRING)
    private KorisnickaUloga uloga;

	public Korisnik() {
		super();
	}

	public Korisnik(Long id, String korisnickoIme, String eMail, String ime, String prezime, String lozinka,
			KorisnickaUloga uloga) {
		super();
		this.id = id;
		this.korisnickoIme = korisnickoIme;
		this.eMail = eMail;
		this.ime = ime;
		this.prezime = prezime;
		this.lozinka = lozinka;
		this.uloga = uloga;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getKorisnickoIme() {
		return korisnickoIme;
	}

	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}

	public String geteMail() {
		return eMail;
	}

	public void seteMail(String eMail) {
		this.eMail = eMail;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public String getLozinka() {
		return lozinka;
	}

	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}

	public KorisnickaUloga getUloga() {
		return uloga;
	}

	public void setUloga(KorisnickaUloga uloga) {
		this.uloga = uloga;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Korisnik other = (Korisnik) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Korisnik [id=" + id + ", korisnickoIme=" + korisnickoIme + ", eMail=" + eMail + ", ime=" + ime
				+ ", prezime=" + prezime + ", lozinka=" + lozinka + ", uloga=" + uloga + "]";
	}

    

  

  

}
