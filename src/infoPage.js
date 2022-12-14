import "./App.css";

function Tietoa() {
    return (
        <div className="content">
            <div className="container-1">
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
                        </a>{" "}
                        elementtejä. Ne ovat vapaassa käytössä eikä tarvitse
                        lisenssiä. Mui:lla on olemassa myös lisenssikäyttöisiä
                        elementtejä. Niitä ei ole tässä projektissa käytetty.
                    </p>
                </div>
                <div>
                    <h3>Ohjeet</h3>
                    <p>TÄHÄN OHJEET</p>
                </div>
            </div>
        </div>
    );
}

export default Tietoa;
