import { useState } from "react";
import "./App.css";

interface AppProps {
  locale?: "en" | "fr" | "es";
  defaultDate?: string;
}

function App({ 
  locale = "en",
  defaultDate,
}: AppProps) {
  const [date, setDate] = useState(defaultDate ? defaultDate : new Date().toISOString().slice(0, 10));
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
  const toggleDateSelector = () => {
    setIsDateSelectorOpen(!isDateSelectorOpen);
  };
  const centuries = ["19", "20", "21"];
  const decades = ["00", "10", "20", "30", "40", "50", "60", "70", "80", "90"];
  const years = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const isYearBisextile = (year: number) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  };

  const months = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "Jully",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fr: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    es: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octobre",
      "Noviembre",
      "Diciembre",
    ],
  };

  const doze = ["00", "10", "20", "30"];
  const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const setActive = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.parentElement
      ?.querySelectorAll("button")
      .forEach((button) => {
        button.classList.remove("active");
      });
    e.currentTarget.classList.add("active");
  };

  const dateSelector = (e: React.MouseEvent<HTMLButtonElement>) => {
    let updatedDate = date;
    setActive(e);
    const currentActives = document.querySelectorAll(".active");
    if (currentActives) {
      updatedDate = currentActives[0].textContent + currentActives[1].textContent + currentActives[2].textContent + currentActives[3].textContent + currentActives[4].textContent + currentActives[5].textContent + currentActives[6].textContent + currentActives[7].textContent + currentActives[8].textContent + currentActives[9].textContent;
    }
    console.log(updatedDate);
    switch (e.currentTarget.name) {
      case "year-century":
        setDate(e.currentTarget.textContent + date.slice(2, 10));
        break;
      case "year-decade":
        setDate(
          date.slice(0, 2) + e.currentTarget.textContent + date.slice(4, 10)
        );
        break;
      case "year-unit":
        setDate(
          date.slice(0, 3) + e.currentTarget.textContent + date.slice(4, 10)
        );
        break;
      case "month":
        setDate(
          date.slice(0, 5) +
          (months[locale].indexOf(e.currentTarget.textContent as string) + 1 <
            10
            ? "0" +
            (months[locale].indexOf(e.currentTarget.textContent as string) +
              1)
            : months[locale].indexOf(e.currentTarget.textContent as string) +
            1
          ).toString() +
          date.slice(7, 10)
        );
        break;
      case "day-doze":
        // eslint-disable-next-line no-case-declarations
        const doze =
          e.currentTarget.textContent === "00"
            ? "01"
            : e.currentTarget.textContent;
        setDate(date.slice(0, 8) + doze + date.slice(10, 10));
        break;
      case "day-unit":
        setDate(
          date.slice(0, 9) + e.currentTarget.textContent + date.slice(10, 10)
        );
        break;
      default:
        break;
    }
    
    if (
      !isYearBisextile(parseInt(date.slice(0, 4))) &&
      date.slice(5, 7) === "02" &&
      date.slice(8, 9) === "2") {
        console.log(document.querySelector('#day-nine'))
      document.querySelector('#day-nine')?.classList.add("disabled");
      console.log("warning bisextile");
    } else {
      document.querySelector('#day-nine')?.classList.remove("disabled")
    }
    if (date.slice(5, 7) === "02") {
      document.querySelectorAll('button[name="day-doze"]')?.forEach((button) => {
        if (button.textContent === "30") {
          button.classList.add("disabled");
        }
      });
    } else {
      document.querySelectorAll('button[name="day-doze"]')?.forEach((button) => {
        if (button.textContent === "30") {
          button.classList.remove("disabled");
        }
      });
    }

  };

  return (
    <>
      <form>
        <label htmlFor="name">Date:</label>
        <input type="date" id="date" name="date" />
        <input
          type="text"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
          placeholder="aaaa-mm-dd"
          onClick={() => toggleDateSelector()}
        />
        <div className={`date-selector ${isDateSelectorOpen ? "open" : ""}`}>
          <h2>Choose a date</h2>
          <div className="date-selector__wrapper">
            <div className="date-selector__wrapper__year">
              <div className="date-selector__wrapper__year__century">
                {centuries.map((century) => (
                  <button
                    type="button"
                    name="year-century"
                    key={"cent" + century}
                    onClick={(e) => dateSelector(e)}
                    className={century === date.slice(0, 2) ? "active" : ""}
                  >
                    {century}
                  </button>
                ))}
              </div>
              <div className="date-selector__wrapper__year__decade">
                {decades.map((decade) => (
                  <button
                    type="button"
                    name="year-decade"
                    key={"dec" + decade}
                    onClick={(e) => dateSelector(e)}
                    className={
                      decade.slice(0, 1) === date.slice(2, 3) ? "active" : ""
                    }
                  >
                    {decade}
                  </button>
                ))}
              </div>
              <div className="date-selector__wrapper__year__year">
                {years.map((year) => (
                  <button
                    type="button"
                    name="year-unit"
                    key={"year" + year}
                    onClick={(e) => dateSelector(e)}
                    className={year === date.slice(3, 4) ? "active" : ""}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
            <div className="date-selector__wrapper__month">
              {months[locale].map((month) => (
                <button
                  type="button"
                  name="month"
                  key={"month" + month}
                  onClick={(e) => dateSelector(e)}
                  className={
                    month === months[locale][parseInt(date.slice(5, 7)) - 1]
                      ? "active"
                      : ""
                  }
                >
                  {month}
                </button>
              ))}
            </div>
            <div className="date-selector__wrapper__day">
              <div className="date-selector__wrapper__day__doze">
                {doze.map((doz) => (
                  <button
                    type="button"
                    name="day-doze"
                    key={"doz" + doz}
                    onClick={(e) => dateSelector(e)}
                    className={
                      doz.slice(0, 1) === date.slice(8, 9) ? "active" : ""
                    }
                    id={doz === "30" ? "doze-thirty" : ""}
                  >
                    {doz}
                  </button>
                ))}
              </div>
              <div className="date-selector__wrapper__day__day">
                {days.map((day) => (
                  <button
                    type="button"
                    name="day-unit"
                    key={"day" + day}
                    onClick={(e) => dateSelector(e)}
                    className={day === date.slice(9, 10) ? "active" : ""}
                    id={day === "9" ? "day-nine" : ""}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <h1>{date}</h1>
      </form>
    </>
  );
}

export default App;
