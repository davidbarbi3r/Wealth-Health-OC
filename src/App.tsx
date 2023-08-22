import { useEffect, useState, useRef} from "react";
import "./App.css";

interface AppProps {
  locale?: "en" | "fr" | "es";
  defaultDate?: string;
  wrapperHeight?: string;
  wrapperWidth?: string;
  showColumnIndex?: boolean;
}

function App({
  locale = "es",
  defaultDate,
  wrapperHeight = "400px",
  wrapperWidth = "650px",
  showColumnIndex = true,
}: AppProps) {
  const [date, setDate] = useState(
    defaultDate ? defaultDate : new Date().toISOString().slice(0, 10)
  );
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const toggleDateSelector = () => {
    setIsDateSelectorOpen(!isDateSelectorOpen);
  };
  const centuries = ["19", "20", "21"];
  const decades = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const years = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const longMonths = ["01", "03", "05", "07", "08", "10", "12"];
  const columnIndex = {
    fr: ["Année", "Mois", "Jour"],
    en: ["Year", "Month", "Day"],
    es: ["Año", "Mes", "Día"],
  };
  const dozeThirtyButton = useRef<HTMLButtonElement>(null);
  const dayNineButton = useRef<HTMLButtonElement>(null);
  const dayZeroButton = useRef<HTMLButtonElement>(null);
  const dayOneButton = useRef<HTMLButtonElement>(null);
  const daysButtons: HTMLButtonElement[] = Array.from(
    document.querySelectorAll('[name="day-unit"]')
  );
  const [stepper, setStepper] = useState<number>(1)

  useEffect(() => {
    const datePickerWrapper: HTMLDivElement = document.querySelector(
      ".date-selector__wrapper"
    ) as HTMLDivElement;
    const yearWrapper: HTMLDivElement = document.querySelector(
      ".date-selector__wrapper__year"
    ) as HTMLDivElement;
    if (datePickerWrapper.style) {
      locale !== "en" && (datePickerWrapper.style.gridTemplateAreas = `"day-title month-title year-title" "day month year"`, datePickerWrapper.style.gridTemplateColumns = "30% 20% 50%")
      datePickerWrapper.style.height = wrapperHeight;
      datePickerWrapper.style.width = wrapperWidth;
    }
    if (yearWrapper.style) {
      console.log("test");
    }
  }, [wrapperHeight, wrapperWidth, locale]);

  const isYearBisextile = (year: number) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  };

  const formatDate = (date: string, isInput: boolean = false) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    switch (locale) {
      case "en":
        if (isInput){
          return `${month}-${parseInt(day) < 10 ? '0'+day : day}-${year}`
        }
        return `${months[locale][parseInt(month) - 1]} ${day}, ${year}`;
      case "fr":
        if (isInput){
          return `${parseInt(day) < 10 ? '0'+day : day}-${month}-${year}`
        }
        return `${day} ${months[locale][parseInt(month) - 1]} ${year}`;
      case "es":
        if (isInput){
          return `${parseInt(day) < 10 ? '0'+day : day}-${month}-${year}`
        }
        return `${day} de ${months[locale][parseInt(month) - 1]} de ${year}`
      default:
        if (isInput){
          return `${month}-${parseInt(day) < 10 ? '0'+day : day}-${year}`
        }
        return `${months[locale][parseInt(month) - 1]} ${day}, ${year}`;
    }
  };

  const nextStep = () => {
    setStepper((step) => {
      if (step = 3){
        return 3
      }
      return step + 1
    })
    console.log(stepper)
  }

  const prevStep = () => {
    setStepper((step) => {
          if (step = 1) {
            return 1
          }
          return step - 1;
        }
    )
    console.log(stepper)
  }

  const months = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
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

  const doze = ["0", "1", "2", "3"];
  const days = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.currentTarget.value;
    console.log(locale)
    let dateRegex;
    switch (locale) {
      case "en":
        dateRegex = /^(19|20|21)[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
      default:
        dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20|21)[0-9]{2}$/
    }

    if (!dateRegex.test(newDate)) {
      setErrorMessage('Please enter a valid date in YYYY-MM-DD format.');
    } else {
      setErrorMessage('');
    }

    setDate(e.currentTarget.value);
  };

  const setActive = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.parentElement
      ?.querySelectorAll("button")
      .forEach((button) => {
        button.classList.remove("active");
      });
    e.currentTarget.classList.add("active");
  };

  function handleDayZeroAndDozenZero (date: string) {
    if (date.slice(8, 9) === "0") {
      dayZeroButton.current!.disabled = true;
      date.slice(9, 10) === "0"
          ? (date = date.slice(0, 9) + "1")
          : date;
      setDate(date);
    } else {
      dayZeroButton.current!.disabled = false;
    }
  }

  function handleDozenThree (date: string) {
    if (date.slice(8, 9) === "3") {
      // si le mois est long
      if (longMonths.includes(date.slice(5, 7))) {
        daysButtons.forEach((button) => {
          button.textContent === "0" || button.textContent === "1"
              ? (button.disabled = false)
              : (button.disabled = true);
          parseInt(date.slice(9, 10)) > 1
              ? (date = date.slice(0, 9) + "1")
              : date;
          setDate(date);
        });
      } else {
        daysButtons.forEach((button) => {
          button.textContent === "0"
              ? (button.disabled = false)
              : (button.disabled = true);
          date.slice(9, 10) !== "0"
              ? (date = date.slice(0, 9) + "0")
              : date;
          setDate(date);
        });
      }
    }
  }

  function handleFebruary (date:string) {
    if (date.slice(5, 7) === "02") {
      dozeThirtyButton.current!.disabled = true;

      // si on est sur 30+ rediriger sur 20
      if (date.slice(8, 9) === "3") {
        date = date.slice(0, 8) + "28";
        setDate(date);
      }

      // si c'est pas bisextile et que la douzaine est 2
      if (
          !isYearBisextile(parseInt(date.slice(0, 4))) &&
          date.slice(8, 9) === "2"
      ) {
        dayNineButton.current!.disabled = true;
        console.log(dayNineButton);
      } else {
        dayNineButton.current!.disabled = false;
      }
    } else {
      dozeThirtyButton.current!.disabled = false;
    }
  }

  const dateSelector = (e: React.MouseEvent<HTMLButtonElement>) => {
    let updatedDate = date;
    setActive(e);
    switch (e.currentTarget.name) {
      case "year-century":
        updatedDate = e.currentTarget.textContent + date.slice(2, 10);
        setDate(updatedDate);
        break;
      case "year-decade":
        updatedDate =
          date.slice(0, 2) + e.currentTarget.textContent + date.slice(3, 10);
        setDate(updatedDate);
        break;
      case "year-unit":
        updatedDate =
          date.slice(0, 3) + e.currentTarget.textContent + date.slice(4, 10);
        setDate(updatedDate);
        break;
      case "month":
        updatedDate =
          date.slice(0, 5) +
          (months[locale].indexOf(e.currentTarget.textContent as string) + 1 <
          10
            ? "0" +
              (months[locale].indexOf(e.currentTarget.textContent as string) +
                1)
            : months[locale].indexOf(e.currentTarget.textContent as string) + 1
          ).toString() +
          date.slice(7, 10);
        setDate(updatedDate);
        break;
      case "day-doze":
        updatedDate =
          date.slice(0, 8) + e.currentTarget.textContent + date.slice(9, 10);
        setDate(updatedDate);
        break;
      case "day-unit":
        updatedDate = date.slice(0, 9) + e.currentTarget.textContent;
        setDate(updatedDate);
        break;
      default:
        break;
    }

    daysButtons.forEach((button) => {
      button.disabled = false;
    });

    // si le mois est février
    handleFebruary(updatedDate)

    // si la douzaine est 3
    handleDozenThree(updatedDate)

    // Si la douzaine jour est 0 et que le day unit est 0
    handleDayZeroAndDozenZero(updatedDate)
  };

  if (window.matchMedia("(max-width: 767px)").matches) {
    return (
        <p>mobile</p>
    )
  }

  return (
    <>
      <form>
        <label htmlFor="name">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          value={formatDate(date, true)}
          onChange={(e) => handleDateChange(e)}
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        />
        {errorMessage && <p>{errorMessage}</p>}
        <div onClick={() => toggleDateSelector()}>{">"}</div>
        <div className={`date-selector ${isDateSelectorOpen ? "open" : ""}`}>
          <h2>Choose a date</h2>
          <div className="date-selector__wrapper">
            <div className="date-selector__mobile-nav">
              <span className="date-selector__mobile-nav-left" onClick={prevStep}>gauche</span>
              <span className="date-selector__mobile-nav-right" onClick={nextStep}>droite</span>
            </div>
            {showColumnIndex ? (
              <>
                <div className="date-selector__wrapper__year__column-index">
                  {columnIndex[locale][0]}
                </div>
                <div className="date-selector__wrapper__month__column-index">
                  {columnIndex[locale][1]}
                </div>
                <div className="date-selector__wrapper__day__column-index">
                  {columnIndex[locale][2]}
                </div>
              </>
            ) : (
              ""
            )}
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
                    ref={doz === "3" ? dozeThirtyButton : null}
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
                    ref={day === "9"
                        ? dayNineButton
                        : day === "1"
                        ? dayOneButton
                        : day === "0"
                        ? dayZeroButton
                        : null}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <h3>{formatDate(date)}</h3>
      </form>
    </>
  );
}

export default App;
