// Valitsee tehtävät kategorian mukaan ja palauttaa ne
const showCategory = (dataType, serverData) => {
  let allTasksObj = [];
  if (dataType.toLocaleLowerCase() === "kaikki") {
    allTasksObj = serverData;
  } else {
    for (let index = 0; index < serverData.length; index++) {
      let obj = serverData[index];
      for (
        let categoryIndex = 0;
        categoryIndex < obj.kategoria.length;
        categoryIndex++
      ) {
        if (obj.kategoria[categoryIndex] === dataType) {
          allTasksObj.push(obj);
        }
      }
    }
  }

  let allTaskSorted = orderData(allTasksObj, "aakkosjärjestys");

  return allTaskSorted;
};

// Järjestää tehtävät halutun mukaan ja palauttaa ne järjestettynä
const orderData = (data, order) => {
  let allTasksObj = [];
  if (order.toLocaleLowerCase() === "aakkosjärjestys") {
    allTasksObj = data.sort((a, b) => {
      return a.tehtävä.localeCompare(b.tehtävä);
    });
  } else if (order.toLocaleLowerCase() === "uusin ensin") {
    allTasksObj = data.sort((a, b) => {
      return b.id - a.id;
    });
  } else if (order.toLocaleLowerCase() === "vanhin ensin") {
    allTasksObj = data.sort((a, b) => {
      return a.id - b.id;
    });
  } else if (order.toLocaleLowerCase() === "kategoria") {
    allTasksObj = data.sort((a, b) => {
      return a.kategoria[0].localeCompare(b.kategoria[0]);
    });
  } else if (order.toLocaleLowerCase() === "tehty") {
    allTasksObj = data.sort((a, b) => {
      return a.tehty - b.tehty;
    });
  } else if (order.toLocaleLowerCase() === "tehtävä") {
    allTasksObj = data.sort((a, b) => {
      return a.tehtävä.localeCompare(b.tehtävä);
    });
  } else if (order.toLocaleLowerCase() === "prioriteetti") {
    allTasksObj = data.sort((a, b) => {
      return a.prioriteetti < b.prioriteetti;
    });
  }

  return allTasksObj;
};

// Hakee tehtävät hakusanan mukaan ja palauttaa ne
const shearchDataByTask = async (data, shearch) => {
  let allTasksObj = [];
  if (shearch === "") {
    allTasksObj = data;
  } else {
    for (let index = 0; index < data.length; index++) {
      let obj = data[index];
      if (obj.tehtävä.toLowerCase().includes(shearch.toLowerCase())) {
        allTasksObj.push(obj);
      }
    }
  }

  return allTasksObj;
};

// Hakee tehtävät id:n mukaan ja palauttaa ne
const shearchDataById = (data, id) => {
  let allTasksObj = [];
  if (id === "") {
    allTasksObj = data;
  } else {
    for (let index = 0; index < data.length; index++) {
      let obj = data[index];
      if (obj.id === id) {
        allTasksObj = obj;
      }
    }
  }

  return allTasksObj;
};

// Tarkastaa onko annettu arvo sama kuin tietty arvo
// tai onko arvo tyhjä ja palauttaa true tai false
const checkValueIsSame = (target, value) => {
  if (value === target || target === "") {
    return false;
  } else {
    return true;
  }
};

// Antaa ajan muodossa 2020-01-01T00:00 tai 00:00 tai 2020-01-01T00:00 ja
// palauttaa sen, mikä on true, jos kaikki on false, palauttaa Errorin, jos
// kaikki on true, palauttaa Errorin.
const getMyTime = (dateOnly, timeOnly, dateAndTime) => {
  if (dateOnly === undefined) {
    dateOnly = false;
  } else if (timeOnly === undefined) {
    timeOnly = false;
  } else if (dateAndTime === undefined) {
    dateAndTime = false;
  } else if (
    (dateOnly === false && timeOnly === false && dateAndTime === false) ||
    (dateOnly === true && timeOnly === true && dateAndTime === true) ||
    (dateOnly === true && timeOnly === true) ||
    (dateOnly === true && dateAndTime === true) ||
    (timeOnly === true && dateAndTime === true)
  ) {
    console.error("getMyTime: check your parameters, you can only use one");
  }

  let thisDay = new Date();
  let thisDayString = "";

  if (dateOnly) {
    thisDayString =
      thisDay.getFullYear() +
      "-" +
      lessThanTen(thisDay.getMonth() + 1) +
      "-" +
      lessThanTen(thisDay.getDate()) +
      "T00:00";
  } else if (timeOnly) {
    thisDayString =
      lessThanTen(thisDay.getHours()) + ":" + lessThanTen(thisDay.getMinutes());
  } else if (dateAndTime) {
    thisDayString =
      thisDay.getFullYear() +
      "-" +
      lessThanTen(thisDay.getMonth() + 1) +
      "-" +
      lessThanTen(thisDay.getDate()) +
      "T" +
      lessThanTen(thisDay.getHours()) +
      ":" +
      lessThanTen(thisDay.getMinutes());
  }

  console.log(thisDayString);
  return thisDayString;
};

// Lisää nollan eteen, jos numero on alle 10
const lessThanTen = (number) => {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
};

export {
  getMyTime,
  lessThanTen,
  checkValueIsSame,
  shearchDataById,
  shearchDataByTask,
  orderData,
  showCategory,
};
