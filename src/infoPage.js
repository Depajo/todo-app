import "./App.css";

function Tietoa() {
    return (
        <div className="content">
            <div
                className="container-1"
                style={{
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    letterSpacing: "2px",
                    lineHeight: "1.5",
                    maxWidth: "1000px",
                }}
            >
                <h1>Tietoja</h1>
                <div>
                    <h3>Tekijä</h3>
                    <p>Joonatan De Pascale</p>
                </div>
                <div>
                    <h3>Sisältö</h3>
                    <p>
                        Käytetty{" "}
                        <a
                            href="https://mui.com/core/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Mui core
                        </a>
                        elementtejä. Ne ovat vapaassa käytössä eikä tarvitse
                        lisenssiä. Mui:lla on olemassa myös lisenssikäyttöisiä
                        elementtejä. Niitä ei ole tässä projektissa käytetty.
                    </p>
                </div>
                <div>
                    <h3>Ohjeet</h3>
                    <div>
                        <h4>Yleistä</h4>
                        <p>
                            Sivun auetessa vasemmassa yläkulmassa on menu ikoni.
                            Paineamalla sitä aukeaa menu. Menusta löytyy
                            "Etusivu", "Lisää" ja "Tietoa". Paineamalla
                            "Etusivu" pääset selaamaan tehtäviä. Paineamalla
                            "Lisää" pääset lisäämään tehtäviä. Paineamalla
                            "Tietoa" pääset tähän sivuun.
                        </p>

                        <p>
                            Tehtävien näyttäminen tapahtuu niin että "Näkymän
                            valitseminen" otsikon alapuolelta valitset kahdesta
                            valikosta kategorian ja järjestystavan. Näkymää
                            valittaessa sinun tulee valita ensin järjestys ja
                            sen jälkeen kategoria. Jos et ole valinnut
                            kategoriaa tai järjestystä, tehtäviä ei tällöin tule
                            näkyviin ja "Valitse näkymä" otsikon alapuolella
                            näkyy punaisella tekstillä kirjoitettu
                            avustusteksti. Noudata sen ohjeita saadaksesi
                            tehtävät näkyviin.
                        </p>
                    </div>
                    <div>
                        <h4>Tehtävien järjestäminen</h4>
                        <p>Tehtävien järjestämiseen on neljä vaihtoehtoa.</p>
                        <p>
                            Voit järjestää tehtävät aakkosjärjestykseen. Jos
                            haluat järjestää tehtävät aakkosjärjestykseen,
                            valitse "Aakkosjärjestys" valikosta.
                        </p>
                        <p>
                            Jos haluat järjestää tehtävät luomisajan mukaan,
                            valitse "Uusin ensin" tai "Vanhin ensin" valikosta.
                        </p>
                        <p>
                            Oma Prioriteetti on näkymä kun haluat itse jätjestää
                            tehtävät omaan järjestykseen. Katso ohejista
                            "Prioriteetti" kohdasta tarkemmat ohjeet.
                        </p>
                    </div>
                    <div>
                        <h4>Kategorian valinta</h4>
                        <p>
                            Kategorioita on oletuksena valittavissa Kaikki. Jos
                            olet lisännyt uusia kategorioita niin tulevat ne
                            valittaviksi valikosta. Jos haluat nähdä kaikki
                            tehtävät, valitse "Kaikki" valikosta.
                        </p>
                        <p>
                            Voit myös valita tietyn kategorian, jolloin näet
                            vain sen kategorian tehtävät. Jos haluat lisätä
                            uuden kategorian, katso ohejista "Kategorian
                            lisääminen"
                        </p>
                    </div>
                    <div>
                        <h4>Tehtäväkortti</h4>
                        <p> Tehtäväkortti on tehtävän tietojen näyttämiseen.</p>
                        <p>
                            Tehtäväkortissa on ID numero, tehtävä, kategoriat,
                            ajanlaskenta, oma prioriteetti ja luotipäivämäärä
                        </p>

                        <p style={{ color: "red" }}>
                            Tehtävkorttia voi scrollata alapäin.
                        </p>
                    </div>

                    <div>
                        <h4>Ajanlaskenta</h4>
                        <p>
                            Ajanlaskenta on tehtäväkortissa oleva kohta.
                            "Ajanlaseknta" otsikon alahaalla näkyy "Ajanlaseknta
                            pysäytetty" tai "Lasketaan aikaa..." tekstit.
                            <br />
                            Jos näkyy "Ajanlaseknta pysäytetty" tekstin alla
                            näkyy, "Start" nappia. Paineamalla "Start" nappia,
                            ajanlaskenta alkaa.
                            <br />
                            Jos näkyy "Lasketaan aikaa..." teksti alla näkyy
                            "Stop" nappia. Paineamalla "Stop" nappia,
                            ajanlaskenta pysähtyy.
                            <br />
                            Kun aika on pysäytetty ja tehtäväkortissa lukee
                            "Ajanlaseknta pysäytetty" teksti. Tämän tekstin alla
                            näkyy minuutteina lasekttu aika. Esimerkiksi
                            "Käytetty aikaa: 5.33 minuuttia".
                        </p>

                        <p>
                            Voit laskea jokaisellä tehtävällä aikaa. Halutessasi
                            voit laskea myö useammalla samanaikaisesti
                        </p>
                    </div>
                    <div>
                        <h4>Prioriteetti</h4>
                        <p>
                            Prioriteetin muuttaminen onnistuu tehtäväkortissa.
                            Tehtäväkorttia voi scrollata alapöin jolloin tulee
                            näkyviin "Oma Prioriteetti" otsikko. Sen alapuolella
                            näkyy numero joka on tehtävän prioriteetti. Voit
                            muuttaa prioriteettiä painamalla vieressä olevaa +
                            tai - nappia.
                        </p>

                        <p>
                            Voit järjestää tehtävät omaan järjestykseesi. Kun
                            olet valinnut "Oma Prioriteetti" näkymän, näet
                            tehtävät järjestyksessä jossa ne ovat. Voit siirtää
                            tehtäviä tärkeämmäksi tai vähemmän tarkeämmäksi. Jos
                            tehtävä on tarkeämpi. Nousee se tehtävälistassa
                            ylemmäksi. Jos tehtävä on vähemmän tärkeä, se laskee
                            tehtävälistassa alemmaksi. Jos tehtäviä on useampi
                            vierekkäin näytöllä, tälöin tehtävä siirtyy
                            vasemmalle omalla rivillä.
                        </p>

                        <p>
                            Kun nostat tai lasket prioriteettiä niin tämän
                            jälkeen tulee sinun aina valita uudestaan tietty
                            kategoria jotta tehtävät tulevat näkyviin udessa
                            järjestyksessä.
                        </p>
                    </div>
                    <div>
                        <h4>Tehtävien muokkaaminen</h4>
                        <p>
                            Tehtävää voi muokata painamalla tehtäväkortissa
                            "Muokkaa" nappia. Kun painat "Muokkaa" nappia aukeaa
                            muokkausikkuna. Muokkausikkunassa näkyy "Muokkaa"
                            nappi oikeassa kulmassa. Painamalla sitä muokkaat
                            tehtävää. Muokkausikkunassa näkyy myös "Peruuta"
                            nappi "Muokkaa" napin oikealla puolella. Painamalla
                            sitä peruutat muokkauksen ja muokkausikkuna
                            sulkeutuu.
                        </p>

                        <p>
                            Muokataksesi tehtävää sinun tulee valita vähintään
                            yksi kategoria ja antaa tehtävänkuvaus.
                            Tekstikentässä "Muokkaa tehtävää:" otsikon
                            alapuolella on tekstikenttä johon voit kirjoittaa
                            tehtävänkuvauksen. Sinun tulee kirjottaa aina
                            tehtävänkuvaus. Tekstikenttään voi kirjoittaa mitä
                            tahansa. Tekstikentässä näkyy vanha tehtävän kuvaus.
                            Tämän jälkeen tulee "Kategoriat" otsikko jonka
                            alapuolella on kaksi ikkunaa vierekkäin. Vasemmassa
                            ikkunassa näkyy kaikki kategoriat joita voit valita
                            tehtävään ja oikeassa ikkunassa näkyy tehtävässä
                            aikaisemmin valitut kategoriat. Oikean puoleissa
                            ikkunassa ei voi valita kategorioita.
                        </p>
                    </div>
                    <div>
                        <h4>Kategorian lisääminen</h4>
                        <p>
                            Kategorian lisääminen onnistuu kun painat "Lisää"
                            nappia valikosta. Tämän jälkeen aukeaa näkymä jossa
                            näkyy "Lisää tehtävä" ja sen alapuoleella "Lisää
                            kategoria" otsikot. "Lisää kategoria" otsikon
                            alapuolella on tekstikenttä johon voit kirjoittaa
                            kategorian nimen. Sinun tulee kirjottaa aina
                            kategorian nimi. Tekstikenttään voi kirjoittaa mitä
                            tahansa. Tekstikenttään tulee kirjoittaa vähitään
                            yksi merkki. Et voi myöskään lisätä samannimisiä
                            kategorioita. Tämän jälkeen painamalla "Lisää"
                            nappia lisäät kategorian.
                        </p>

                        <p>
                            Voit lisätä tämän kategorian luodessa tehtävää. Tai
                            kun muokkaat olemassa olevaa tehtävää voit antaa
                            tämän kategorian sille. Voit myös valita näkymän
                            jossa näkyy vain tämän kategorian tehtävät.
                        </p>
                    </div>
                    <div>
                        <h4>Kategorian poisto</h4>
                        <p>
                            Kategorian poistaminen onnistuu kun olet valinnut
                            kategorian valikosta ja tämän jälkeen painamalla
                            "Poista kategoria" nappia valikon alhaalta.
                        </p>

                        <p>Et voi poistaa "Kaikki" kategoriaa.</p>
                    </div>
                    <div>
                        <h4>Tehtävien lisääminen</h4>
                        <p>
                            Tehtävän lisääminen onnistuu kun painat "Lisää"
                            nappia valikosta. Tämän jälkeen aukeaa näkymä jossa
                            näkyy "Lisää tehtävä" ja sen alapuolella "Lisää
                            kategoria" otsikot. "Lisää tehtävä" otsikon
                            alapuolella on tekstikenttä johon voit kirjoittaa
                            tehtävän kuvauksen. Sinun tulee kirjottaa aina
                            tehtävän kuvaus. Tekstikenttään voi kirjoittaa mitä
                            tahansa. Tekstikenttään tulee kirjoittaa vähitään
                            yksi merkki. Tämän jälkeen tulee "Kategoriat"
                            otsikko jonka alapuolella on listattu olemassa
                            olevia kategorioita. Voit valita tehtävään yhden tai
                            useamman kategorian. Tämän jälkeen painamalla
                            "Lisää" nappia lisäät tehtävän.
                        </p>
                    </div>
                    <div>
                        <h4>Tehtävien poistaminen</h4>
                        <p>
                            Tehtävän poistaminen onnistuu kun painat
                            tehtäväkortissa "Muokkaa" nappia tehtäväkortin
                            alalaidassa vasemmalla. Tällöin aukeaa
                            muokkausikkuna. Muokkausikkunassa näkyy "Poista"
                            nappi oikeassa kulmassa. Painamalla sitä poistat
                            tehtävän.
                        </p>

                        <p>
                            Kun olet poistanut tehtävän, täytyy sinun valita
                            uudestaan kategoria joka näytetään.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tietoa;
