/** @jsx h */
import { h, useEffect, useState } from "../client_deps.ts";

interface StationType {
  name: string;
  url: string;
  favicon: string;
}

async function getStations() {
  const cn = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split("/")[1];
  const stations: StationType[] = await (
    await fetch(
      `https://de1.api.radio-browser.info/json/stations/bycountry/${cn}`,
    )
  ).json();
  return stations;
}

const Station = ({ station }: { station: StationType }) => {
  const playStation = (station: string) => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    audio.src = station;
    audio.play();
  };

  const stationName = (name: string) => {
    if (name.length > 12) {
      return `${name.slice(0, 12)}..`;
    } else {
      return name;
    }
  };

  const styles = {
    backgroundImage: `url(${station.favicon})`,
    width: "150px",
    height: "150px",
    backgroundSize: "150px",
  };

  return (
    <div>
      <button
        style={styles}
        onClick={() => playStation(station.url)}
      >
        {station.favicon !== "" ? "" : station.name}
      </button>
      <p>{stationName(station.name)}</p>
    </div>
  );
};
const Stations = (
  { title, stations }: { title: string; stations: StationType[] },
) => {
  const pageNumItems = 20;
  const [pager, setPager] = useState(0);
  const [displayStations, setDisplayStations] = useState<StationType[]>(
    stations.slice(pager, pager + pageNumItems),
  );
  useEffect(() => {
    setDisplayStations(stations.slice(pager, pager + pageNumItems));
  }, [pager, stations]);
  function nextPage() {
    setPager(pager + pageNumItems);
  }
  function backPage() {
    setPager(pager - pageNumItems);
  }

  const divStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  return (
    <div>
      <h2>{title}</h2>
      <div style={divStyle}>
        {displayStations.map((station) => <Station station={station} />)}
      </div>
      {(pager + pageNumItems < stations.length) &&
        <button onClick={nextPage}>next</button>}
      {pager > 0 &&
        <button onClick={backPage}>back</button>}
    </div>
  );
};

export default function StationMain() {
  const [stations, setStations] = useState<StationType[]>([]);
  useEffect(() => {
    getStations().then((stations) => {
      setStations(stations);
    });
  }, []);
  return (
    <div>
      {stations !== null &&
        <Stations title="Local Stations" stations={stations} />}
    </div>
  );
}
